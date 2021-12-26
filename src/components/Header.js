import React, { Component } from "react";
import { Alert } from "reactstrap";

export default class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newManhwaModal: false,
			listModal: false,
		};
	}


	render() {
		const { listModalToggle, manhwaModalToggle, clearList } = this.props;
		return (
			<div>
				<div className="row justify-content-center">
					<div
						className="col-md-6 col-md-offset-3 mb-2"
						style={{ textAlign: "center" }}
					>
						<h1>Manre</h1>
					</div>
				</div>
				<div className="row justify-content-center mb-4">
					<button className="btn btn-primary mr-2" onClick={clearList}>
						Clear list
					</button>
					<button className="btn btn-primary mr-2" onClick={listModalToggle}>
						Generate list
					</button>
					<button className="btn btn-primary" onClick={manhwaModalToggle}>
						Add Manhwa
					</button>
				</div>
				<div className="mb-24">
					<div className="row justify-content-center">
						<div className="col-md-6 col-md-offset-3">
							<p>
								I remember reading Solo leveling and getting my first shot of
								manhwa and being instantly hooked. I have been from then on
								forever on the hunt for a good manhwa, so here is my gift to
								you.
							</p>
							<p>Manre - Find new Manhwas and see what others have to say!😄</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
