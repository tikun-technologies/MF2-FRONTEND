import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ClipLoader color="#36d7b7" loading={loading} size={50} />
    </div>
  );
};

export default Spinner;
