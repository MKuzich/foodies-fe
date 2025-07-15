import clsx from "clsx";

import css from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages, onClick, borders, style }) => {
  return (
    <div className={css.pagination} style={style}>
      {/* first button disabled when currentPage is 1, and shows always */}
      <button
        className={clsx(css.button, borders && css.borders, currentPage === 1 && css.active)}
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
            className={clsx(
              css.button,
              borders && css.borders,
              currentPage === currentPage - 1 && css.active,
            )}
            onClick={() => onClick(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        </>
      )}
      {/* show current page button  if currentPage is not first or last page */}
      {currentPage > 1 && currentPage < totalPages && (
        <>
          <button className={clsx(css.button, css.active)} disabled>
            {currentPage}
          </button>
        </>
      )}
      {/* if currentPage + 1 is not last page, show next button */}
      {currentPage + 1 < totalPages && (
        <>
          <button
            className={clsx(
              css.button,
              borders && css.borders,
              currentPage === currentPage + 1 && css.active,
            )}
            onClick={() => onClick(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        </>
      )}
      {/* last button disabled when currentPage is last page, does shows when totalPages is less than 3 */}
      {totalPages > 3 && (
        <>
          {currentPage + 2 < totalPages && <span className={css.ellipsis}>...</span>}
          <button
            className={clsx(
              css.button,
              borders && css.borders,
              currentPage === totalPages && css.active,
            )}
            onClick={() => onClick(totalPages)}
            disabled={currentPage === totalPages}
          >
            {totalPages}
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
