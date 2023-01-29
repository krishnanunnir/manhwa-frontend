import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "./Constant";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";

class BlogsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogsList: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get(`${baseUrl}/api/blogs/`)
      .then((res) => this.setState({ blogsList: res.data.results }))
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div className="container">
        <Helmet>
          <title>Blogs</title>
        </Helmet>
        <h1 className="text-center" style={{ marginTop: "2rem" }}>
          Read
        </h1>
        {/* if empty show an empty message else show the blogs */}
        {this.state.blogsList.length === 0 ? (
          <h3 className="text-center">No blogs to show</h3>
        ) : null}
        <div className="row" style={{ color: "black", marginTop: "2rem" }}>
          {this.state.blogsList.map((blog) => (
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  {/* show only first two paragraphs */}
                  <ReactMarkdown className="card-text">
                    {blog.content.substring(0, 200)}
                  </ReactMarkdown>
                  <Link to={`/blogs/${blog.slug}`} className="btn btn-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default BlogsList;
