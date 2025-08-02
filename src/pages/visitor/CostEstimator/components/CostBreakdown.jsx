// components/CostBreakdown.jsx
import React from "react";
import { Card, Typography, Space } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

const { Text } = Typography;

const CostBreakdown = ({ costs }) => {
  return (
    <Card
      className="bg-primary-backDrop dark:bg-dark-accent shadow-lg rounded-2xl h-full"
      title={
        <Space>
          <FileTextOutlined />
          <span>Cost Breakdown</span>
        </Space>
      }
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <Text>Basic Materials & Labor</Text>
          <Text strong>
            PKR{" "}
            {(
              costs.bricksCost +
              costs.cementCost +
              costs.ironCost +
              costs.laborCost +
              costs.machineryCost
            ).toLocaleString()}
          </Text>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <Text>Finishing Work</Text>
          <Text strong>PKR {costs.finishingCost.toLocaleString()}</Text>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <Text>Miscellaneous (10%)</Text>
          <Text strong>PKR {costs.miscellaneous.toLocaleString()}</Text>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <Text>Sales Tax (17%)</Text>
          <Text strong>PKR {costs.tax.toLocaleString()}</Text>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
          <Text>Contingency (15%)</Text>
          <Text strong>PKR {costs.contingency.toLocaleString()}</Text>
        </div>
      </div>
    </Card>
  );
};

export default CostBreakdown;
