import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { HiSearch } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = ({ fixed }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for", searchQuery);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.navLeft}>
          <Link to="/" className={styles.navLink}>
            <img src="/images/mindgenomics.png" className={styles.navLogo} />
          </Link>
          <Link to="/" className={styles.navLink}>
            <h2 className={`gradient-text ${styles.navLogoText}`}>
              Mind Genome
            </h2>
          </Link>
        </div>
        {/* <div className={styles.navLinks}>
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
        </div> */}
        <div className={styles.rightSection}>
          {/* <form onSubmit={handleSearch} className={styles.searchForm}>
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
          </form> */}
          <Link to="/login" className={styles.navLink}>
            <button className="btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
