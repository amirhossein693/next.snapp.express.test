import { GET_PRODUCTS, GET_PRODUCTS_SUCCESS } from "./names";

export const getProductsAction = (payload) => ({ type: GET_PRODUCTS, payload });
export const getProductsSuccessAction = (payload) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload,
});
