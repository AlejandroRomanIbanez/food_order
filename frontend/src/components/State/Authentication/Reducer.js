import { isPresentInFavorites } from "../../config/logic";

import * as actionTypes from "./ActionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  favorites: [],
  success: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_REQUEST:
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.GET_USER_REQUEST:
    case actionTypes.ADD_TO_FAVORITE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload,
        success: "Registered Successfully",
      };
    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case actionTypes.ADD_TO_FAVORITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        favorites: isPresentInFavorites(state.favorites, action.payload)
          ? state.favorites.filter((item) => item.id !== action.payload.id)
          : [action.payload, ...state.favorites],
      };
    case actionTypes.LOGOUT:
      return initialState;

    case actionTypes.REGISTER_FAILURE:
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.GET_USER_FAILURE:
    case actionTypes.ADD_TO_FAVORITE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: null,
      };

    default:
      return state;
  }
};
