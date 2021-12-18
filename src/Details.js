import { Component } from "react";
import { render } from "react-dom";
import Manhwa from "./components/Manhwa";
import Disqus from "disqus-react";
import axios from "axios";

class Details extends Component {
  constructor(props) {
    super(props);
    const {
      params: { manhwaSlug },
    } = props.match;
    this.manhwaSlug = manhwaSlug;
    this.state = {
      manhwa: {},
    };
  }
  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/manhwa/" + this.manhwaSlug)
      .then((res) => this.setState({ manhwa: res.data }));
  };

  render() {
    return (
      <main className="details container">
        <Manhwa item={this.state.manhwa} detailsPage={true} />
        <div className="row justify-content-center">
          <div className="col-md-6 col-md-offset-3">
            <Disqus.DiscussionEmbed
              shortname={"manhwarec"}
              config={{
                url: window.location.href,
                identifier: this.state.manhwa.id,
                title: this.state.manhwa.title,
              }}
            />
          </div>
        </div>
      </main>
    );
  }
}
export default Details;
