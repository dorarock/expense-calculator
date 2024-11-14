import styles from "./page.module.scss";
import React from "react";
import AddExpenseForm from "../components/AddExpenseForm/AddExpenseForm";
import ExpenseList from "../components/ExpenseList/ExpenseList";
import Modal from "../components/Modal/Modal";
import AddExpenseBtn from "../components/AddExpenseBtn/AddExpenseBtn";

enum Links {
  Linkedin = "https://www.linkedin.com/in/daria-khudiakova-462126225/"
}

export default function Home() {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <ExpenseList />
        <Modal>
          <AddExpenseForm />
        </Modal>
        <AddExpenseBtn />
      </main>
      <footer className={styles.footer}>
        <a className={styles.link} href={Links.Linkedin} target="_blank" rel="noreferrer">
          My linkedin
        </a>
      </footer>
    </div>
  );
}
