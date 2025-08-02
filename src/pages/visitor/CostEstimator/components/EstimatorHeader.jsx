// components/EstimatorHeader.jsx
import React from "react";
import { Typography } from "antd";
import { CalculatorOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const EstimatorHeader = () => {
  return (
    <div className="text-center mb-8">
      <Title
        level={1}
        className="text-primary-heading dark:text-dark-heading mb-2"
      >
        <CalculatorOutlined className="mr-3" />
        Construction Cost Estimator
      </Title>
      <Text className="text-lg text-primary-subHeading dark:text-dark-subHeading">
        Get accurate estimates for your construction project
      </Text>
    </div>
  );
};

export default EstimatorHeader;
