import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";

import styles from "./Dropdown.module.css";

const DefaultDropdownButton = ({ placeholder, selectedItems, handleToggle, ...props }) => {
  return (
    <div style={{ position: "relative" }}>
      <button type="button" className={styles.inputField} onClick={handleToggle} {...props}>
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
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState("");
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
    }
    setIsOpen(false);
  };

  const Button = CustomButton || DefaultDropdownButton;
  const List = CustomList || DefaultDropdownList;

  return (
    <div className={styles.inputWrapper} ref={wrapperRef}>
      <Button
        ref={buttonRef}
        placeholder={placeholder}
        selectedItems={selectedItems}
        handleToggle={handleToggle}
        {...props}
      />

      {isOpen && (
        <div className={styles.inputContainer} style={{ top: buttonHeight + 10 }}>
          <List data={data} handleSelectItem={handleSelectItem} />
        </div>
      )}
    </div>
  );
}

export default Dropdown;
