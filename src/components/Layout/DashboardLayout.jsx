import React, { useContext } from "react";
import Sidebar from "../common/Navbar/Sidebar";
import { Outlet } from "react-router-dom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useSidebar } from "../../context/SidebarContext";

const DashboardLayout = ({ }) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      {/* Adjust margin-left based on sidebar state */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-0" // Changed ml-16 to ml-0
          }`}
      >
        <button
          onClick={toggleSidebar}
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

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
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
