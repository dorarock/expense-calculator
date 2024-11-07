'use client'

import {useState} from "react";
import styles from "./page.module.scss";

import AddExpenseForm from "../components/AddExpenseForm/AddExpenseForm";
import ExpenseList from "../components/ExpenseList/ExpenseList";
import Modal from "../components/Modal/Modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        {/*<PieChart />*/}
        <div>
          <ExpenseList />
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <AddExpenseForm />
          </Modal>
        </div>
        <button className={styles.fixedButton} onClick={openModal}>Add new</button>
      </main>
      <footer className={styles.footer}>
        <a className={styles.link} href="/" target="_blank" rel="noreferrer">
          Linkdin
        </a>
      </footer>
    </div>
  );
}
