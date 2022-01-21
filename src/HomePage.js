import React, { Component } from "react";
import axios from "axios";
import { Badge } from "reactstrap";
import "./Home.css";
import "./Manhwa.css";
import "./index.css";
import { Alert } from "reactstrap";
import { baseUrl } from "./Constant";
import { Link } from "react-router-dom";


class HomePage extends Component{
	constructor(props) {
		super(props);
		this.state = {
			next: null,
			tagsList: [],
			more_exist: true,
			showMessage: false,
			message: {
				type: "danger",
				message: "If you see this, send a screenshot please!",
			},
		};
	}
	componentDidMount() {
		this.refreshList();
	}

	refreshList = () => {
		axios
			.get(`${baseUrl}/api/tags/`)
			.then((res) => {
				this.setState({
					tagsList: res.data,
				});
			})
			.catch((error) => console.log(error));
	};
	toggleMessage = () => {
		this.setState({
			showMessage: !this.state.showMessage,
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
						<h1><Link to="/">Manre</Link></h1>
					</div>
				</div>
				<div className="row justify-content-center">
				<div className="col-md-6 col-md-offset-3">
					{ this.state.tagsList.map((tag) =>  (<Badge color="primary" className="mr-2" key={tag.slug}> <Link to={`/tag/${tag.slug}/`} className="link">{tag.name} ({tag.manhwas})</Link></Badge>))}
                
				</div> 
				</div>
			</main>
		);
	}
}

export default HomePage; 
