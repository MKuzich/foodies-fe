import styles from "./Testimonials.module.css";
import MainTitle from "@/components/MainTitle/MainTitle";
import "./SwiperCustomStyles.css";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules";
import { useScreenWidth } from "../../hooks/useScreenWidth";

function Testimonials() {
    const width = useScreenWidth();

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
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                className={styles.swiper}
            >
                {mockData.map((item, idx) => (
                    <SwiperSlide key={idx}>
                        <h3 className={styles.testimonialsComment}>{item.comment}</h3>
                        <p className={styles.testimonialsAuthor}>{item.author}</p>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
}

export default Testimonials;