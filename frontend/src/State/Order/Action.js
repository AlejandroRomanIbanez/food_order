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
  PAYMENT_SUCCESS_REQUEST,
  PAYMENT_SUCCESS_SUCCESS,
  PAYMENT_SUCCESS_FAILURE,
} from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const { data } = await api.post(
      `api/order`,
      { ...reqData.order, totalPrice: reqData.totalPrice },
      {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
        params: {
          success_url: "http://localhost:3000/payment/success",
        },
      }
    );
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

export const paymentSuccess = (paymentId, jwt) => async (dispatch) => {
  dispatch({ type: PAYMENT_SUCCESS_REQUEST });
  try {
    const { data } = await api.get(`api/payment/success/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: PAYMENT_SUCCESS_SUCCESS, payload: data });
    console.log("Payment Success data", data);
  } catch (err) {
    dispatch({ type: PAYMENT_SUCCESS_FAILURE, payload: err });
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
