import React from "react";
import {
  ShimmerTitle,
  ShimmerText,
  ShimmerThumbnail,
} from "react-shimmer-effects";

const ShimmerWrapper = ({ isLoading, children, type }) => {
  if (!isLoading) return children;

  switch (type) {
    case "title":
      return <ShimmerTitle line={1} gap={1} variant="primary" />;
    case "text":
      return <ShimmerText line={3} gap={10} />;
    case "thumbnail":
      return <ShimmerThumbnail height={150} width={150} />;
    default:
      return <ShimmerText line={2} />;
  }
};

export default ShimmerWrapper;
