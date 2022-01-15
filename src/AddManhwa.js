import React, { Component } from "react";
import axios from "axios";
import { Badge, CustomInput } from "reactstrap";
import "./Home.css";
import "./Manhwa.css";
import "./index.css";
import { Alert } from "reactstrap";
import { baseUrl } from "./Constant";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";



class AddManhwa extends Component {
	constructor(props) {
		super(props);
		this.state = {
			manhwa: {
				title: "",
				description: "",
				author: "",
				status: "Ongoing",
				type: "Manhwa",
				coverimage: null,
			},
			tags: [],
			statusDropdown: false,
			typeDropdown: false,
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
			.then((res) =>
				this.setState({
					tags: res.data,
				})
			)
			.catch((error) => this.refreshList());
	};

	handleChange = (e) => {
		let { name, value } = e.target;
		if (e.target.type === "file") {
			value = e.target.files[0];
		}

		const manhwa = { ...this.state.manhwa, [name]: value };
		this.setState({ manhwa });
	};
	handleStatusDropdodwn = () => {
		this.setState({ statusDropdown: !this.state.statusDropdown });
	};
	handleTypeDropdown = () => {
		this.setState({ typeDropdown: !this.state.typeDropdown });
	};
	

	setMessage(type, message) {
		this.setState({
			showMessage: true,
			message: { type, message },
		});
	}

	handleManhwaModalSubmit = (item, tags) => {
		const formData = new FormData();
		formData.append("tags", tags);
		for (var key in item) {
			formData.append(key, item[key]);
		}
		axios({
			method: "post",
			url: `${baseUrl}/api/manhwa/`,
			data: formData,
			headers: {
				"Accept-Language": "en-US,en;q=0.8",
				"Content-Type": `multipart/form-data`,
			},
		})
			.then((res) => {
				this.setMessage(
					"success",
					"Succesfully submitted the Manhwa! Once verified it will be available"
				);
			})
			.catch((err) => {
				this.setMessage(
					"danger",
					"An error occured while trying to create the new Manhwa, please verify the entered data!"
				);
			});
	};

	render() {
		return (
			<main className="container">
				<div className="row mt-4 d-flex justify-content-between">
					<div className="flex" id="sitetitle" style={{ textAlign: "center" }}>
						<h1>
							<Link to="/">Manre</Link>
						</h1>
					</div>
				</div>
				<div className="row mt-2 mb-4 justify-content-center">
					<div
						className="col-md-6 col-md-offset-3"
						style={{ textAlign: "center" }}
					>
						<Alert
							color={this.state.message["type"]}
							isOpen={this.state.showMessage}
							className="mt-4"
						>
							{this.state.message["message"]}
						</Alert>
					</div>
				</div>

				<div className="row justify-content-center">
					<div className="col-md-6 col-md-offset-3">
						<Form>
							<FormGroup>
								<Input
									type="text"
									id="manhwaTitle"
									name="title"
									value={this.state.title}
									onChange={this.handleChange}
									placeholder="Enter Manhwa Title"
								/>
							</FormGroup>
							<FormGroup>
								<Input
									type="textarea"
									id="manhwaDescription"
									name="description"
									value={this.state.description}
									onChange={this.handleChange}
									placeholder="Enter Manhwa description"
								/>
							</FormGroup>
						</Form>
						<FormGroup>
							<Label for="manhwaTags">
								Add manhwa types(Use CTRL to select multiple types)
							</Label>
							<Input
								type="select"
								multiple
								defaultValue={null}
								id="tags"
								className="dropselect_tag"
								name="tags"
								onSave={this.handleChange}
							>
								{this.state.tags.map((el) => (
									<option key={el.slug} value={el.slug}>
										{el.name}
									</option>
								))}
							</Input>
						</FormGroup>
						<div className="row justify-content-between m-0">
							<FormGroup>
								<Input
									type="text"
									id="manhwaAuthor"
									name="author"
									value={this.state.author}
									onChange={this.handleChange}
									placeholder="Enter Manhwa Author"
								/>
							</FormGroup>
							<FormGroup>
								<Dropdown
									isOpen={this.state.statusDropdown}
									toggle={this.handleStatusDropdodwn}
								>
									<DropdownToggle caret>
										{this.state.manhwa.status}
									</DropdownToggle>
									<DropdownMenu right>
										<DropdownItem
											name="status"
											value="Ongoing"
											onClick={this.handleChange}
										>
											Ongoing
										</DropdownItem>
										<DropdownItem
											name="status"
											value="Cancelled"
											onClick={this.handleChange}
										>
											Cancelled
										</DropdownItem>
										<DropdownItem
											name="status"
											value="Completed"
											onClick={this.handleChange}
										>
											Completed
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</FormGroup>
							<FormGroup>
								<Dropdown
									isOpen={this.state.typeDropdown}
									toggle={this.handleTypeDropdown}
								>
									<DropdownToggle caret>
										{this.state.manhwa.type}
									</DropdownToggle>
									<DropdownMenu right>
										<DropdownItem
											name="type"
											value="Manhwa"
											onClick={this.handleChange}
										>
											Manhwa
										</DropdownItem>
										<DropdownItem
											name="type"
											value="Manhua"
											onClick={this.handleChange}
										>
											Manhua
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</FormGroup>
						</div>
						<FormGroup>
							<CustomInput
								type="file"
								name="cover_image"
								onChange={this.handleChange}
								label="Add a cover image for the Manhwa"
							/>
						</FormGroup>
						<Button
							color="success"
							onClick={() => {
								// get all values for multi select field tags
								const select = document.getElementById("tags");
								const selected = [...select.options]
									.filter((option) => option.selected)
									.map((option) => option.value);
								this.handleManhwaModalSubmit(this.state.manhwa, selected);
							}}
						>
							Add a new Manhwa!
						</Button>
					</div>
				</div>
			</main>
		);
	}
}

export default AddManhwa;
	
