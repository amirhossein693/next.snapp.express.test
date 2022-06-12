import { GET_PRODUCTS, GET_PRODUCTS_SUCCESS } from "./names";

export const getProductsAction = () => ({ type: GET_PRODUCTS });
export const getProductsSuccessAction = (payload) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload,
});
