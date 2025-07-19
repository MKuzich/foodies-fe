import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

// import { setQuery } from "@/redux/recipes/slice";
import styles from "./Dropdown.module.css";

const DefaultDropdownButton = ({
  placeholder,
  selectedItems,
  handleToggle,
  setIsOpen,
  className,
  ...props
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className={clsx(styles.inputField, className, selectedItems && styles.inputFieldSelected)}
        onMouseDown={handleToggle}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setTimeout(() => setIsOpen(false), 50);
          }
        }}
        {...props}
      >
        {selectedItems ? selectedItems : placeholder}
      </button>
      <svg className={styles.icon} width="18" height="18" viewBox="0 0 18 18">
        <use href="/src/assets/sprite.svg#icon-chevron-down" />
      </svg>
    </div>
  );
};

const DefaultDropdownList = ({ data, handleSelectItem, selectedIndex, setSelectedIndex }) => {
  return (
    <ul className={clsx(styles.dropdown)}>
      {data.map((item, index) => (
        <li
          key={item.id}
          className={clsx(
            styles.dropdownItem,
            selectedIndex === index && styles.dropdownItemSelected,
          )}
          onClick={() => handleSelectItem(item)}
          onMouseEnter={() => setSelectedIndex(index)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

function Dropdown({
  DropdownButton: CustomButton,
  DropdownList: CustomList,
  placeholder,
  data,
  shouldSetUrl = false,
  resetSignal = false,
  hasError = false,
  errorMessage = "",
  className,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const buttonRef = useRef(null);
  const wrapperRef = useRef(null);
  const [buttonHeight, setButtonHeight] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (buttonRef.current) {
      setButtonHeight(buttonRef.current.offsetHeight);
    }
  }, []);

  // Сброс состояния при изменении resetSignal
  useEffect(() => {
    setSelectedItems("");
    setIsOpen(false);
  }, [resetSignal]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (searchParams.get(placeholder.toLowerCase())) {
      setSelectedItems(searchParams.get(placeholder.toLowerCase()));
    } else {
      setSelectedItems("");
    }
  }, [searchParams, placeholder]);

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < data.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : data.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && data[selectedIndex]) {
          handleSelectItem(data[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setSelectedIndex(-1);
  };

  const handleSelectItem = (item) => {
    setSelectedItems(item.name);

    if (props.onChange) {
      props.onChange(item.id);
    }

    if (shouldSetUrl) {
      const params = Object.fromEntries(searchParams.entries());
      setSearchParams({
        ...params,
        page: 1,
        [placeholder.toLowerCase()]: item.name.split(" ").join("_"),
      });
    }
    setIsOpen(false);
  };

  const Button = CustomButton || DefaultDropdownButton;
  const List = CustomList || DefaultDropdownList;

  return (
    <div className={clsx(styles.inputWrapper)} ref={wrapperRef}>
      <Button
        ref={buttonRef}
        placeholder={placeholder}
        selectedItems={selectedItems}
        handleToggle={handleToggle}
        setIsOpen={setIsOpen}
        onKeyDown={handleKeyDown}
        className={clsx(
          className,
          !selectedItems && styles.placeholderField,
          hasError && styles.inputError,
        )}
        {...props}
      />

      {isOpen && (
        <div className={styles.inputContainer} style={{ top: buttonHeight + 10 }}>
          <List
            data={data}
            handleSelectItem={handleSelectItem}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        </div>
      )}
      {errorMessage && <span className={clsx(styles.error)}>{errorMessage}</span>}
    </div>
  );
}

export default Dropdown;
