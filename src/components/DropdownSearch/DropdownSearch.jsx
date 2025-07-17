import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./DropdownSearch.module.css";

const SearchableDropdownInput = ({
  placeholder,
  selectedItems,
  handleToggle,
  onSearch,
  searchValue,
  ...props
}) => {
  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        className={clsx(styles.inputField, selectedItems && styles.inputFieldSelected)}
        placeholder={selectedItems ? selectedItems.split("_").join(" ") : placeholder}
        value={searchValue}
        onChange={(e) => onSearch(e.target.value)}
        onClick={handleToggle}
        {...props}
      />
      <svg className={styles.icon} width="20" height="20" viewBox="0 0 20 20">
        <use href="/src/assets/sprite.svg#icon-chevron-down" />
      </svg>
    </div>
  );
};

const SearchableDropdownList = ({ data, handleSelectItem }) => {
  const displayData = data.slice(0, 10); // Ограничиваем до 10 элементов

  return (
    <ul className={clsx(styles.dropdown)}>
      {displayData.length === 0 ? (
        <li className={clsx(styles.dropdownItem, styles.noResults)}>No results found</li>
      ) : (
        displayData.map((item) => (
          <li key={item.id} className={styles.dropdownItem} onClick={() => handleSelectItem(item)}>
            {item.name}
          </li>
        ))
      )}
    </ul>
  );
};

function DropdownSearch({
  DropdownList: CustomList,
  placeholder,
  data,
  shouldSetUrl = false,
  resetSignal = false,
  value,
  onChange,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const buttonRef = useRef(null);
  const wrapperRef = useRef(null);
  const [buttonHeight, setButtonHeight] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (buttonRef.current) {
      setButtonHeight(buttonRef.current.offsetHeight);
    }
  }, []);

  // Clear values when resetSignal is true
  useEffect(() => {
    setSelectedItems("");
    setSearchValue("");
    setIsOpen(false);
  }, [resetSignal]);

  // Update selectedItems when value prop changes
  useEffect(() => {
    if (value) {
      const selectedItem = data.find((item) => item.id === value);
      if (selectedItem) {
        setSelectedItems(selectedItem.name);
      }
    } else {
      setSelectedItems("");
    }
  }, [value, data]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchValue("");
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

  useEffect(() => {
    if (searchValue) {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchValue, data]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItems(item.name);
    setSearchValue("");

    if (onChange) {
      onChange(item.id);
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

  const List = CustomList || SearchableDropdownList;

  return (
    <div className={styles.inputWrapper} ref={wrapperRef}>
      <SearchableDropdownInput
        ref={buttonRef}
        placeholder={placeholder}
        selectedItems={selectedItems}
        handleToggle={handleToggle}
        onSearch={handleSearch}
        searchValue={searchValue}
        {...props}
      />
      {isOpen && (
        <div
          className={clsx(styles.inputContainer, styles.searchContainer)}
          style={{ top: buttonHeight + 10 }}
        >
          <List data={filteredData} handleSelectItem={handleSelectItem} />
        </div>
      )}
    </div>
  );
}

export default DropdownSearch;
