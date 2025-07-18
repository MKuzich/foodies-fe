import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { setQuery } from "@/redux/recipes/slice";

import styles from "./Dropdown.module.css";

const DefaultDropdownButton = ({
  placeholder,
  selectedItems,
  handleToggle,
  className,
  ...props
}) => {
  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        className={clsx(styles.inputField, className)}
        onClick={handleToggle}
        {...props}
      >
        {selectedItems ? selectedItems : placeholder}
      </button>
      <svg className={styles.icon} width="20" height="20" viewBox="0 0 20 20">
        <use href="/src/assets/sprite.svg#icon-chevron-down" />
      </svg>
    </div>
  );
};

const DefaultDropdownList = ({ data, handleSelectItem }) => {
  return (
    <ul className={clsx(styles.dropdown)}>
      {data.map((item) => (
        <li key={item.id} className={styles.dropdownItem} onClick={() => handleSelectItem(item)}>
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
  const buttonRef = useRef(null);
  const wrapperRef = useRef(null);
  const [buttonHeight, setButtonHeight] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

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

  const handleToggle = () => {
    setIsOpen(!isOpen);
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
      dispatch(setQuery(params));
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
        className={clsx(
          className,
          !selectedItems && styles.placeholderField,
          hasError && styles.inputError,
        )}
        {...props}
      />

      {isOpen && (
        <div className={styles.inputContainer} style={{ top: buttonHeight + 10 }}>
          <List data={data} handleSelectItem={handleSelectItem} />
        </div>
      )}
      {errorMessage && <span className={clsx(styles.error)}>{errorMessage}</span>}
    </div>
  );
}

export default Dropdown;
