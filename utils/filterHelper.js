const filterHelper = ({
  sort = 'product_price_asc',
  fetch_filters = 1,
  fetch_categories = 1,
  menu_category_id = 0,
  vendorCode = "po9qzk",
  page = 0,
  size = 18
} = {}) => ({
  sort,
  fetch_filters,
  fetch_categories,
  menu_category_id,
  vendorCode,
  page,
  size,
  client: "PWA",
  optionalClient: "PWA",
  appVersion: "5.6.6",
  optionalVersion: "5.6.6",
  UDID: "ca69b564-a46e-4b71-a59b-6e08975ac8d3",
});

export default filterHelper;
