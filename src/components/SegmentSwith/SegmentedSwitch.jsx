import styles from "./SegmentedSwitch.module.css";

const SegmentedSwitch = ({ options, value, onChange, className = "" }) => (
  <div className={`${styles.switch} ${className}`}>
    {options.map((opt) => (
      <button
        key={opt.value}
        type="button"
        className={value === opt.value ? `${styles.active} active` : ""}
        onClick={() => onChange(opt.value)}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

export default SegmentedSwitch;
