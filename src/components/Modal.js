import React, { Component } from "react";
import axios from "axios";
import { baseUrl } from "../Constant";
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

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manhwa: {
        title: "",
        description: "",
        author: "",
        status: "Ongoing",
        coverimage: null,
      },
      tags: [],
      dropdown: false,
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
          tags: res.data.results,
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
  handleDropdodwn = () => {
    this.setState({ dropdown: !this.state.dropdown });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle} className="modalText">
        <ModalHeader toggle={toggle}>Add a missing Manhwa</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="manhwaTitle">Title</Label>
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
              <Label for="manhwaAuthor">Author</Label>
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
              <Label for="manhwaDescription">Description</Label>
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
          <Dropdown isOpen={this.state.dropdown} toggle={this.handleDropdodwn}>
            <DropdownToggle caret>{this.state.manhwa.status}</DropdownToggle>
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
          <FormGroup>
            <Label for="manhwaCoverImage">Add a cover image</Label>
            <Input
              type="file"
              name="cover_image"
              onChange={this.handleChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => {
              // get all values for multi select field tags
              const select = document.getElementById("tags");
              const selected = [...select.options]
                .filter((option) => option.selected)
                .map((option) => option.value);
              onSave(this.state.manhwa,selected);
            }}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
