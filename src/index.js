import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import Home from "./Home";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Details from "./Details";
import NotFound from "./NotFound";
import List from "./List";
import BlogsList from "./BlogsList";
import BlogDetail from "./BlogDetail";
import TagsList from "./TagsList";
import "bootstrap/dist/css/bootstrap.css";
import withTracker from "./WithTracker";
import HomePage from "./HomePage";
import AddManhwa from "./AddManhwa";
ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/addmanhwa" component={withTracker(AddManhwa)} />
      <Route
        exact
        path="/manhwa/:manhwaSlug"
        component={withTracker(Details)}
      />
      <Route exact path="/tag/:tagsSlug" component={withTracker(TagsList)} />
      <Route exact path="/list/:listSlug" component={withTracker(List)} />
      <Route exact path="/home" component={withTracker(HomePage)} />
      <Route
        exact
        path="/blogs/:blogSlug"
        component={withTracker(BlogDetail)}
      />
      <Route exact path="/blogs/" component={withTracker(BlogsList)} />
      <Route exact path="/" component={withTracker(Home)} />
      <Route path="/" component={withTracker(NotFound)} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
