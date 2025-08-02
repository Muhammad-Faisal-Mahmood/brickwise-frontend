// components/MaterialsBreakdown.jsx
import React from "react";
import { Card, Typography, Row, Col, Space, Statistic } from "antd";
import {
  ToolOutlined,
  BuildOutlined,
  SafetyOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const MaterialsBreakdown = ({ costs }) => {
  return (
    <Card
      className="bg-primary-backDrop dark:bg-dark-accent shadow-lg rounded-2xl mb-6"
      title={
        <Space>
          <ToolOutlined />
          <span>Materials & Quantities</span>
        </Space>
      }
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card size="small" className="text-center">
            <Statistic
              title="Bricks"
              value={costs.materials.bricksQty}
              suffix="pcs"
              prefix={<BuildOutlined />}
            />
            <Text type="secondary">
              PKR {costs.bricksCost.toLocaleString()}
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card size="small" className="text-center">
            <Statistic
              title="Cement"
              value={costs.materials.cementQty}
              suffix="bags"
              prefix={<SafetyOutlined />}
            />
            <Text type="secondary">
              PKR {costs.cementCost.toLocaleString()}
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card size="small" className="text-center">
            <Statistic
              title="Iron"
              value={costs.materials.ironQty}
              suffix="kg"
              prefix={<ToolOutlined />}
            />
            <Text type="secondary">PKR {costs.ironCost.toLocaleString()}</Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card size="small" className="text-center">
            <Statistic
              title="Labor"
              value={costs.materials.laborDays}
              suffix="days"
              prefix={<TeamOutlined />}
            />
            <Text type="secondary">PKR {costs.laborCost.toLocaleString()}</Text>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default MaterialsBreakdown;
