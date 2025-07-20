import "./SwiperCustomStyles.css";
import "swiper/css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import MainTitle from "@/components/MainTitle/MainTitle";
import useMediaQuery from "@/hooks/useMediaQuery";
import { testimonialsSelector } from "@/redux/testimonials/selectors";

import Icons from "../../assets/sprite.svg";
import { fetchTestimonials } from "../../redux/testimonials/actions";
import styles from "./Testimonials.module.css";

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
        <use href={`${Icons}#icon-quote`} />
      </svg>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        className={styles.swiper}
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id}>
            <h3 className={styles.testimonialsComment}>{item.testimonial}</h3>
            <p className={styles.testimonialsAuthor}>{item.ownerName}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Testimonials;
