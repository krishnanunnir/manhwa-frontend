import React, { Component } from "react";
import axios from "axios";
import { Spinner } from "reactstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Manhwa from "./components/Manhwa";
import "./Home.css";
import "./Manhwa.css";
import "./index.css";
import { Alert } from "reactstrap";
import { baseUrl } from "./Constant";
class TagsList extends Component {
	constructor(props) {
		super(props);
		const {
			params: { tagsSlug },
		} = props.match;
		this.addActiveManhwa = this.addActiveManhwa.bind(this);
		this.state = {
			manhwaList: [],
			next: null,
			more_exist: true,
			activeManhwa: [],
			showMessage: false,
			tagsSlug: tagsSlug,
			message: {
				type: "danger",
				message: "If you see this, send a screenshot please!",
			},
		};
	}
	componentDidMount() {
		this.refreshList();
		this.setState({
			activeManhwa:
				localStorage.getItem("activeManhwa") != null
					? JSON.parse(localStorage.getItem("activeManhwa"))
					: [],
		});
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

	componentDidUpdate(prevProps){
		if(this.props.match.params.tagsSlug!== prevProps.match.params.tagsSlug){
			// call back to refresh list
			this.setState({tagsSlug: this.props.match.params.tagsSlug},this.refreshList);
		}
	}
	refreshList = () => {
		this.searchTag = this.state.tagsSlug
		axios
			.get(`${baseUrl}/api/manhwa/?tag=${this.searchTag}`)
			.then((res) => {
				this.setState({
					manhwaList: res.data.results,
					more_exist: res.data.next != null,
					next: res.data.next,
				});
			})
			.catch((error) => console.log(error));
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
						>
							{this.state.message["message"]}
						</Alert>
					</div>
				</div>
				<div className="row justify-content-center">
					<div
						className="col-md-6 col-md-offset-3 mb-2"
						style={{ textAlign: "center" }}
					>
						<h1>All Manhwa's tagged {this.state.tagsSlug}</h1>
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
							<b>Yay! You have seen it all</b>
						</p>
					}
					// below props only if you need pull down functionality
				>
					<div>
						{this.state.manhwaList.map((item) => (
							<Manhwa
								key={item.slug}
								item={item}
								detailsPage={false}
								selected={this.state.activeManhwa.includes(item.slug)}
								onChange={this.addActiveManhwa}
							/>
						))}
					</div>
				</InfiniteScroll>
			</main>
		);
	}
}

export default TagsList;
