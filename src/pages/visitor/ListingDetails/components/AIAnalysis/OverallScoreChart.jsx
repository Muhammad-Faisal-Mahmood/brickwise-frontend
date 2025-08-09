import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { getScoreColor } from "../../../../../utils/analysisHelpers";
import { Award } from "lucide-react";

const OverallScoreChart = ({ score }) => {
  const overallScoreData = [
    { name: "Score", value: score, fill: getScoreColor(score) },
    { name: "Remaining", value: 100 - score, fill: "#e5e7eb" },
  ];

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-primary-heading dark:text-dark-heading" />
        <h4 className="font-semibold text-primary-heading dark:text-dark-heading">
          Overall Score
        </h4>
      </div>
      <div className="relative">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={overallScoreData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              {overallScoreData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div
              className="text-3xl font-bold mb-1"
              style={{ color: getScoreColor(score) }}
            >
              {score}
            </div>
            <div className="text-sm text-primary-subHeading dark:text-dark-subHeading">
              out of 100
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallScoreChart;
