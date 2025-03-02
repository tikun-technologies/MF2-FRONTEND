import React from "react";
import ArticleCard from "../../components/Cards/ArticleCard";
import styles from "./Home.module.css";
import { FiArrowRight } from "react-icons/fi";
import { articlesData } from "../../data/test/articlesData";

const ArticlesSection = () => {
  return (
    <section className={styles.articlesSection}>
      <div className={`container ${styles.articlesContainer}`}>
        <h2 className={styles.heading}>Latest Insights</h2>
        <p className={`${styles.subheading} ${styles.articleSubheading}`}>
          Discover the latest trends, research, and success stories in customer
          understanding and market research.
        </p>
        <div className={styles.articleGrid}>
          {articlesData.map((article) => (
            <ArticleCard key={article._id} {...article} />
          ))}
        </div>
        <button className={`${styles.articlesRedirect} ${styles.actionButton}`}>
          View All Articles
          <FiArrowRight className={styles.arrowIcon} />
        </button>
      </div>
    </section>
  );
};

export default ArticlesSection;
