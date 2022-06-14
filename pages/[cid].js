import filterHelper from '../utils/filterHelper';
import queryString from "query-string";
import HomePage from './index';
import { API_PRODUCTS } from '../consts';

export async function getServerSideProps({ query, params }) {
  const { page = 0 } = query;
  const { cid } = params;
  const filterObject = {page: page - 1};
  if (cid) {
    filterObject['menu_category_id'] = cid;
  }
  const filters = filterHelper(filterObject);
  const stringifiedFilters = queryString.stringify(filters);
  const result = await fetch(`${API_PRODUCTS}?${stringifiedFilters}`);
  const { data, status } = await result.json();
  const props = status ? { data, initialFilter: filters } : {};
  return { props };
}

export default HomePage;