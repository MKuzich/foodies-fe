import icons from "../../assets/sprite.svg";

const Icon = ({ name, width = 24, height = 24 }) => (
  <svg width={width} height={height}>
    <use xlinkHref={`${icons}#icon-${name}`} />
  </svg>
);

export default Icon;
