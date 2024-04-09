import * as actionTypes from "./ActionType";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_USERS_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.GET_USERS_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        orders: payload,
      };

    case actionTypes.GET_USERS_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
