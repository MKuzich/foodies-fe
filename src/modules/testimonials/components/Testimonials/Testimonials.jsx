import styles from "./Testimonials.module.css";
import MainTitle from "@/components/MainTitle/MainTitle";
import { useState, useEffect } from "react";


function Testimonials() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const value = width <= 768 ? 64 : 80;

    return (
        <div className={styles.testimonialsContainer}>
            <p className={styles.testimonialsSubtitle}>What our customer say</p>
            <MainTitle style={{ textAlign: "center", marginBottom: value }}>Testimonials</MainTitle>
            <svg className={styles.testimonialsIcon}>
                <use href="/src/assets/sprite.svg#icon-quote" />
            </svg>
            <h3 className={styles.testimonialsComment}>Thank you for the wonderful recipe for feta pasta with tomatoes and basil. It turned out to be not only tasty, but also incredibly colorful. This has become a favorite family meal!</h3>
            <p className={styles.testimonialsAuthor}>John Doe</p>

        </div>


    );
}

export default Testimonials;