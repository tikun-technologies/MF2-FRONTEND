import React from "react";
import styles from "./CustomTooltip.module.css";

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;

    return (
        <div className={styles.tooltipContainer}>
            <p className={styles.tooltipTitle}>{label}</p>
            <ul className={styles.tooltipList}>
                {payload.map((entry, index) => (
                    <li key={index} className={styles.tooltipItem}>
                        <span
                            className={styles.tooltipDot}
                            style={{ backgroundColor: entry.color }}
                        ></span>
                        <span className={styles.tooltipLabel}>{entry.name}:</span>
                        <span className={styles.tooltipValue}>{entry.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomTooltip;
