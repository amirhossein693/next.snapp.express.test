import {
  productStyle,
  productTitleStyle,
  productPriceStyle,
} from "./products.module.css";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";

const Product = ({ product }) => {
  return (
    <div className={productStyle}>
      <img
        width={100}
        height={100}
        alt={product?.title}
        title={product?.title}
        src={product?.featured}
      />
      <div className={productTitleStyle}>{product?.title}</div>
      <strong className={productPriceStyle}>
        {digitsEnToFa(addCommas(product?.price))} تومان
      </strong>
    </div>
  );
};
export default Product;
