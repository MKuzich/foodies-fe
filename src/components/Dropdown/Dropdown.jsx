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

const DefaultDropdownList = ({ data, handleSelectItem, search }) => {
  const displayData = search ? data.slice(0, 10) : data;
  
  return (
    <ul className={clsx(styles.dropdown)}>
      {displayData.length === 0 ? (
        <li className={clsx(styles.dropdownItem, styles.noResults)}>
          No results found
        </li>
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

const SearchableDropdownInput = ({ placeholder, selectedItems, handleToggle, onSearch, searchValue, ...props }) => {
  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        className={styles.inputField}
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

function Dropdown({
  DropdownButton: CustomButton,
  DropdownList: CustomList,
  placeholder,
  data,
  shouldSetUrl = false,
  search = false,
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
    if (search && searchValue) {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchValue, data, search]);

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

    if (props.onChange) {
      props.onChange(item.id);
    }

    if (shouldSetUrl) {
      const params = Object.fromEntries(searchParams.entries());
      setSearchParams({
        ...params,
        [placeholder.toLowerCase()]: item.name.split(" ").join("_"),
      });
    }
    setIsOpen(false);
  };

  const Button = search ? SearchableDropdownInput : (CustomButton || DefaultDropdownButton);
  const List = CustomList || DefaultDropdownList;

  return (
    <div className={styles.inputWrapper} ref={wrapperRef}>
      <Button
        ref={buttonRef}
        placeholder={placeholder}
        selectedItems={selectedItems}
        handleToggle={handleToggle}
        onSearch={handleSearch}
        searchValue={searchValue}
        {...props}
      />

      {isOpen && (
        <div className={clsx(styles.inputContainer, search && styles.searchContainer)} style={{ top: buttonHeight + 10 }}>
          <List data={filteredData} handleSelectItem={handleSelectItem} search={search} />
        </div>
      )}
    </div>
  );
}

export default Dropdown;
