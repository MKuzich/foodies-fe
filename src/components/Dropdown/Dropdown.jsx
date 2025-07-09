import styles from './Dropdown.module.css';
import { useState, useRef, useEffect } from 'react';


const DefaultDropdownButton = ({ placeholder, selectedItems, handleOpen, ...props }) => {
    return (
        <div style={{ position: 'relative' }}>
            <button
                type="button"
                className={styles.inputField}
                onClick={handleOpen}
                {...props}
            >{selectedItems ? selectedItems : placeholder}</button>
            <svg className={styles.icon} width="20" height="20" viewBox="0 0 20 20">
                <use href="/src/assets/sprite.svg#icon-chevron-down" />
            </svg>
        </div>
    )
}

const DefaultDropdownList = ({ data, handleSelectItem }) => {
    return (
        <ul className={styles.dropdown}>
            {data.map((item) => (
                <li key={item.id} className={styles.dropdownItem} onClick={() => handleSelectItem(item)}>{item.name}</li>
            ))}
        </ul>
    )
}


function Dropdown({
    DropdownButton: CustomButton,
    DropdownList: CustomList,
    placeholder,
    data,
    ...props
  }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState("");
    const buttonRef = useRef(null);
    const [buttonHeight, setButtonHeight] = useState(0);


    useEffect(() => {
        if (buttonRef.current) {
            setButtonHeight(buttonRef.current.offsetHeight);
        }
    }, []);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }
    const handleSelectItem = (item) => {
        setSelectedItems(item.name);
        setIsOpen(false);
    }

    const Button = CustomButton || DefaultDropdownButton;
    const List = CustomList || DefaultDropdownList;


    return (
        <div className={styles.inputWrapper}>
          <Button
            ref={buttonRef}
            placeholder={placeholder}
            selectedItems={selectedItems}
            handleOpen={handleOpen}
            {...props}
          />
          {isOpen && (
            <div
              className={styles.inputContainer}
              style={{ top: buttonHeight + 10 }}
            >
              <List data={data} handleSelectItem={handleSelectItem} />
            </div>
          )}
        </div>
      );
}

export default Dropdown;