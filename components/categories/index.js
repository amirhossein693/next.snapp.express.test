import filterHelper from "../../utils/filterHelper";
import { useRouter } from "next/router";
import { categoriesStyle } from "./categories.module.css";
import Category from "./category";

const Categories = ({ onGetProducts, categories, filters }) => {
  const router = useRouter();

  return (
    <div className={categoriesStyle}>
      {filters?.menu_category_id > 0 && (
        <a
          onClick={() => {
            router.push({
              pathname: `/`,
            });
            onGetProducts(filterHelper({ menu_category_id: 0 }));
          }}
        >
          <label>{"< "} دسته‌بندی اصلی</label>
        </a>
      )}
      {categories?.keys?.map((item) => {
        const category = categories?.values[item];
        return (
          <Category
            key={item}
            onGetProducts={onGetProducts}
            category={category}
          />
        );
      })}
    </div>
  );
};
export default Categories;
