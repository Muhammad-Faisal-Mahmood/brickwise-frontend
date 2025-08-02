// components/TotalCostCard.jsx
import React from "react";
import { Card, Typography } from "antd";
import { DollarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const TotalCostCard = ({ totalCost }) => {
  return (
    <Card
      className="bg-gradient-to-br from-primary-brandColor1 to-primary-brandColor1Hover text-white shadow-lg rounded-2xl h-full"
      bodyStyle={{ padding: "32px" }}
    >
      <div className="text-center">
        <DollarOutlined className="text-4xl mb-4" />
        <Title level={3} className="text-white mb-2">
          Total Estimated Cost
        </Title>
        <div className="text-3xl font-bold mb-4">
          PKR {totalCost.toLocaleString()}
        </div>
        <Text className="text-gray-100">
          Including all taxes and contingencies
        </Text>
      </div>
    </Card>
  );
};

export default TotalCostCard;
