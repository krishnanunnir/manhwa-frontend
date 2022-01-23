import React, { Component } from "react";
import axios from "axios";
import { Badge } from "reactstrap";
import "./Home.css";
import "./Manhwa.css";
import "./index.css";
import { Alert } from "reactstrap";
import { baseUrl } from "./Constant";
import { Link } from "react-router-dom";
import { handleSignup } from "./Api";
import {
	Button,
	Form,
	FormGroup,
	Input,
	Label,
	Dropdown,
	DropdownItem,
	DropdownToggle,
	DropdownMenu,
} from "reactstrap";

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				username: "",
				password: "",
			},
			showMessage: false,
			message: {
				type: "danger",
				message: "If you see this, send a screenshot please!",
			},
		};
	}
	handleChange = (e) => {
		let { name, value } = e.target;
		if (e.target.type === "file") {
			value = e.target.files[0];
		}

		const user = { ...this.state.user, [name]: value };
		this.setState({ user });
	};
	setMessage(type, message) {
		this.setState({
			showMessage: true,
			message: { type, message },
		});
	}

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
						<h1>
							<Link to="/">Manre</Link>
						</h1>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-md-4 col-md-offset-4">
						<h1 className="mb-4"> Signup </h1>
						<Form>
							<FormGroup>
								<Input
									type="text"
									id="username"
									name="username"
									value={this.state.title}
									onChange={this.handleChange}
									placeholder="Enter your username"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="password"
									id="password"
									name="password"
									value={this.state.title}
									onChange={this.handleChange}
									placeholder="Enter your password"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="password"
									id="confirm_password"
									name="confirm_password"
									value={this.state.title}
									onChange={this.handleChange}
									placeholder="Enter your password again"
								/>
							</FormGroup>
							<Button
								color="success"
								onClick={() => {
									handleSignup(this.state.user)
										.then((res) => {
											this.props.history.push({
												path: "/",
												state: {
													message: "success",
													messageText: "Succesfully created the user!",
												},
											});
										})
										.catch((err) => {
											this.setMessage("danger", err.message);
										});
								}}
								className="mb-4"
							>
								Sign up
							</Button>
						</Form>
						<div className="text-align-center">
							<Link to="/login/" className="mt-8">
								Trying to login?
							</Link>
						</div>
					</div>
				</div>
			</main>
		);
	}
}
export default Signup;
