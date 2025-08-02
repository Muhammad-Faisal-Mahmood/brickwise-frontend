import "./App.css";
import Routes from "./router/routes";
import "slick-carousel/slick/slick.css";
import React, { useEffect } from "react";
import { ConfigProvider, theme } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectDarkMode } from "./redux/features/themeSlice";
import { fetchCurrentUser } from "./redux/actions/fetchCurrentUser";

function App() {
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

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
