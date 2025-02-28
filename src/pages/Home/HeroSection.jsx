import React from "react";
import styles from "./Home.module.css";
import { FiArrowRight } from "react-icons/fi";
import Synapses from "../../components/Models/Synapses";
import { Link, useNavigate } from "react-router-dom";
import checkLoggedIn from "../../utils/checkLoggedIn";

const HeroSection = () => {
  const redirectPath = checkLoggedIn();

  return (
    <section>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            <span>AI-Powered</span> Customer Understanding
          </h1>
          <p className={styles.heroSubtext}>
            Transform weeks of research into instant insights. Discover what
            truly drives your customers' decisions and create winning strategies
            in
            <span> minutes, not months</span>.
          </p>
          <Link className={styles.heroActionLink} to={redirectPath}>
            <button className={styles.heroAction}>
              Begin Your Analysis <FiArrowRight className={styles.arrowIcon} />
            </button>
          </Link>
        </div>
        <div className={styles.imgContainer}>
          <img
            className={styles.heroImage}
            src="/images/heroImage.png"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
