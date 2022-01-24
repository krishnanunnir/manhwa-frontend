import React, { Component } from "react";
import { LOGIN_SUCCESS } from "./action/type";
import axios from "axios";
import store from "./store";
import { Badge } from "reactstrap";
import "./Home.css";
import "./Manhwa.css";
import "./index.css";
import { Alert } from "reactstrap";
import { baseUrl } from "./Constant";
import { Link } from "react-router-dom";
import { handleLogin } from "./Api";
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
import { AuthLogin } from "./action/auth";

class Login extends Component {
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

		const user = { ...this.state.user, [name]: value };
		this.setState({ user });
	};
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
						<h1 className="mb-4"> Login </h1>
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
							<Button
								color="success"
								onClick={() => {
									handleLogin(this.state.user)
										.then((data) => {
											// push history to / and send message data along with it
											store.dispatch({ type: LOGIN_SUCCESS, payload: data });
											this.props.history.push({
												pathname: "/",
												state: {
													message: {
														type: "success",
														message: "Login successful!",
													},
												},
											});
										})
										.catch((err) => {
											this.setMessage("danger", "Invalid username or password");
										});
								}}
								className="mb-4"
							>
								Login
							</Button>
						</Form>
						<Link to="/signup/">Trying to signup?</Link>
					</div>
				</div>
			</main>
		);
	}
}
export default Login;
