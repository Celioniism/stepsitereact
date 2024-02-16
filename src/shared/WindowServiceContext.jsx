// WindowServiceContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const WindowServiceContext = createContext();

export const WindowServiceProvider = ({ children }) => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    isMobile: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 992,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WindowServiceContext.Provider value={windowSize}>
      {children}
    </WindowServiceContext.Provider>
  );
};

// Custom hook to use the window service
export const useWindowService = () => useContext(WindowServiceContext);
