import styles from "./Testimonials.module.css";
import MainTitle from "@/components/MainTitle/MainTitle";
import "./SwiperCustomStyles.css";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { testimonialsSelector } from "@/redux/testimonials/selectors";
import { fetchTestimonials } from "../../redux/testimonials/actions";
import { useEffect } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

function Testimonials() {
    const isMobile = useMediaQuery("(max-width: 375px)");
    const testimonials = useSelector(testimonialsSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTestimonials());
    }, []);


    const value = isMobile ? 64 : 80;


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
                {testimonials.map((item, idx) => (
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