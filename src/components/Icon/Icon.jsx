const Icon = ({ name, width = 24, height = 24 }) => (
  <svg width={width} height={height}>
    <use xlinkHref={`/src/assets/sprite.svg#icon-${name}`} />
  </svg>
);

export default Icon;