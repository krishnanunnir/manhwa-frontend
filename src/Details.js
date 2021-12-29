import { Component } from "react";
import { render } from "react-dom";
import Manhwa from "./components/Manhwa";
import Disqus from "disqus-react";
import axios from "axios";
import { baseUrl } from "./Constant";
import { Helmet } from "react-helmet";

class Details extends Component {
	constructor(props) {
		super(props);
		const {
			params: { manhwaSlug },
		} = props.match;
		this.manhwaSlug = manhwaSlug;
		this.state = {
			manhwa: {
				tags: [],
			},
		};
	}
	componentDidMount() {
		this.refreshList();
	}

	refreshList = () => {
		axios
			.get(`${baseUrl}/api/manhwa/${this.manhwaSlug}/`)
			.then((res) => this.setState({ manhwa: res.data }))
			.catch((error) => console.log(error));
	};

	render() {
		this.manhwaTitle = this.state.manhwa.title;
		return (
			<main className="details container">
				<Helmet>
					<meta charSet="utf-8" />
					<title>{this.manhwaTitle + " | Manre"}</title>
					<meta
						name="description"
						content={"Find out more about '" + this.manhwaTitle + " manhwa"}
					/>
					‍
				</Helmet>

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
