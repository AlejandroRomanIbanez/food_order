import { api } from "../../components/config/api";
import {
  CREATE_MENU_ITEM_FAILURE,
  CREATE_MENU_ITEM_REQUEST,
  CREATE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAILURE,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
  SEARCH_MENU_ITEM_FAILURE,
  SEARCH_MENU_ITEM_REQUEST,
  SEARCH_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
  UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
  UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
} from "./ActionType";

export const createMenuItem =
  ({ menu, jwt }) =>
  async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.post(`api/admin/food`, menu, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
      console.log("Created MenuItem data", data);
    } catch (err) {
      dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: err });
      console.log("error", err);
    }
  };

export const getMenuItemsByRestaurantId = (reqData) => async (dispatch) => {
  dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
  try {
    const { data } = await api.get(
      `api/food/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}&nonveg=${reqData.nonveg}&seasonal=${reqData.seasonal}&food_category=${reqData.foodCategory}`,
      {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      }
    );
    dispatch({
      type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
      payload: data,
    });
    console.log("Restaurants MenuItems data", data);
  } catch (err) {
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: err });
    console.log("error", err);
  }
};

export const searchMenuItem =
  ({ keyword, jwt }) =>
  async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.get(`api/food/search?name=${keyword}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: SEARCH_MENU_ITEM_SUCCESS,
        payload: data,
      });
      console.log("Search results data", data);
    } catch (err) {
      dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: err });
      console.log("error", err);
    }
  };

export const updateMenuItemsAvailability =
  ({ foodId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
    try {
      const { data } = await api.put(`api/admin/food/${foodId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
        payload: data,
      });
      console.log("Updated MenuItems data", data);
    } catch (err) {
      dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, payload: err });
      console.log("error", err);
    }
  };

export const deleteFood =
  ({ foodId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.delete(`api/admin/food/${foodId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: foodId });
      console.log("Deleted Food data", data);
    } catch (err) {
      dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: err });
      console.log("error", err);
    }
  };
