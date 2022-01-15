import React, { Component } from "react";
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
} from "reactstrap";

export default class CustomModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: {
				title: "",
				identifier: "",
				description: "",
			},
		};
	}

	handleChange = (e) => {
		let { name, value } = e.target;
		if (e.target.type === "file") {
			value = e.target.files[0];
		}

		const list = { ...this.state.list, [name]: value };
		this.setState({ list });
	};
	handleDropdodwn = () => {
		this.setState({ dropdown: !this.state.dropdown });
	};
	clearList = () => {
		localStorage.removeItem("activeManhwa");
		this.setState({
			activeManhwa: [],
		});
		window.location.reload();
	};


	render() {
		const { toggle, onSave } = this.props;

		return (
			<Modal isOpen={true} toggle={toggle} className="modalText">
				<ModalHeader toggle={toggle}>Share your favourite Manhwas!</ModalHeader>
				<ModalBody>
					<div className="alert alert-primary">
						Please use the + button next to the Manhwas to add to the list!
					</div>
					<Form row>
						<FormGroup>
							<Label for="listTitle">Title</Label>
							<Input
								type="text"
								id="listTitle"
								name="title"
								value={this.state.list.title}
								onChange={this.handleChange}
								placeholder="Enter a title for the list you want to share!"
							/>
						</FormGroup>
						<FormGroup>
							<Label for="listAuthor">Author</Label>
							<Input
								type="text"
								id="listIdentifier"
								name="identifier"
								value={this.state.list.identifier}
								onChange={this.handleChange}
								placeholder="A name or identifier so people know who made this list!"
							/>
						</FormGroup>
						<FormGroup>
							<Label for="listDescription">Description</Label>
							<Input
								type="textarea"
								id="listDescription"
								name="description"
								value={this.state.list.description}
								onChange={this.handleChange}
								placeholder="A short description to let people know what this list is about!"
							/>
						</FormGroup>
					</Form>
				</ModalBody>
				<ModalFooter>
					<Button
						color="danger"
						href="javascript:void(null);"
						className="mr-1"
						onClick={this.clearList}
					>
						Clear all selected Manhwas!
					</Button>

					<Button color="success" onClick={() => onSave(this.state.list)}>
						Save
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}
