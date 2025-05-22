import React, { useContext, useEffect, useRef } from "react"; // Added useEffect and useRef
import Sidebar from "../common/Navbar/Sidebar";
import { Outlet } from "react-router-dom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useSidebar } from "../../context/SidebarContext";

const DashboardLayout = ({ }) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const sidebarRef = useRef(null); // Created a ref for the sidebar

  // Click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (isSidebarOpen) {
          toggleSidebar();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, toggleSidebar]);

  return (
    <div className="flex h-screen bg-gray-300">
      {/* Passed the ref to the Sidebar component */}
      <Sidebar isSidebarOpen={isSidebarOpen} ref={sidebarRef} />
      {/* Adjust margin-left based on sidebar state */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-0" // Changed ml-16 to ml-0
          }`}
      >
        <button
          onClick={toggleSidebar} // This button will now only toggle, not handle outside click
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          className={`fixed top-5 z-50 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg transition-all duration-300 ease-in-out ${isSidebarOpen ? "left-60" : "left-4" // Adjusted left for new collapsed sidebar width (w-0)
            }`}
        >
          {isSidebarOpen ? (
            <IoIosArrowDropleft className="h-5 w-5" />
          ) : (
            <IoIosArrowDropright className="h-5 w-5" />
          )}
        </button>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4 md:p-6">
          <div className="container mx-auto max-w-7xl">
            {" "}
            {/* Added max-width for content */}
            <Outlet /> {/* This will render correct page */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
