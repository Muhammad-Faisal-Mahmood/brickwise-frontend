// components/Disclaimer.jsx
import React from "react";
import { Alert } from "antd";

const Disclaimer = () => {
  return (
    <Alert
      message="Important Note"
      description="This is an estimated cost based on average market rates. Actual costs may vary depending on location, material quality, labor rates, and market conditions. Please consult with local contractors for more accurate quotes."
      type="info"
      showIcon
      className="rounded-lg"
    />
  );
};

export default Disclaimer;
