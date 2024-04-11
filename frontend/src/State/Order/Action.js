import { api } from "../../components/config/api";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_USERS_ORDERS_FAILURE,
  GET_USERS_ORDERS_REQUEST,
  GET_USERS_ORDERS_SUCCESS,
  GET_USERS_NOTIFICATION_FAILURE,
  GET_USERS_NOTIFICATION_REQUEST,
  GET_USERS_NOTIFICATION_SUCCESS,
} from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const { data } = await api.post(`api/order`, reqData.order, {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
      },
    });
    if (data.paymentUrl) {
      window.location.href = data.paymentUrl;
    }
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    console.log("Created Order data", data);
  } catch (err) {
    dispatch({ type: CREATE_ORDER_FAILURE, payload: err });
    console.log("error", err);
  }
};

export const getUsersOrders = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USERS_ORDERS_REQUEST });
  try {
    const { data } = await api.get(`api/order/user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_USERS_ORDERS_SUCCESS, payload: data });
    console.log("Users Orders data", data);
  } catch (err) {
    dispatch({ type: GET_USERS_ORDERS_FAILURE, payload: err });
    console.log("error", err);
  }
};
