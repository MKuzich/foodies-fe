import clsx from "clsx";

import styles from "./SegmentedSwitch.module.css";

const SegmentedSwitch = ({ options, value, onChange, className = "", isHome = true }) => (
  <div className={clsx(styles.switch, className, !isHome && styles.switchDark)}>
    {options.map((opt) => (
      <button
        key={opt.value}
        type="button"
        className={clsx(
          value === opt.value ? `${styles.active} active` : "",
          !isHome && styles.buttonDark,
        )}
        onClick={() => onChange(opt.value)}
      >
        <span>{opt.label}</span>
      </button>
    ))}
  </div>
);

export default SegmentedSwitch;
