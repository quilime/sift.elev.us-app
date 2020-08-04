import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

// import store_config from "../assets/store_config";

const initialState = {
  imageViewSize: "large"
}

const reducers = function calls(state = { ...initialState }, action) {
  // let config = { ...state.config };
  switch (action.type) {
    case "SET_IMAGEVIEWSIZE":
      return { ...state, imageViewSize: action.imageViewSize };
    case "SET_LOGGED_IN":
      return { ...state, loggedIn: action.loggedIn };
    case "SET_USER":
      return { ...state, user: action.user };
    // case "SET_PRODUCTS":
    //   config.products = action.products;
    //   return { ...state, config };
    // case "SET_COLLECTIONS":
    //   config.collections = action.collections;
    //   return { ...state, config };
    default:
      return state;
  }
};

export default history =>
  combineReducers({
    router: connectRouter(history),
    reducers
  });
