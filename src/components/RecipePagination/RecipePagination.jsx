import styles from "./RecipePagination.module.css";

function RecipePagination({ currentPage, lastPage, onClick }) {

    const getVisiblePages = () => {
        const pages = [];

        if (lastPage <= 3) {
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i);
            }
        } else {
            let start = Math.max(1, currentPage - 1);
            let end = Math.min(lastPage, start + 2);

            if (end === lastPage) {
                start = Math.max(1, end - 2);
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }

        return pages;
    };

    const visiblePages = getVisiblePages();
    return (
        <div className={styles.recipePagination}>
            {visiblePages.map((pageNumber) => {
                const isActive = pageNumber === currentPage;
                return (
                    <p
                    key={pageNumber}
                    onClick={() => onClick(pageNumber)}
                    className={`${styles.recipePaginationItem} ${isActive ? styles.active : ''
                        }`}
                >
                    {pageNumber}
                </p>
                )
            })}
        </div>
    );
}

export default RecipePagination;