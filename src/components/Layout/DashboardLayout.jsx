import React from "react";
import Sidebar from "../common/Navbar/Sidebar";
import styles from "./Layout.module.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;
