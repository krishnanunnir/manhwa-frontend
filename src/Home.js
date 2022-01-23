import React, { Component } from "react";
import axios from "axios";
import { Spinner } from "reactstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Manhwa from "./components/Manhwa";
import ListModal from "./components/CreateListModal";
import { Link } from "react-router-dom";
import "./Home.css";
import "./Manhwa.css";
import "./index.css";
import { Alert } from "reactstrap";
import { baseUrl } from "./Constant";
import { debounce } from "lodash";
class Home extends Component {
	constructor(props) {
		super(props);
		this.addActiveManhwa = this.addActiveManhwa.bind(this);
		this.state = {
			manhwaList: [],
			next: null,
			more_exist: true,
			placeholder: "Search for Manhwa by name",
			listModal: false,
			activeManhwa: [],
			showMessage: false,
			message: {
				type: "danger",
				message: "If you see this, send a screenshot please!",
			},
		};
		if(this.props.location.state!= null){
			this.message = this.props.location.state.message
		}
	}
	componentDidMount() {
		this.refreshList();
		this.setState({
			activeManhwa:
				localStorage.getItem("activeManhwa") != null
					? JSON.parse(localStorage.getItem("activeManhwa"))
					: [],
		});
		if(this.message){
			this.setState({
				showMessage: true,
				message: {type: this.message.type,message: this.message.message}
			})
		}
	}
	toggleMessage = () => {
		this.setState({
			showMessage: !this.state.showMessage,
		});
	};
	setMessage(type, message) {
		this.setState({
			showMessage: true,
			message: { type, message },
		});
	}

	refreshList = () => {
		axios
			.get(`${baseUrl}/api/manhwa/`)
			.then((res) => {
				this.setState({
					manhwaList: res.data.results,
					more_exist: res.data.next != null,
					next: res.data.next,
					placeholder: "Search from over " + res.data.count + " Manhwas!!",
				});
			})
			.catch((error) => console.log(error));
	};
	handleSearch = debounce((query) => {
		axios
			.get(`${baseUrl}/api/manhwa/?search=${query}`)
			.then((res) => {
				this.setState({
					manhwaList: res.data.results,
					more_exist: res.data.next != null,
					next: res.data.next,
				});
			})
			.catch((error) => console.log(error));
	}, 1000);

	searchList = (event) => {
		this.setState({ manhwaList: [], more_exist: true });
		let input = event.target.value.toLowerCase();
		this.handleSearch(input);
	};
	fetchData = () => {
		axios
			.get(this.state.next)
			.then((res) => {
				var has_more = false;
				if (res.data.next) {
					has_more = true;
				}
				var data = {
					next: res.data.next,
					manhwaList: this.state.manhwaList.concat(res.data.results),
					more_exist: has_more,
				};
				this.setState(data);
			})
			.catch((error) => this.refreshList());
	};

	listModalToggle = () => {
		this.setState({ listModal: !this.state.listModal });
	};
	handleListModalSubmit = (data) => {
		this.listModalToggle();
	};

	handleListModalSubmit = (item) => {
		item = { ...item, manhwas: this.state.activeManhwa };
		axios({
			method: "post",
			url: `${baseUrl}/api/list/`,
			data: JSON.stringify(item),
			headers: {
				accept: "application/json",
				"Accept-Language": "en-US,en;q=0.8",
				"Content-Type": `application/json`,
			},
		})
			.then((res) => {
				this.setState({ activeManhwa: [] });
				localStorage.removeItem("activeManhwa");
				this.setMessage("success", "Succesfully created the list");
				this.props.history.push("/list/" + res.data["slug"]);
			})
			.catch((err) => {
				this.setMessage(
					"danger",
					"An error occured while trying to create the new list"
				);
			});
	};

	addActiveManhwa = (manhwa) => {
		const index = this.state.activeManhwa.indexOf(manhwa);
		var activeManhwa = this.state.activeManhwa;
		if (index > -1) {
			activeManhwa.splice(index, 1);
		} else {
			activeManhwa = [...activeManhwa, manhwa];
		}
		this.setState({ activeManhwa: activeManhwa }, () => {
			localStorage.setItem(
				"activeManhwa",
				JSON.stringify(this.state.activeManhwa)
			);
		});
	};

	render() {
		return (
			<main className="container">
				<div className="row justify-content-center">
					<div className="col-md-6 col-md-offset-3">
						<Alert
							color={this.state.message["type"]}
							isOpen={this.state.showMessage}
							toggle={this.toggleMessage}
							style={{ position: "fixed" }}
							className="mt-4"
						>
							{this.state.message["message"]}
						</Alert>
					</div>
				</div>
				<div className="row my-4 d-flex justify-content-between">
					<div className="flex" id="sitetitle" style={{ textAlign: "center" }}>
						<h1>Manre</h1>
					</div>
					<div className="d-flex align-items-center">
						<a
							href="javascript:void(null);"
							className="mr-4 nav-text"
							onClick={this.listModalToggle}
						>
							Share Manhwas!
						</a>
						<Link to="/addmanhwa/" className="nav-text">
							Add Manhwa?
						</Link>
					</div>
				</div>
				<div className="row justify-content-center mb-4">
					<div className="col-md-6 col-md-offset-3">
						<input
							type="text"
							className="form-control"
							placeholder={this.state.placeholder}
							onChange={this.searchList}
						/>
					</div>
				</div>
				<InfiniteScroll
					dataLength={this.state.manhwaList.length} //This is important field to render the next data
					next={this.fetchData}
					hasMore={this.state.more_exist}
					loader={
						<div style={{ textAlign: "center" }}>
							<Spinner color="secondary" />
						</div>
					}
					endMessage={
						<p style={{ textAlign: "center" }}>
							<b>That is the end of it!</b>
						</p>
					}
					// below props only if you need pull down functionality
				>
					<div>
						{this.state.manhwaList.map((item) => (
							<Manhwa
								key={item.id}
								item={item}
								detailsPage={false}
								selected={this.state.activeManhwa.includes(item.slug)}
								onChange={this.addActiveManhwa}
							/>
						))}
					</div>
				</InfiniteScroll>

				{this.state.listModal ? (
					<ListModal
						toggle={this.listModalToggle}
						onSave={this.handleListModalSubmit}
						onCancel={this.listModalToggle}
					/>
				) : null}
			</main>
		);
	}
}

export default Home;
