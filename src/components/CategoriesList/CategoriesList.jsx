import CategoriesItem from "../CategoriesItem/CategoriesItem";
import styles from "./CategoriesList.module.css";

function CategoriesList() {
    

    // TODO: connect store and api when will be ready
    const NewArr = new Array(11).fill({
        image: "/src/assets/Beef.jpg",
        title: "Beef",
        option: "category"
    });

    NewArr.push({
        title: "All categories",
        option: "all"
    });

    return (
        
        <ul className={styles.categoriesList}>
            {NewArr.map((item, index) => (
                <CategoriesItem key={index} {...item} />
            ))}
        </ul>
    );
}

export default CategoriesList;