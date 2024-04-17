import { api } from "../../components/config/api";
import {
  GET_RESTAURANTS_ORDER_FAILURE,
  GET_RESTAURANTS_ORDER_REQUEST,
  GET_RESTAURANTS_ORDER_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
} from "./ActionType";

export const fetchRestaurantsOrder =
  ({ restaurantId, orderStatus, jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });
    try {
      const { data } = await api.get(
        `api/admin/order/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          params: {
            order_status: orderStatus,
          },
        }
      );
      dispatch({ type: GET_RESTAURANTS_ORDER_SUCCESS, payload: data });
      console.log("Restaurants Orders data", data);
    } catch (err) {}
  };

export const updateOrderStatus =
  ({ orderId, orderStatus, jwt }) =>
  async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    try {
      const { data } = await api.put(
        `api/admin/order/${orderId}/${orderStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: data });
      console.log("Updated Order data", data);
    } catch (err) {
      dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: err });
      console.log("error", err);
    }
  };
