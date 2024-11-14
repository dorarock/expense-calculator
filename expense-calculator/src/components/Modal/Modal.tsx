'use client'
import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import { expenseStore } from "../../stores/ExpenseStore";
import {observer} from "mobx-react-lite";

interface ModalProps {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = observer(({ children }) => {
  if (!expenseStore.isModalOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={() => expenseStore.closeModal()}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={() => expenseStore.closeModal()}>×</button>
        {children}
      </div>
    </div>,
    document.body
  );
});

export default Modal;
