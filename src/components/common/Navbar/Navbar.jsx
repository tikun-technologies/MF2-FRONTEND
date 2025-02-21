import React, { useState } from "react";
import Logo from "../../../assets/mindgenomics.png";
import styles from "./Navbar.module.css";
import { HiSearch } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for", searchQuery);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <img src={Logo} className={styles.navLogo} />
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <a href="/about" className={styles.navLink}>
            About
          </a>
          <a href="/browse" className={styles.navLink}>
            Browse
          </a>
          <Link to="/dashboard" className={styles.navLink}>
            Dashboard
          </Link>
          <a href="/create" className={styles.navLink}>
            Create
          </a>
          <a href="/content" className={styles.navLink}>
            Contact
          </a>
        </div>
        <div className={styles.rightSection}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchInputWrapper}>
              <HiSearch className={styles.searchIcon} />
              <input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </form>
          <button className={styles.signInButton}>Sign In</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
