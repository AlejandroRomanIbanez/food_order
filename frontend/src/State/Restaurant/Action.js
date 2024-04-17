import { api } from "../../components/config/api";
import {
  CREATE_RESTAURANT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,
  GET_ALL_RESTAURANTS_REQUEST,
  GET_ALL_RESTAURANTS_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  CREATE_EVENTS_FAILURE,
  CREATE_EVENTS_REQUEST,
  CREATE_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  DELETE_EVENT_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  GET_RESTAURANTS_EVENTS_FAILURE,
  GET_RESTAURANTS_EVENTS_REQUEST,
  GET_RESTAURANTS_EVENTS_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  GET_RESTAURANTS_CATEGORY_FAILURE,
  GET_RESTAURANTS_CATEGORY_REQUEST,
  GET_RESTAURANTS_CATEGORY_SUCCESS,
} from "./ActionType";

export const getAllRestaurants = (jwt) => async (dispatch) => {
  dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
  try {
    const { data } = await api.get(`api/restaurants`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
    console.log("All Restaurants data", data);
  } catch (err) {
    dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: err });
    console.log("error", err);
  }
};

export const getRestaurantById = (reqData) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`api/restaurants/${reqData.restaurantId}`, {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
      },
    });
    dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data });
    console.log("Restaurant data", data);
  } catch (err) {
    dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: err });
    console.log("error", err);
  }
};

export const getRestaurantByUserId = (jwt) => async (dispatch) => {
  dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
  try {
    const { data } = await api.get(`api/admin/restaurants/user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({
      type: GET_RESTAURANT_BY_USER_ID_SUCCESS,
      payload: data,
    });
    console.log("Restaurant by user id data", data);
  } catch (err) {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: err.message });
    console.log("error", err);
  }
};

export const createRestaurant = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_RESTAURANT_REQUEST });
  try {
    const { data } = await api.post(`api/admin/restaurants`, reqData.data, {
      headers: {
        Authorization: `Bearer ${reqData.token}`,
      },
    });
    dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
    console.log("Created Restaurant data", data);
  } catch (err) {
    dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: err });
    console.log("error", err);
  }
};

export const updateRestaurant =
  ({ restaurantId, restaurantData, jwt }) =>
  async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.put(
        `api/admin/restaurant/${restaurantId}`,
        restaurantData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: UPDATE_RESTAURANT_SUCCESS,
        payload: data,
      });
      console.log("Updated Restaurant data", data);
    } catch (err) {
      dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: err });
      console.log("error", err);
    }
  };

export const deleteRestaurant =
  ({ restaurantId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.delete(
        `api/admin/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
      console.log("Deleted Restaurant sucessfully", data);
    } catch (err) {
      dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: err });
      console.log("error", err);
    }
  };

export const updateRestaurantStatus =
  ({ restaurantId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
    try {
      const { data } = await api.put(
        `api/admin/restaurants/${restaurantId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: UPDATE_RESTAURANT_STATUS_SUCCESS,
        payload: data,
      });
      console.log("Updated Restaurant status", data);
    } catch (err) {
      dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: err });
      console.log("error", err);
    }
  };

export const createEventAction =
  ({ data, jwt, restaurantId }) =>
  async (dispatch) => {
    dispatch({ type: CREATE_EVENTS_REQUEST });
    try {
      const response = await api.post(
        `api/admin/events/restaurant/${restaurantId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: CREATE_EVENTS_SUCCESS, payload: response.data });
      console.log("Created Event data", response.data);
    } catch (err) {
      dispatch({ type: CREATE_EVENTS_FAILURE, payload: err });
      console.log("error", err);
    }
  };

export const getAllEvents = (jwt) => async (dispatch) => {
  dispatch({ type: GET_ALL_EVENTS_REQUEST });
  try {
    const { data } = await api.get(`api/events`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: data });
    console.log("All Events data", data);
  } catch (err) {
    dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: err });
    console.log("error", err);
  }
};

export const deleteEvent =
  ({ eventId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_EVENT_REQUEST });
    try {
      const { data } = await api.delete(`api/admin/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: DELETE_EVENT_SUCCESS, payload: eventId });
      console.log("Deleted Event data", data);
    } catch (err) {
      dispatch({ type: DELETE_EVENT_FAILURE, payload: err });
      console.log("error", err);
    }
  };

export const getRestaurantsEvents =
  ({ restaurantId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });
    try {
      const { data } = await api.get(
        `api/admin/events/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: GET_RESTAURANTS_EVENTS_SUCCESS, payload: data });
      console.log("Restaurant Events data", data);
    } catch (err) {
      dispatch({ type: GET_RESTAURANTS_EVENTS_FAILURE, payload: err });
      console.log("error", err);
    }
  };

export const createCategory =
  ({ reqData, jwt }) =>
  async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
      const { data } = await api.post(`api/admin/category`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
      console.log("Created Category data", data);
    } catch (err) {
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: err });
      console.log("error", err);
    }
  };

export const getRestaurantsCategory =
  ({ jwt, restaurantId }) =>
  async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
    try {
      const { data } = await api.get(
        `api/category/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: GET_RESTAURANTS_CATEGORY_SUCCESS,
        payload: data,
      });
      console.log("Restaurants Category data", data);
    } catch (err) {
      dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: err });
      console.log("error", err);
    }
  };
