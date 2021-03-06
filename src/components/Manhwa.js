import React, { Component } from "react";
import { Link } from "react-router-dom";
import plus from "./rounded-plus.svg";
import minus from "./rounded-minus.svg";
import { Badge } from "reactstrap";
class Manhwa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
    };
  }
  handleChange = (item) => {
    const { onChange } = this.props;
    this.setState({ selected: !this.state.selected });
    onChange(item.slug);
  };
  render() {
    const { item, detailsPage } = this.props;
    this.selected = this.state.selected ? "activeManhwa" : "";
    this.icon = this.state.selected ? minus : plus;
    return (
      <div className="manhwaMargin">
        <div className="row justify-content-center">
          <div
            className={`col-md-6 col-md-offset-3 d-flex flex-row ${this.selected}`}
          >
            <div className="d-flex flex-column justify-content-center">
              <div className="d-flex flex-row">
                <img
                  src={item.cover_image}
                  alt={item.description}
                  loading="lazy"
                  style={{
                    height: "auto",
                    width: "5em",
                    maxHeight: "7em",
                    maxWidth: "7em",
                  }}
                />
              </div>
              <div className="d-flex flex-row mt-4 justify-content-center">
                {(() => {
                  if (item.status === "Ongoing") {
                    return <Badge color="info">{item.status}</Badge>;
                  } else if (item.status === "Completed") {
                    return <Badge color="success">{item.status}</Badge>;
                  } else {
                    return <Badge color="danger">{item.status}</Badge>;
                  }
                })()}
              </div>
            </div>
            <div>
              <div className="d-flex flex-column p-4">
                <h5>
                  {(() => {
                    if (!detailsPage) {
                      return (
                        <div>
                          <Link to={`manhwa/${item.slug}`}>{item.title} </Link>
                          <img
                            src={this.icon}
                            className="img-fluid"
                            alt="logo"
                            onClick={() => {
                              this.handleChange(item);
                            }}
                          />
                        </div>
                      );
                    } else {
                      return <div>{item.title}</div>;
                    }
                  })()}
                </h5>
                <p className="my-2">
                  {item.type==="Manhua"? <Badge color="danger" className="mr-2">{item.type}</Badge>: null}
                  {item.tags.map((tag) =>  (<Badge color="primary" className="mr-2" key={tag.slug}> <Link to={`/tag/${tag.slug}/`} className="link">{tag.name}</Link></Badge>))}
                </p>
                <p className="pt-2">{item.description} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Manhwa;
