import "./App.css";
import Routes from "./router/routes";
import "slick-carousel/slick/slick.css";
import React, { useEffect } from "react";
import { ConfigProvider, theme } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectDarkMode } from "./redux/features/themeSlice";
import { fetchCurrentUser } from "./redux/actions/fetchCurrentUser";
import { ClipLoader } from "react-spinners";

function App() {
  const darkMode = useSelector(selectDarkMode);
  const { loading } = useSelector((state) => state.auth);
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

  // Show spinner while loading user data
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-center">
          <ClipLoader
            color={darkMode ? "#ffffff" : "#3b82f6"}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading application...
          </p>
        </div>
      </div>
    );
  }

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
