import React from "react";
import styles from "./Home.module.css";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const FinalCTASection = () => {
  return (
    <section className={styles.finalCtaSection}>
      <h2 className={styles.finalCtaTitle}>Stop guessing. Start knowing.</h2>
      <p className={styles.finalCtaSubtext}>
        Join forward-thinking companies using our platform to make faster,
        smarter decisions based on real customer insights.
      </p>
      <Link to="/signup">
        <button className={styles.finalCtaButton}>
          Start Your Analysis <FiArrowRight className={styles.finalCtaIcon} />
        </button>
      </Link>
    </section>
  );
};

export default FinalCTASection;
