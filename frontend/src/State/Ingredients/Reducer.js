import { CREATE_CATEGORY_SUCCESS } from "../Restaurant/ActionType";
import {
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  CREATE_INGREDIENT_SUCCESS,
  GET_INGREDIENTS,
  GET_INGREDIENT_CATEGORY_SUCCESS,
  UPDATE_STOCK,
  DELETE_INGREDIENT_CATEGORY_SUCCESS,
  DELETE_INGREDIENT_SUCCESS,
  UPDATE_INGREDIENT_SUCCESS,
  UPDATE_INGREDIENT_CATEGORY_SUCCESS,
} from "./ActionType";

const initialState = {
  ingredients: [],
  category: [],
  update: null,
};

const IngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
      };
    case GET_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
      };
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        category: [...state.category, action.payload],
      };
    case CREATE_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        category: [...state.category, action.payload],
      };
    case CREATE_INGREDIENT_SUCCESS:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };

    case DELETE_INGREDIENT_SUCCESS:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        ),
      };

    case DELETE_INGREDIENT_CATEGORY_SUCCESS:
      const filteredCategories = state.category.filter(
        (category) => category.id !== action.payload
      );

      const updatedIngredients = state.ingredients.map((ingredient) => {
        if (ingredient.category.id === action.payload) {
          return {
            ...ingredient,
            category: null,
          };
        } else {
          return ingredient;
        }
      });

      return {
        ...state,
        ingredients: updatedIngredients,
        category: filteredCategories,
      };

    case UPDATE_INGREDIENT_SUCCESS:
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) =>
          ingredient.id === action.payload.id ? action.payload : ingredient
        ),
      };

    case UPDATE_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient) => {
          if (ingredient.category.id === action.payload.id) {
            return {
              ...ingredient,
              category: action.payload,
            };
          } else {
            return ingredient;
          }
        }),
        category: state.category.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
      };

    case UPDATE_STOCK:
      return {
        ...state,
        update: action.payload,
        ingredients: state.ingredients.map((ingredient) =>
          ingredient.id === action.payload.id ? action.payload : ingredient
        ),
      };

    default:
      return state;
  }
};

export default IngredientsReducer;
