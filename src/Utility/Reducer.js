import { useReducer } from "react";
import { type } from "./Action.type";
export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case type.ADD_TO_BASKET:
      //checking the existing item frist
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (!existingItem) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }], //on state amount keep and add basket action item(current) ,passed amount start to 1 .//...state.basket=copy the current basket item //...action.item, amount: 1=spreads item properties and sets the quantity to 1.
        };
      } else {
        const updatedbasket = state.basket.map((item) => {
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item; // item.id === action.item.id=If item.id matches the action.item.id, it://...item=Copies the item//amount: item.amount + 1=//Increases its amount by 1 // : item=Otherwise, it just returns the original item unchanged.
        });
        return {
          ...state,
          basket: updatedbasket,
        };
      }
    case type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];
      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket.splice(index, 1);
        }
        return {
          ...state,
          basket: newBasket,
        };
      }
    case type.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case "cleanCart":
      return {
        ...state,
        basket: [],
      };
    default:
      return state;
  }
};
