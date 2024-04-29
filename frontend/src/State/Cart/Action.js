import { api } from "../../components/config/api";
import {
  FIND_CART_FAILURE,
  FIND_CART_REQUEST,
  FIND_CART_SUCCESS,
  CLEARE_CART_FAILURE,
  CLEARE_CART_REQUEST,
  CLEARE_CART_SUCCESS,
  GET_ALL_CART_ITEMS_FAILURE,
  GET_ALL_CART_ITEMS_REQUEST,
  GET_ALL_CART_ITEMS_SUCCESS,
  ADD_ITEM_TO_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  REMOVE_CART_ITEM_FAILURE,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_ITEM_FAILURE,
  UPDATE_CART_ITEM_REQUEST,
  UPDATE_CART_ITEM_SUCCESS,
} from "./ActionType";

export const findCart = (jwt) => async (dispatch) => {
  dispatch({ type: FIND_CART_REQUEST });
  try {
    const { data } = await api.get(`api/cart`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log("Find cart data", data);
    dispatch({ type: FIND_CART_SUCCESS, payload: data });
    console.log("Find cart data", data);
  } catch (err) {
    dispatch({ type: FIND_CART_FAILURE, payload: err });
    console.log("error", err);
  }
};

export const getAllCartItems = (reqData) => async (dispatch) => {
  dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });
  try {
    const { data } = await api.get(`api/carts/${reqData.cartId}/items`, {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
      },
    });

    dispatch({ type: GET_ALL_CART_ITEMS_SUCCESS, payload: data });
    console.log("Get All itemCarts data", data);
  } catch (err) {
    dispatch({ type: GET_ALL_CART_ITEMS_FAILURE, payload: err });
    console.log("error", err);
  }
};

export const addItemToCart = (reqData) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
  try {
    const { data } = await api.put(`api/cart/add`, reqData.cartItem, {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
      },
    });
    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data });
    console.log("Added item to Cart", data);
  } catch (err) {
    dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: err });
    console.log("error", err);
  }
};

export const updateCartItem = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_ITEM_REQUEST });
  try {
    const { data } = await api.put(`api/cart-item/update`, reqData.data, {
      headers: {
        Authorization: `Bearer ${reqData.jwt}`,
      },
    });
    dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data });
    console.log("Updated Cart sucessfully", data);
    dispatch(findCart(reqData.jwt));
  } catch (err) {
    dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: err });
    console.log("error", err);
  }
};

export const removeCartItem =
  ({ cartItemId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });
    try {
      const { data } = await api.delete(`api/cart-item/${cartItemId}/remove`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: cartItemId });
      console.log("Deleted CartItem sucessfully", data);
      dispatch(findCart(jwt));
    } catch (err) {
      dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: err });
      console.log("error", err);
    }
  };

export const clearCart = () => async (dispatch) => {
  dispatch({ type: CLEARE_CART_REQUEST });
  try {
    const { data } = await api.put(
      `api/cart/clear`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    dispatch({ type: CLEARE_CART_SUCCESS, payload: data });
    console.log("Cart cleared", data);
  } catch (err) {
    dispatch({ type: CLEARE_CART_FAILURE, payload: err });
    console.log("error", err);
  }
};
