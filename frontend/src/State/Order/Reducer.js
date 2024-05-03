import * as actionTypes from "./ActionType";

const initialState = {
  orders: [],
  loading: false,
  error: null,
  paymentUrl: null,
};

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_USERS_ORDERS_REQUEST:
    case actionTypes.CREATE_ORDER_REQUEST:
    case actionTypes.PAYMENT_SUCCESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        paymentUrl: payload.paymentUrl,
      };

    case actionTypes.PAYMENT_SUCCESS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        paymentUrl: null,
        orders: [...state.orders, payload],
      };

    case actionTypes.GET_USERS_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        orders: payload,
      };

    case actionTypes.GET_USERS_ORDERS_FAILURE:
    case actionTypes.CREATE_ORDER_FAILURE:
    case actionTypes.PAYMENT_SUCCESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
