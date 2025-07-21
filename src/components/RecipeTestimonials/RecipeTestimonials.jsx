import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Pagination from "@/components/Pagination/Pagination";

import api from "../../api";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import IconButton from "../IconButton/IconButton";
import Loader from "../Loader/Loader";
import s from "./RecipeTestimonials.module.css";

export default function RecipeTestimonials() {
  const { id: recipeId } = useParams();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  const currentUser = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    setLoading(true);
    fetchTestimonials({ recipeId, page: currentPage, limit });
  }, [recipeId, currentPage]);

  useEffect(() => {
    window.addEventListener("testimonial:add", handleAdd, false);
    return () => {
      window.removeEventListener("testimonial:add", handleAdd);
    };
  }, []);

  const fetchTestimonials = async ({ recipeId: id, page, limit }) => {
    try {
      const response = await api.testimonials.fetchTestimonialsByRecipeId({
        recipeId: id,
        page,
        limit,
      });
      setTestimonials(response.data);
      setTotalPages(response.pagination.pages);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setCurrentPage(1);
    fetchTestimonials({ recipeId, page: 1, limit });
  };

  const handleDelete = async (e, id) => {
    const btn = e.currentTarget;
    btn.disabled = true;
    try {
      await api.users.deleteTestimonialsById(id);
      if (!(testimonials.length - 1)) {
        setCurrentPage(totalPages === 1 ? 1 : totalPages - 1);
        await fetchTestimonials({ recipeId, page: totalPages === 1 ? 1 : totalPages - 1, limit });
      } else {
        await fetchTestimonials({ recipeId, page: currentPage, limit });
      }
      toast.success("Successfully deleted review!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove review");
    }

    btn.disabled = false;
  };

  return (
    <>
      {loading ? (
        <div className={s.recipeTestimonials}>
          <h2 className={s.title}>Our users say</h2>
          <div className={s.loaderWrapper}>
            <Loader />
          </div>
        </div>
      ) : (
        <div className={s.recipeTestimonials}>
          <h2 className={s.title}>Our users say</h2>
          <ul className={s.testimonialsList}>
            <AnimatePresence>
              {testimonials.length > 0 &&
                testimonials.map((item) => {
                  const currentUserIsOwner = currentUser ? item.user.id === currentUser.id : false;

                  return (
                    <motion.li
                      key={item.id}
                      className={s.testimonialItem}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={s.avatarWrapper}>
                        <AvatarIcon
                          name={item.user.name}
                          src={item.user.avatarURL}
                          alt={`${item.user.name} avatar`}
                          small
                          to={`/user/${item.user.id}`}
                        />
                      </div>
                      <div>
                        <div className={s.authorInfo}>
                          <h3 className={s.authorName}>{item.user.name}</h3>
                          <span className={s.date}>
                            {new Date(item.updatedAt).toLocaleString()}
                          </span>
                        </div>
                        <p>{item.testimonial}</p>
                      </div>
                      {currentUserIsOwner && (
                        <IconButton
                          className={s.buttonDelete}
                          name="trash"
                          onClick={(e) => handleDelete(e, item.id)}
                        />
                      )}
                    </motion.li>
                  );
                })}
            </AnimatePresence>

            {!testimonials.length && <li>No reviews are available for this recipe.</li>}
          </ul>
        </div>
      )}
      {totalPages > 1 && (
        <div className={s.pagination}>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onClick={setCurrentPage}
            isLoading={loading}
          />
        </div>
      )}
    </>
  );
}
