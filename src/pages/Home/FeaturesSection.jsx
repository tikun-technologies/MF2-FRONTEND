import React from "react";
import { FiZap, FiTarget } from "react-icons/fi"; // Icons for the features
import { FaRegLightbulb } from "react-icons/fa";

import styles from "./Home.module.css";

const features = [
  {
    icon: <FiZap className={styles.icon} />,
    title: "Rapid Ideation",
    description:
      "Generate and test hundreds of ideas in the time it takes others to plan a single focus group. Our platform helps you explore all possibilities without limitation.",
  },
  {
    icon: <FiTarget className={styles.icon} />,
    title: "Smart Segmentation",
    description:
      "Discover natural customer groups based on how they think, not just who they are. Understand the unique mindsets that drive different purchasing decisions.",
  },
  {
    icon: <FaRegLightbulb className={styles.icon} />,
    title: "Instant Execution",
    description:
      "Turn insights into action immediately. Our platform provides clear, actionable recommendations that you can implement right away.",
  },
];

const FeaturesSection = () => {
  return (
    <section className={styles.features}>
      {features.map((feature, index) => (
        <div key={index} className={styles.featureCard}>
          {feature.icon}
          <h3 className={styles.title}>{feature.title}</h3>
          <p className={styles.description}>{feature.description}</p>
        </div>
      ))}
    </section>
  );
};

export default FeaturesSection;
