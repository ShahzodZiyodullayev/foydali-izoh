import { createStore } from "redux";
import { reducers } from "./reducers/index";

const store = createStore(
  reducers,
  {},
  window.__REDUX_DEVTOOLS_EXTENTION__ && window.__REDUX_DEVTOOLS_EXTENTION__(),
);

export default store;
