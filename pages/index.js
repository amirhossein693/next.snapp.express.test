import { useReducer } from "react";
import queryString from "query-string";
import filterHelper from "../utils/filterHelper";
import simpleSerializer from "../utils/simpleSerializer";
import { API_PRODUCTS } from "../consts";
import reducer from "../store/reducer";
import {
  getProductsAction,
  getProductsSuccessAction,
} from "../store/actionTypes";
import { container, links, productsStyle, productStyle } from "./index.module.css";

const HomePage = ({ data }) => {
  const initialState = {
    loading: false,
    categories: simpleSerializer(data?.categories),
    productVariations: simpleSerializer(data?.product_variations),
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const onGetProducts = (filtersObject) => {
    const filters = filterHelper(filtersObject);
    const stringifiedFilters = queryString.stringify(filters);
    dispatch(getProductsAction());
    fetch(`${API_PRODUCTS}?${stringifiedFilters}`)
      .then((res) => res.json())
      .then(({ data }) => {
        dispatch(getProductsSuccessAction(data));
      });
  };

  const { productVariations, categories, loading } = state;
  return (
    <div className={container}>
      <div className={links}>
        {categories?.keys.map((item) => {
          const category = categories?.values[item];
          return (
            <a
              key={item}
              onClick={() =>
                onGetProducts(filterHelper({ menu_category_id: item }))
              }
            >
              {category?.title}
            </a>
          );
        })}
      </div>
      <div className={productsStyle}>
        {loading && <>loading...</>}
        {!loading &&
          productVariations?.keys.map((item) => {
            const product = productVariations?.values?.[item];
            return (
              <div key={item} className={productStyle}>
                <img width={200} height={200} src={product?.featured} />
                {product?.title}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const filters = filterHelper();
  const stringifiedFilters = queryString.stringify(filters);
  const res = await fetch(`${API_PRODUCTS}?${stringifiedFilters}`);
  const { data, status } = await res.json();
  const props = status ? { data } : {};
  return { props };
}

export default HomePage;
