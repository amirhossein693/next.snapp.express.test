import c from "classnames";
import { useRouter } from "next/router";
import filterHelper from "../../utils/filterHelper";
import pageCalcHelper from "../../utils/pageCalcHelper";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import {
  paginationStyle,
  paginationButtonStyle,
  activePage,
} from "./pagination.module.css";

const Pagination = ({ onGetProducts, filters, meta, loading }) => {
  const router = useRouter();
  const { page, size, total } = meta?.pagination ?? {};
  const totalLength = Math.floor(total / size);
  const totalPages = pageCalcHelper(totalLength);
  const currentPage = page ?? 0;

  const clickHandler = (page) => {
    const { cid } = router?.query;
    const pathname = cid ? `/${cid}` : "/";
    onGetProducts(
      filterHelper({
        menu_category_id: filters?.menu_category_id,
        sort: filters?.sort,
        page,
      })
    );
    router.push({
      pathname,
      query: { page: page + 1 },
    });
  };

  return (
    <div className={paginationStyle}>
      {totalPages.length > 0 && (
        <>
          {!loading && (
            <>
              {currentPage !== 0 && currentPage >= 4 && (
                <>
                  <a
                    onClick={() => clickHandler(0)}
                    className={c(paginationButtonStyle)}
                  >
                    {digitsEnToFa(1)}
                  </a>{" "}
                  ...
                </>
              )}
              {totalPages?.map((record) => {
                if (currentPage < record + 4 && currentPage > record - 4) {
                  return (
                    <a
                      onClick={() => clickHandler(record)}
                      className={c(paginationButtonStyle, {
                        [activePage]:
                          (!currentPage && record === 0) ||
                          currentPage === record,
                      })}
                      key={record}
                    >
                      {digitsEnToFa(record + 1)}
                    </a>
                  );
                }
              })}
              {currentPage !== totalLength && currentPage + 4 <= totalLength && (
                <>
                  ...
                  <a
                    onClick={() => clickHandler(totalLength)}
                    className={c(paginationButtonStyle)}
                  >
                    {digitsEnToFa(totalLength + 1)}
                  </a>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Pagination;
