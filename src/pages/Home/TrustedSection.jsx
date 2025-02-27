import React from "react";
import styles from "./Home.module.css";
import toyotaLogo from "../../assets/brands/toyotaLogo.png";
import unileverLogo from "../../assets/brands/unileverLogo.png";
import oxfordLogo from "../../assets/brands/oxfordLogo.png";
import depaulLogo from "../../assets/brands/depaulUniversity.png";
import azureLogo from "../../assets/brands/microsoftAzure.png";
import iitBombayLogo from "../../assets/brands/iitBombayLogo.png";

const TrustedSection = () => {
  return (
    <section className={styles.trustedSection}>
      <h2 className={styles.trustedTitle}>Trusted by Industry Leaders</h2>
      <p className={styles.trustedSubtitle}>
        We work with the world's most innovative organizations to deliver
        actionable insights.
      </p>
      <div className={styles.logosContainer}>
        <div className={styles.logoItem}>
          <img src={toyotaLogo} alt="Toyota Logo" />
        </div>
        <div className={styles.logoItem}>
          <img src={unileverLogo} alt="Unilever Logo" />
        </div>
        <div className={styles.logoItem}>
          <img src={azureLogo} alt="Microsoft Azure Logo" />
        </div>
        <div className={styles.logoItem}>
          <img src={oxfordLogo} alt="Oxford University Logo" />
        </div>
        <div className={styles.logoItem}>
          <img src={depaulLogo} alt="Depaul University Logo" />
        </div>
        <div className={styles.logoItem}>
          <img src={iitBombayLogo} alt="IIT Bombay Logo" />
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
