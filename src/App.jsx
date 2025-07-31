import "./App.css";
import Routes from "./router/routes";
import "slick-carousel/slick/slick.css";
import React, { useEffect } from "react";
import { ConfigProvider, theme } from "antd";
import { useSelector } from "react-redux";
import { selectDarkMode } from "./redux/features/themeSlice";

function App() {
  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Routes />
    </ConfigProvider>
  );
}

export default App;
