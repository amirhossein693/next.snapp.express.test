import { useState } from "react";
import c from "classnames";
import filterHelper from "../../utils/filterHelper";
import {
  sortStyle,
  sortButton,
  sortButtonHide,
  sortBoxStyle,
  sortBoxStyleVisible,
  closeButton,
  activeSort,
} from "./sort.module.css";

const Sort = ({ onGetProducts, filters, meta }) => {
  const [sortBoxVisible, toggleSortBox] = useState(false);
  return (
    <div className={sortStyle}>
      <a
        className={c(sortButton, { [sortButtonHide]: sortBoxVisible })}
        onClick={() => toggleSortBox(true)}
      >
        ↑↓ مرتب سازی
      </a>
      <span
        className={c(sortBoxStyle, { [sortBoxStyleVisible]: sortBoxVisible })}
      >
        <a className={closeButton} onClick={() => toggleSortBox(false)}>
          ✖
        </a>
        {meta?.sort?.results?.map((record, index) => {
          return (
            <span
              key={index}
              onClick={() =>
                onGetProducts(
                  filterHelper({ menu_category_id: filters?.menu_category_id, sort: record?.name, page: filters?.page ?? 0 })
                )
              }
              className={c({ [activeSort]: record?.enabled })}
            >
              {record?.translation}
            </span>
          );
        })}
      </span>
    </div>
  );
};
export default Sort;
