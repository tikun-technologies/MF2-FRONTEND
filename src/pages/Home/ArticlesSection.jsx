import React from "react";
import ArticleCard from "../../components/Cards/ArticleCard";
import styles from "./Home.module.css";
import { FiArrowRight } from "react-icons/fi";
FiArrowRight;

const ArticlesSection = () => {
  const articlesData = [
    {
      _id: 1,
      title: "Keir Stamer pounds Zelensky",
      description:
        "Zelensky met Keir Stamer at 10 downing and he absolutely got pounded. We have never seen a pounding like this",
      date: "Feb 25, 2025",
      readTime: "5 mins",
      category: "Research",
      image:
        "https://media.cnn.com/api/v1/images/stellar/prod/2025-03-01t174617z-1698872933-rc2h4dapo419-rtrmadp-3-ukraine-crisis-britain.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
    },
    {
      _id: 2,
      title: "Keir Stamer pounds Zelensky",
      description:
        "Zelensky met Keir Stamer at 10 downing and he absolutely got pounded. We have never seen a pounding like this",
      date: "Feb 25, 2025",
      readTime: "5 mins",
      category: "Research",
      image:
        "https://media.cnn.com/api/v1/images/stellar/prod/2025-03-01t174617z-1698872933-rc2h4dapo419-rtrmadp-3-ukraine-crisis-britain.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
    },
    {
      _id: 3,
      title: "Keir Stamer pounds Zelensky",
      description:
        "Zelensky met Keir Stamer at 10 downing and he absolutely got pounded. We have never seen a pounding like this",
      date: "Feb 25, 2025",
      readTime: "5 mins",
      category: "Research",
      image:
        "https://media.cnn.com/api/v1/images/stellar/prod/2025-03-01t174617z-1698872933-rc2h4dapo419-rtrmadp-3-ukraine-crisis-britain.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
    },
    {
      _id: 4,
      title: "Keir Stamer pounds Zelensky",
      description:
        "Zelensky met Keir Stamer at 10 downing and he absolutely got pounded. We have never seen a pounding like this",
      date: "Feb 25, 2025",
      readTime: "5 mins",
      category: "Research",
      image:
        "https://media.cnn.com/api/v1/images/stellar/prod/2025-03-01t174617z-1698872933-rc2h4dapo419-rtrmadp-3-ukraine-crisis-britain.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
    },
    {
      _id: 5,
      title: "Keir Stamer pounds Zelensky",
      description:
        "Zelensky met Keir Stamer at 10 downing and he absolutely got pounded. We have never seen a pounding like this",
      date: "Feb 25, 2025",
      readTime: "5 mins",
      category: "Research",
      image:
        "https://media.cnn.com/api/v1/images/stellar/prod/2025-03-01t174617z-1698872933-rc2h4dapo419-rtrmadp-3-ukraine-crisis-britain.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
    },
    {
      _id: 6,
      title: "Keir Stamer pounds Zelensky",
      description:
        "Zelensky met Keir Stamer at 10 downing and he absolutely got pounded. We have never seen a pounding like this",
      date: "Feb 25, 2025",
      readTime: "5 mins",
      category: "Research",
      image:
        "https://media.cnn.com/api/v1/images/stellar/prod/2025-03-01t174617z-1698872933-rc2h4dapo419-rtrmadp-3-ukraine-crisis-britain.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
    },
  ];

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
