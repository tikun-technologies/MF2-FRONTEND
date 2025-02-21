import React from "react";
import shimmerStyles from "../../styles/Shimmer.module.css";

const Shimmer = ({ width, height, borderRadius }) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
      }}
      className={shimmerStyles.shimmer}
    ></div>
  );
};

export default Shimmer;
