import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

import {
  selectItemsCount,
  selectUsersFollowLoading,
  selectUsersRecipesLoading,
} from "../../redux/users/selectors";
import { getSkeletons } from "../../utils/helpers";
import ProfileTestimonial from "../ProfileTestimonial/ProfileTestimonial";
import ProfileTestimonialSkeleton from "../ProfileTestimonial/ProfileTestimonialSkeleton";
import RecipePreview from "../RecipePreview/RecipePreview";
import RecipePreviewSkeleton from "../RecipePreview/RecipePreviewSkeleton";
import UserCard from "../UserCard/UserCard";
import UserCardSkeleton from "../UserCard/UserCardSkeleton";
import css from "./ListItems.module.css";

const ListItems = ({ items, type, errorText, skeletonMode }) => {
  const isRecipesLoading = useSelector(selectUsersRecipesLoading);
  const isFollowLoading = useSelector(selectUsersFollowLoading);
  const isTestimonialsLoading = useSelector((state) => state.users.testimonialsLoading);
  const itemsCount = useSelector(selectItemsCount);

  const isLoading = skeletonMode || isRecipesLoading || isFollowLoading || isTestimonialsLoading;

  return (
    <div className={css.listItemsWrap}>
      {items?.length === 0 && !isLoading ? (
        <p className={css.errorText}>{errorText}</p>
      ) : (
        <ul className={clsx(css.listItems, css[type])}>
          {isLoading ? (
            getSkeletons(itemsCount).map((skeleton) => {
              if (type === "recipe") return <RecipePreviewSkeleton key={skeleton.id} />;
              if (type === "user") return <UserCardSkeleton key={skeleton.id} />;
              if (type === "testimonial") return <ProfileTestimonialSkeleton key={skeleton.id} />;
              return null;
            })
          ) : (
            <AnimatePresence>
              {items.map((item) => {
                const commonProps = {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -10 },
                  transition: { duration: 0.3 },
                };

                if (type === "recipe") {
                  return (
                    <motion.ul key={item.id} {...commonProps}>
                      <RecipePreview recipe={item} />
                    </motion.ul>
                  );
                }
                if (type === "user") {
                  return (
                    <motion.ul key={item.id} {...commonProps}>
                      <UserCard user={item} />
                    </motion.ul>
                  );
                }
                if (type === "testimonial") {
                  return (
                    <motion.ul key={item.id} {...commonProps}>
                      <ProfileTestimonial data={item} />
                    </motion.ul>
                  );
                }
                return null;
              })}
            </AnimatePresence>
          )}
        </ul>
      )}
    </div>
  );
};

export default ListItems;
