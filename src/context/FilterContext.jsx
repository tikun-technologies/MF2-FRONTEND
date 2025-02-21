import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [activeFilter, setActiveFilter] = useState("Top-Down");
  const [activeVisualization, setActiveVisualization] = useState("table");
  return (
    <FilterContext.Provider
      value={{
        activeFilter,
        setActiveFilter,
        activeVisualization,
        setActiveVisualization,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// create custom hook for access

export const useFilter = () => {
  return useContext(FilterContext);
};
