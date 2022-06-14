import filterHelper from "../../utils/filterHelper";
import { useRouter } from "next/router";

const Category = ({ onGetProducts, category }) => {
  const router = useRouter();
  return (
    <a
      onClick={() => {
        onGetProducts(filterHelper({ menu_category_id: category?.id }));
        router.push({
          pathname: `/${category?.id}`,
        });
      }}
    >
      <label>{category?.title}</label>
      <img width={40} height={40} src={category?.image} />
    </a>
  );
};
export default Category;
