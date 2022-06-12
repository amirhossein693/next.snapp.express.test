import simpleSerializer from "../utils/simpleSerializer";
import { GET_PRODUCTS, GET_PRODUCTS_SUCCESS } from "./names";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, loading: true };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        productVariations: simpleSerializer(action.payload.product_variations),
      };
    default:
      return state;
  }
};

export default reducer;
