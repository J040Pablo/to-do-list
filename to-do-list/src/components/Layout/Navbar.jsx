import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Layout/navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          ToDoApp
        </Link>
        <div className={styles.links}>
          <Link to="/login" className={styles.link}>
            Login
          </Link>
          <Link to="/register" className={styles.link}>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
