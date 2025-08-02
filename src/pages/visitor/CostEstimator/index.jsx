// HomeCostEstimator.jsx
import React, { useState } from "react";
import { Row, Col } from "antd";
import EstimatorHeader from "./components/EstimatorHeader";
import ProjectDetails from "./components/ProjectDetails";
import MaterialsBreakdown from "./components/MaterialsBreakdown";
import CostBreakdown from "./components/CostBreakdown";
import TotalCostCard from "./components/TotalCostCard";
import Disclaimer from "./components/Disclaimer";
import useEstimatorCalculations from "../../../hooks/useEstimatorCalculations";

const HomeCostEstimator = () => {
  const [form, setForm] = useState({
    type: "Home",
    marlas: 5,
    floors: 1,
    bedrooms: 3,
    bathrooms: 2,
  });

  const costs = useEstimatorCalculations(form);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <EstimatorHeader />

      <ProjectDetails
        form={form}
        setForm={setForm}
        totalArea={costs.materials.area}
      />

      <MaterialsBreakdown costs={costs} />

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={16}>
          <CostBreakdown costs={costs} />
        </Col>

        <Col xs={24} lg={8}>
          <TotalCostCard totalCost={costs.total} />
        </Col>
      </Row>

      <Disclaimer />
    </div>
  );
};

export default HomeCostEstimator;
