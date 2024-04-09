import { combineReducers, legacy_createStore, applyMiddleware } from "redux";
import authReducer from "./Authentication/Reducer";
import { thunk } from "redux-thunk";
import restaurantReducer from "./Restaurant/Reducer";
import menuItemReducer from "./Menu/Reducer";
import cartItemReducer from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import RestaurantsOrderReducer from "./RestaurantOrder/Reducer";
import IngredientsReducer from "./Ingredients/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  menu: menuItemReducer,
  cart: cartItemReducer,
  order: orderReducer,
  restaurantOrder: RestaurantsOrderReducer,
  ingredients: IngredientsReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
