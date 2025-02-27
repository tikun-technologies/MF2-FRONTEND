import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import Logo from "../../../assets/mindGenomics.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={` container ${styles.footerContent}`}>
        <div className={styles.footerLeft}>
          <div className={styles.footerLogo}>
            <Link to="/home">
              <img src={Logo} width={"60px"} />
            </Link>
            <Link className={styles.footerLink} to="/home">
              <h4 className={`gradient-text ${styles.footerLogoText}`}>
                Mind Genome
              </h4>
            </Link>
          </div>

          <p>© 2025 All rights reserved.</p>
        </div>
        <div className={styles.footerRight}>
          <Link to="/privacy" className={styles.footerLink}>
            Privacy
          </Link>
          <Link to="/terms" className={styles.footerLink}>
            Terms
          </Link>
          <Link to="/contact" className={styles.footerLink}>
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
