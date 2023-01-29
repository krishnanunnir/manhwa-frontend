import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "./Constant";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";

class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: {},
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    const {
      match: { params },
    } = this.props;
    axios
      .get(`${baseUrl}/api/blogs/${params.blogSlug}/`)
      .then((res) => this.setState({ blog: res.data }))
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="container">
        <Helmet>
          <title>{this.state.blog.title}</title>
        </Helmet>
        <div className="row" style={{ color: "black", marginTop: "10rem" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">{this.state.blog.title}</h3>
                <ReactMarkdown className="card-text">
                  {this.state.blog.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogDetail;
