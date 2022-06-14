import { useReducer } from "react";
import queryString from "query-string";
import { useRouter } from 'next/router'
import filterHelper from "../utils/filterHelper";
import simpleSerializer from "../utils/simpleSerializer";
import { API_PRODUCTS } from "../consts";
import reducer from "../store/reducer";
import {
  getProductsAction,
  getProductsSuccessAction,
} from "../store/actionTypes";
import {
  pageContainer,
  pageHeader,
  pageTitle,
} from "./index.module.css";
import Products from "../components/products";
import Categories from "../components/categories";
import Sort from "../components/sort";
import Pagination from "../components/pagination";

const HomePage = ({ data }) => {
  const router = useRouter();
  const { cid } = router.query;

  const initialState = {
    meta: data?.meta,
    loading: false,
    categories: simpleSerializer(data?.categories),
    productVariations: simpleSerializer(data?.product_variations),
    filters:{}
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { meta, productVariations, categories, filters, loading } = state;

  const onGetProducts = (filtersObject) => {
    const filters = filterHelper({...filters, ...filtersObject});
    const stringifiedFilters = queryString.stringify(filters);
    dispatch(getProductsAction({filters}));
    fetch(`${API_PRODUCTS}?${stringifiedFilters}`)
      .then((res) => res.json())
      .then(({ data }) => {
        dispatch(getProductsSuccessAction({...data, filters}));
      });
  };

  return (
    <div className={pageContainer}>
      <div className={pageHeader}>
        <h1 className={pageTitle}>سوپرمارکت</h1>
        <Sort onGetProducts={onGetProducts} meta={meta} filters={filters} />
      </div>
      <Categories onGetProducts={onGetProducts} categories={categories} filters={filters} />
      <Products productVariations={productVariations} loading={loading} />
      <Pagination onGetProducts={onGetProducts} meta={meta} filters={filters} loading={loading} />
    </div>
  );
};

export async function getServerSideProps({ query, params }) {
  const { page = 0 } = query;
  const filters = filterHelper({page: page - 1});
  const stringifiedFilters = queryString.stringify(filters);
  const result = await fetch(`${API_PRODUCTS}?${stringifiedFilters}`);
  const { data, status } = await result.json();
  const props = status ? { data } : {};
  return { props };
}

export default HomePage;
