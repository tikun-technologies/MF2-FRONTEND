import React, { useContext } from "react";
import styles from "./Sidebar.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import { GiBrain } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { RiArticleLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import AuthContext from "../../../context/AuthContext";

const Sidebar = ({ isSidebarOpen }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { firstName } = user;
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <div
      className={`${styles.sidebarContainer} ${
        isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed
      }`}
    >
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarTop}>
          {/* ✅ Studies Tab */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${styles.sidebarTab} ${isActive ? styles.active : styles.sidebarLink}`
            }
          >
            <span className={styles.sidebarIcon}>
              <GiBrain />
            </span>
            {isSidebarOpen && <span className={styles.linkText}>Studies</span>}
          </NavLink>

          {/* ✅ Articles Tab */}
          {/* <NavLink
            to="/articles"
            className={({ isActive }) =>
              `${styles.sidebarTab} ${isActive ? styles.active : styles.sidebarLink}`
            }
          >
            <span className={styles.sidebarIcon}>
              <RiArticleLine />
            </span>
            {isSidebarOpen && <span className={styles.linkText}>Articles</span>}
          </NavLink> */}
        </div>

        <div className={styles.sidebarBottom}>
          {/* ✅ Profile Tab */}
          {/* <NavLink
            to="/account"
            className={({ isActive }) =>
              `${styles.sidebarTab} ${isActive ? styles.active : styles.sidebarLink}`
            }
          >
            <span className={styles.sidebarIcon}>
              <CgProfile />
            </span>
            {isSidebarOpen && (
              <span className={styles.linkText}>{firstName}</span>
            )}
          </NavLink> */}
          <NavLink
            to="/"
            onClick={handleLogout}
            className={({ isActive }) =>
              `${styles.sidebarTab} ${isActive ? styles.active : styles.sidebarLink}`
            }
          >
            <span className={`${styles.sidebarIcon} ${styles.sidebarLogout}`}>
              <IoLogOutOutline />
            </span>
            {isSidebarOpen && <span className={styles.linkText}>Logout</span>}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
