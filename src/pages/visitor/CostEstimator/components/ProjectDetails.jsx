// components/ProjectDetails.jsx
import React from "react";
import { Card, InputNumber, Select, Typography, Row, Col, Space } from "antd";
import {
  HomeOutlined,
  BuildOutlined,
  ShopOutlined,
  BankOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { Option } = Select;

const ProjectDetails = ({ form, setForm, totalArea }) => {
  return (
    <Card
      className="bg-primary-backDrop dark:bg-dark-accent shadow-lg rounded-2xl mb-6"
      title={
        <Space>
          <BuildOutlined />
          <span>Project Details</span>
        </Space>
      }
    >
      <Row gutter={[24, 16]}>
        <Col xs={24} sm={12} md={8}>
          <div className="space-y-2">
            <Text
              strong
              className="text-primary-heading dark:text-dark-heading"
            >
              Construction Type
            </Text>
            <Select
              value={form.type}
              onChange={(v) => setForm({ ...form, type: v })}
              className="w-full"
              size="large"
            >
              <Option value="Home">
                <Space>
                  <HomeOutlined />
                  Home
                </Space>
              </Option>
              <Option value="Villa">
                <Space>
                  <HomeOutlined />
                  Villa
                </Space>
              </Option>
              <Option value="Apartment">
                <Space>
                  <BuildOutlined />
                  Apartment
                </Space>
              </Option>
              <Option value="Farmhouse">
                <Space>
                  <HomeOutlined />
                  Farmhouse
                </Space>
              </Option>
              <Option value="Commercial">
                <Space>
                  <ShopOutlined />
                  Commercial
                </Space>
              </Option>
              <Option value="Office">
                <Space>
                  <BankOutlined />
                  Office
                </Space>
              </Option>
            </Select>
          </div>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <div className="space-y-2">
            <Text
              strong
              className="text-primary-heading dark:text-dark-heading"
            >
              Total Area (Marlas)
            </Text>
            <InputNumber
              value={form.marlas}
              onChange={(v) => setForm({ ...form, marlas: v })}
              className="w-full"
              size="large"
              min={1}
              max={100}
            />
            <Text type="secondary" className="text-sm">
              ≈ {totalArea.toFixed(0)} sq ft total
            </Text>
          </div>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <div className="space-y-2">
            <Text
              strong
              className="text-primary-heading dark:text-dark-heading"
            >
              Number of Floors
            </Text>
            <InputNumber
              value={form.floors}
              onChange={(v) => setForm({ ...form, floors: v })}
              className="w-full"
              size="large"
              min={1}
              max={5}
            />
          </div>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <div className="space-y-2">
            <Text
              strong
              className="text-primary-heading dark:text-dark-heading"
            >
              Bedrooms
            </Text>
            <InputNumber
              value={form.bedrooms}
              onChange={(v) => setForm({ ...form, bedrooms: v })}
              className="w-full"
              size="large"
              min={1}
              max={10}
            />
          </div>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <div className="space-y-2">
            <Text
              strong
              className="text-primary-heading dark:text-dark-heading"
            >
              Bathrooms
            </Text>
            <InputNumber
              value={form.bathrooms}
              onChange={(v) => setForm({ ...form, bathrooms: v })}
              className="w-full"
              size="large"
              min={1}
              max={10}
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ProjectDetails;
