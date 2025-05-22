import React, { useContext, forwardRef } from "react"; // Modified import
import { useNavigate, NavLink } from "react-router-dom";
import { GiBrain } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import AuthContext from "../../../context/AuthContext";

// Wrapped component with forwardRef
const Sidebar = forwardRef(({ isSidebarOpen }, ref) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { firstName } = user || {};

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <div
      ref={ref} // Applied the forwarded ref
      className={`bg-gray-800 text-white h-screen flex flex-col shadow-lg transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`} // Removed fixed, left, top, z-index classes
    >
      <div className={`flex items-center justify-center h-16 border-b border-gray-700 ${!isSidebarOpen && "hidden"}`}>
        {isSidebarOpen ? (
          <span className="text-xl font-semibold">MindGenomics</span>
        ) : (
          <GiBrain className="h-8 w-8 text-blue-500" />
        )}
      </div>
      <nav className={`flex-grow p-3 space-y-2 ${!isSidebarOpen && "hidden"}`}>
        {/* Studies Tab */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center !p-2 my-1 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-150 ease-in-out group ${isActive ? "bg-blue-600 text-white shadow-md" : "" // Removed redundant hover:bg-gray-700 for inactive state
            } ${!isSidebarOpen ? "justify-center" : "m-5"}`
          }
        >
          {({ isActive }) => (
            <>
              <MdDashboard className={`h-6 w-6 shrink-0 group-hover:text-white transition-colors duration-150 ease-in-out ${isActive ? "text-white" : "text-gray-400"}`} />
              {isSidebarOpen && <span className="ml-3 text-sm font-medium">Studies</span>}
            </>
          )}
        </NavLink>

        {/* Articles Tab (Example - uncomment if needed) */}
        {/* <NavLink
          to="/articles"
          className={({ isActive }) =>
            `flex items-center p-4 my-1 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-150 ease-in-out group ${
              isActive ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-700"
            } ${!isSidebarOpen ? "justify-center" : ""}`
          }
        >
          {({ isActive }) => (
            <>
              <RiArticleLine className={`h-6 w-6 shrink-0 group-hover:text-white transition-colors duration-150 ease-in-out ${isActive ? "text-white" : "text-gray-400"}`} />
              {isSidebarOpen && <span className="ml-3 text-sm font-medium">Articles</span>}
            </>
          )}
        </NavLink> */}
      </nav>

      <div className={`p-3 border-t border-gray-700 ${!isSidebarOpen && "hidden"}`}>
        {/* Profile Tab (Example - uncomment if needed) */}
        {/* {isSidebarOpen && user && (
          <NavLink
            to="/account"
            className={({ isActive }) =>
              `flex items-center p-4 my-1 rounded-lg text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-150 ease-in-out group ${
                isActive ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-700"
              }`
            }
          >
            <CgProfile className={`h-6 w-6 shrink-0 group-hover:text-white transition-colors duration-150 ease-in-out ${ ({isActive}) => isActive && "text-white"}`} />
            <span className="ml-3 text-sm font-medium">{firstName || 'Profile'}</span>
          </NavLink>
        )} */}
        <button
          onClick={handleLogout}
          className={`flex items-center p-4 my-1 rounded-lg hover:text-white transition-colors duration-150 ease-in-out group w-full text-red-400 hover:bg-red-600 ${!isSidebarOpen ? "justify-center" : ""}`
          }
        >
          <IoLogOutOutline className="h-6 w-6 shrink-0 transition-colors duration-150 ease-in-out text-red-400 group-hover:text-white" />
          {isSidebarOpen && <span className="ml-3 text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
});

export default Sidebar;
