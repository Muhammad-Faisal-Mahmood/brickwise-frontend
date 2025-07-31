import React, { useState } from "react";
import { Card, InputNumber, Select, Button, Divider, Typography } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

const HomeCostEstimator = () => {
  const [form, setForm] = useState({
    type: "Single Portion",
    marlas: 5, // NEW: default to 5 marlas
    floors: 1,
  });

  const MARLA_TO_SQFT = 272.25;

  // Fixed rates
  const rates = {
    brickRate: 12,
    cementRate: 950,
    ironRate: 230,
    laborRate: 1500,
    machineryRate: 5000,
  };

  const typeMultipliers = {
    SinglePortion: 1,
    DoublePortion: 1.2,
    Basement: 1.3,
    Plaza: 1.5,
    Shops: 1.4,
    Banks: 1.6,
  };

  const estimateMaterials = () => {
    const { marlas, floors } = form;
    const area = marlas * MARLA_TO_SQFT;

    const bricksQty = Math.ceil((area / 100) * 500 * floors);
    const cementQty = Math.ceil((area / 100) * 4 * floors);
    const ironQty = Math.ceil((area / 100) * 50 * floors);
    const laborDays = Math.ceil(area * 0.02);
    const machineryDays = floors * 2;

    return { bricksQty, cementQty, ironQty, laborDays, machineryDays, area };
  };

  const calculateTotal = () => {
    const { bricksQty, cementQty, ironQty, laborDays, machineryDays } =
      estimateMaterials();
    const multiplier = typeMultipliers[form.type] || 1;

    const baseCost =
      bricksQty * rates.brickRate +
      cementQty * rates.cementRate +
      ironQty * rates.ironRate +
      laborDays * rates.laborRate +
      machineryDays * rates.machineryRate;

    return Math.ceil(baseCost * multiplier);
  };

  const materials = estimateMaterials();

  return (
    <div className="mx-auto ">
      <Title
        level={1}
        className="text-center  text-primary-heading dark:text-dark-heading"
      >
        Construction Cost Estimator
      </Title>
      <Card className="bg-white dark:bg-dark-accent shadow rounded-2xl my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Text>Type of Construction:</Text>
            <Select
              value={form.type}
              onChange={(v) => setForm({ ...form, type: v })}
              className="w-full"
            >
              <Option value="Single Portion">Single Portion</Option>
              <Option value="Double Portion">Double Portion</Option>
              <Option value="Basement">Basement</Option>
              <Option value="Plaza">Plaza</Option>
              <Option value="Shops">Shops</Option>
              <Option value="Banks">Banks</Option>
            </Select>
          </div>
          <div>
            <Text>Total Area (Marlas):</Text>
            <InputNumber
              value={form.marlas}
              onChange={(v) => setForm({ ...form, marlas: v })}
              className="w-full"
              min={1}
            />
            <Text type="secondary">≈ {materials.area.toFixed(0)} sq ft</Text>
          </div>
          <div>
            <Text>Number of Floors:</Text>
            <InputNumber
              value={form.floors}
              onChange={(v) => setForm({ ...form, floors: v })}
              className="w-full"
              min={1}
            />
          </div>
        </div>

        <Divider>📦 Estimated Materials</Divider>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Text>Bricks Qty:</Text>
            <div>
              {materials.bricksQty.toLocaleString()} × PKR {rates.brickRate}
            </div>
          </div>
          <div>
            <Text>Cement Bags:</Text>
            <div>
              {materials.cementQty.toLocaleString()} × PKR {rates.cementRate}
            </div>
          </div>
          <div>
            <Text>Iron (kg):</Text>
            <div>
              {materials.ironQty.toLocaleString()} × PKR {rates.ironRate}
            </div>
          </div>
        </div>

        <Divider>🛠 Labor & Machinery</Divider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Text>Labor Days:</Text>
            <div>
              {materials.laborDays} × PKR {rates.laborRate}
            </div>
          </div>
          <div>
            <Text>Machinery Days:</Text>
            <div>
              {materials.machineryDays} × PKR {rates.machineryRate}
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-white dark:bg-dark-accent shadow rounded-2xl">
        <Title level={4}> Total Estimated Cost</Title>
        <Text className="text-2xl text-primary-heading dark:text-dark-heading font-bold">
          PKR {calculateTotal().toLocaleString()}
        </Text>
      </Card>
    </div>
  );
};

export default HomeCostEstimator;
