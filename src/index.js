import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import Home from "./Home";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Details from "./Details";
import NotFound from "./NotFound";
import List from "./List";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/manhwa/:manhwaSlug" component={Details} />
      <Route exact path="/list/:listSlug" component={List} />
      <Route exact path="/" component={Home} />
      <Route path="/" component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
