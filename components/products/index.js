import Product from "./product";
import { productsStyle } from "./products.module.css";

const Products = ({ productVariations, loading }) => {
  return (
    <div className={productsStyle}>
      {loading && <>در حال بارگذاری ...</>}
      {!loading &&
        productVariations?.keys?.map((item) => {
          const product = productVariations?.values?.[item];
          return <Product key={item} product={product} />;
        })}
    </div>
  );
};
export default Products;
