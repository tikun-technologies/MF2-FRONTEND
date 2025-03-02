import React from "react";
import styles from "./ArticleCard.module.css";

const ArticleCard = ({
  title,
  description,
  date,
  readTime,
  category,
  image,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <span className={styles.category}>{category}</span>
      </div>
      <div className={styles.content}>
        <p className={styles.meta}>
          {date} • {readTime}
        </p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
