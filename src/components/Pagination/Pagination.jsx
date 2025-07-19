import clsx from "clsx";

import css from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onClick, borders, style, isLoading }) => {
  const btnClassName = clsx(css.button, borders && css.borders, isLoading && css.loading);

  if (currentPage > totalPages) {
    return (
      <div className={css.pagination} style={style}>
        <button
          className={clsx(btnClassName, currentPage === 1 && css.active)}
          key={`first-button-${currentPage}`}
          onClick={() => onClick(1)}
          disabled={currentPage === 1}
        >
          1
        </button>
        <span className={css.ellipsis}>...</span>
      </div>
    );
  }
  return (
    <div className={css.pagination} style={style}>
      {/* first button disabled when currentPage is 1, and shows always */}
      <button
        className={clsx(btnClassName, currentPage === 1 && css.active)}
        key={`first-button-${currentPage}`}
        onClick={() => onClick(1)}
        disabled={currentPage === 1}
      >
        1
      </button>
      {currentPage > 3 && <span className={css.ellipsis}>...</span>}
      {/* middle buttons */}
      {/* if currentPage > 2, show prev button */}
      {currentPage > 2 && (
        <>
          <button
            className={clsx(btnClassName, currentPage === currentPage - 1 && css.active)}
            key={currentPage - 1}
            onClick={() => onClick(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        </>
      )}
      {/* show current page button  if currentPage is not first or last page */}
      {currentPage > 1 && currentPage < totalPages && (
        <>
          <button className={clsx(btnClassName, css.active)} key={currentPage} disabled>
            {currentPage}
          </button>
        </>
      )}
      {/* if currentPage + 1 is not last page, show next button */}
      {currentPage + 1 < totalPages && (
        <>
          <button
            className={clsx(btnClassName, currentPage === currentPage + 1 && css.active)}
            key={currentPage + 1}
            onClick={() => onClick(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        </>
      )}
      {/* last button disabled when currentPage is last page,
       does shows when totalPages is less than 2 */}
      {currentPage + 2 < totalPages && <span className={css.ellipsis}>...</span>}
      {(currentPage === totalPages || totalPages >= 2) && (
        <button
          className={clsx(btnClassName, currentPage === totalPages && css.active)}
          key={`last-button-${totalPages}`}
          onClick={() => onClick(totalPages)}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </button>
      )}
    </div>
  );
};

export default Pagination;
