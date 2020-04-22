import {
  GET_CUSTOMERS,
  CUSTOMER_ERROR,
  CUSTOMER_ADDED,
} from "../actions/types";
const initialState = {
  customers: [],
  customer: null,
  loading: true,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CUSTOMER_ADDED:   
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: payload,
        loading: false,
      };
    case CUSTOMER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
