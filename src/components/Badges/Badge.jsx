import styles from "./Badge.module.css";
import { BADGE_TYPES } from "../../constants/badges";
// console.log(BADGE_TYPES);

const Badge = ({ type, badgeText }) => {
  const badgeType = BADGE_TYPES[type] || {};
  const Icon = badgeType.icon;

  return (
    <div
      className={`badge ${styles[badgeType.className] || styles.defaultBadge} `}
    >
      {Icon && <Icon />}
      {badgeType.text || badgeText}
    </div>
  );
};

export default Badge;
