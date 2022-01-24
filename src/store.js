import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import rootReducer from "./reducer";

const middleware = [thunk];

const store = createStore(
  rootReducer,
);

export default store;
