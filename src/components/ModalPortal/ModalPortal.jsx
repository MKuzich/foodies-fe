import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

export const ModalPortal = ({ children }) => {
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    const node = document.getElementById('modal-root');
    setModalRoot(node);
  }, []);

  if (!modalRoot) return null;

  return createPortal(children, modalRoot);
};
