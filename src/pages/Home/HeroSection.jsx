import React from "react";
import styles from "./Home.module.css";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import Lottie from "lottie-react"; // ✅ Import Lottie
import checkLoggedIn from "../../utils/checkLoggedIn";
import mindAnimation from "../../assets/lottie/mindGenome.json"; // ✅ Import your Lottie JSON

const HeroSection = () => {
  const redirectPath = checkLoggedIn();

  return (
    <section>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            <span>Decode</span> Human Decision Making
          </h1>
          <p className={styles.heroSubtext}>
            The best opportunities aren’t invented—they’re uncovered. Mind
            Genomics instantly deciphers hidden consumer patterns, helping you
            predict trends and turn insights into winning strategies—
            <span> faster than ever.</span>
          </p>
          <Link className={styles.heroActionLink} to={redirectPath}>
            <button className="btn-primary">
              Begin Your Analysis <FiArrowRight className={styles.arrowIcon} />
            </button>
          </Link>
        </div>

        {/* ✅ Replace <img> with <Lottie /> */}
        <div className={styles.imgContainer}>
          <Lottie
            animationData={mindAnimation}
            loop={true}
            autoplay={true}
            className={styles.heroAnimation}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
