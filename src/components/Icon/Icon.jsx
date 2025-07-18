import clsx from "clsx";

import icons from "../../assets/sprite.svg";

const Icon = ({ name, width = 24, height = 24, className }) => (
  <svg width={width} height={height} className={clsx(className)}>
    <use xlinkHref={`${icons}#icon-${name}`} />
  </svg>
);

export default Icon;
