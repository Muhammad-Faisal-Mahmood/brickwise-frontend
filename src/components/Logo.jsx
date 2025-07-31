import React from "react";
import { brandName } from "../constants/brandName";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className="flex items-center space-x-2 cursor-pointer"
    >
      <span className="text-2xl font-bold text-primary-logo dark:text-dark-logo">
        {brandName}
      </span>
    </div>
  );
};

export default Logo;
