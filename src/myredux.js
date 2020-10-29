import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";

//Actions
export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/api/products");
  const data = await res.json();
  dispatch({ type: "FETCH_PRODUCTS", payload: data });
};

const initialState = { items: [] };

//reducer
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return { items: action.payload };
    default:
      return state;
  }
};

//store
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  productReducer,
  composeEnhancer(applyMiddleware(ReduxThunk))
);
