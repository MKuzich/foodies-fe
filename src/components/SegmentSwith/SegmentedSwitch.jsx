import styles from "./SegmentedSwitch.module.css";
import clsx from "clsx";

const SegmentedSwitch = ({ options, value, onChange, className = "", isHome = true }) => (
  <div className={clsx(styles.switch, className, !isHome && styles.switchDark)}>
    {options.map((opt) => (
      <button
        key={opt.value}
        type="button"
        className={clsx(
          value === opt.value ? `${styles.active} active` : "",
          !isHome && styles.buttonDark
        )}
        onClick={() => onChange(opt.value)}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

export default SegmentedSwitch;
