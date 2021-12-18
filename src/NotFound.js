import React, { Component } from "react";

class NotFound extends Component {
  // Bootsrap code for showing 404 page
  render() {
    return (
      <main className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4 justify-content-center">
            <h1>404</h1>
            <p>
              We're sorry, but the page you were looking for does not exist.
            </p>
          </div>
        </div>
      </main>
    );
  }
}
export default NotFound;
