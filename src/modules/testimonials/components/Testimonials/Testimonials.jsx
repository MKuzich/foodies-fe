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

    const mockData = [
        {
            id: 1,
            author: "Larry Pageim",
            comment: "Amazing collection of recipes! The step-by-step instructions make cooking so much easier. I've tried several dishes and they all turned out perfect. Highly recommend!",
        },
        {
            id: 2,
            author: "Sarah Johnson",
            comment: "I've been using this app for a few weeks now, and I've already tried several recipes. They all turned out great, and the app's interface is really user-friendly. I'm definitely going to continue using it!",
        },
        {
            id: 3,
            author: "John Doe",
            comment: "I've been using this app for a few weeks now, and I've already tried several recipes. They all turned out great, and the app's interface is really user-friendly. I'm definitely going to continue using it!",
        },
    ];

    return (
        <div className={styles.testimonialsContainer}>
            <p className={styles.testimonialsSubtitle}>What our customer say</p>
            <MainTitle style={{ textAlign: "center", marginBottom: value }}>Testimonials</MainTitle>
            <svg className={styles.testimonialsIcon}>
                <use href="/src/assets/sprite.svg#icon-quote" />
            </svg>
            <h3 className={styles.testimonialsComment}>Thank you for the wonderful recipe for feta pasta with tomatoes and basil. It turned out to be not only tasty, but also incredibly colorful. This has become a favorite family meal!</h3>
            <p className={styles.testimonialsAuthor}>Larry Pageim</p>
        </div>


    );
}

export default Testimonials;