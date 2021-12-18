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

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle} className="modalText">
        <ModalHeader toggle={toggle}>
          Generate a list with the selected Manhwas
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="listTitle">List Name</Label>
              <Input
                type="text"
                id="listTitle"
                name="title"
                value={this.state.list.title}
                onChange={this.handleChange}
                placeholder="Enter Manhwa Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="listAuthor">Username or Identifier</Label>
              <Input
                type="text"
                id="listIdentifier"
                name="identifier"
                value={this.state.list.identifier}
                onChange={this.handleChange}
                placeholder="Enter Manhwa Author"
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
                placeholder="Enter list description"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.list)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
