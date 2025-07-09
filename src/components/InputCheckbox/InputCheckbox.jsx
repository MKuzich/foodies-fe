import styles from './InputCheckbox.module.css';
import { useState } from 'react';

function InputCheckbox({ placeholder, data, ...props }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState("");

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }
    const handleSelectItem = (item) => {
        setSelectedItems(item.name);
        setIsOpen(false);
    }

    return (
        <div className={styles.inputWrapper}>
            <div className={styles.inputContainer}>
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
            {isOpen && (
                <ul className={styles.dropdown}>
                    {data.map((item) => (
                        <li key={item.id} className={styles.dropdownItem} onClick={() => handleSelectItem(item)}>{item.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default InputCheckbox;