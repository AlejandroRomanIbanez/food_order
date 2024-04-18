import { api } from "../../components/config/api";
import {
  GET_INGREDIENTS,
  UPDATE_STOCK,
  CREATE_INGREDIENT_REQUEST,
  CREATE_INGREDIENT_SUCCESS,
  CREATE_INGREDIENT_FAILURE,
  CREATE_INGREDIENT_CATEGORY_REQUEST,
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  CREATE_INGREDIENT_CATEGORY_FAILURE,
  GET_INGREDIENT_CATEGORY_REQUEST,
  GET_INGREDIENT_CATEGORY_SUCCESS,
  GET_INGREDIENT_CATEGORY_FAILURE,
  DELETE_INGREDIENT_SUCCESS,
  DELETE_INGREDIENT_CATEGORY_SUCCESS,
} from "./ActionType";

export const getIngredientsOfRestaurants =
  ({ restaurantId, jwt }) =>
  async (dispatch) => {
    try {
      const { data } = await api.get(
        `api/admin/ingredients/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: GET_INGREDIENTS, payload: data });
      console.log("Ingredients data", data);
    } catch (err) {
      console.log(err);
    }
  };

export const createIngredient =
  ({ ingredient, jwt }) =>
  async (dispatch) => {
    try {
      const { data } = await api.post(`api/admin/ingredients`, ingredient, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: data });
      console.log("Created Ingredient data", data);
    } catch (err) {
      dispatch({ type: CREATE_INGREDIENT_FAILURE, payload: err });
      console.log("error", err);
    }
  };

export const createIngredientCategory =
  ({ category, jwt }) =>
  async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });
    try {
      const { data } = await api.post(
        `api/admin/ingredients/category`,
        category,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: CREATE_INGREDIENT_CATEGORY_SUCCESS, payload: data });
      console.log("Created Ingredient Category data", data);
    } catch (err) {
      dispatch({ type: CREATE_INGREDIENT_CATEGORY_FAILURE, payload: err });
      console.log("error", err);
    }
  };

export const getIngredientCategory =
  ({ restaurantId, jwt }) =>
  async (dispatch) => {
    try {
      const { data } = await api.get(
        `api/admin/ingredients/restaurant/${restaurantId}/category`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: GET_INGREDIENT_CATEGORY_SUCCESS, payload: data });
      console.log("Ingredient Category data", data);
    } catch (err) {
      dispatch({ type: GET_INGREDIENT_CATEGORY_FAILURE, payload: err });
      console.log("error", err);
    }
  };

export const updateStockOfIngredient =
  ({ ingredientId, jwt }) =>
  async (dispatch) => {
    try {
      const { data } = await api.put(
        `api/admin/ingredients/${ingredientId}/stock`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: UPDATE_STOCK, payload: data });
      console.log("Updated Stock data", data);
    } catch (err) {
      console.log(err);
    }
  };

export const deleteIngredient =
  ({ jwt, ingredientId }) =>
  async (dispatch) => {
    try {
      const { data } = await api.delete(
        `api/admin/ingredients/${ingredientId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: DELETE_INGREDIENT_SUCCESS, payload: ingredientId });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

export const deleteIngredientCategory =
  ({ jwt, categoryId }) =>
  async (dispatch) => {
    try {
      const { data } = await api.delete(
        `api/admin/ingredients/category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({
        type: DELETE_INGREDIENT_CATEGORY_SUCCESS,
        payload: categoryId,
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
