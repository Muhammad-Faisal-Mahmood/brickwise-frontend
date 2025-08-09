import { Award, Home, MapPin, Shield, TrendingUp } from "lucide-react";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const CustomTick = ({ payload, x, y, textAnchor, ...rest }) => {
  const RADIAN = Math.PI / 180;
  const angle = -payload.coordinate * RADIAN; // convert to radians

  // Increase distance from chart center
  const offset = 20; // adjust for more or less spacing
  const newX = x + offset * Math.cos(angle);
  const newY = y + offset * Math.sin(angle);

  return (
    <text
      x={newX}
      y={newY}
      textAnchor={textAnchor}
      fontSize={14}
      fill="#1e293b"
    >
      {payload.value}
    </text>
  );
};

const DetailedScoresChart = ({ analysis }) => {
  const scoreData = [
    {
      category: "Market Value",
      score: analysis.marketValue,
      fullMark: 100,
      icon: TrendingUp,
    },
    {
      category: "Investment Potential",
      score: analysis.investmentPotential,
      fullMark: 100,
      icon: Award,
    },
    {
      category: "Location Quality",
      score: analysis.locationQuality,
      fullMark: 100,
      icon: MapPin,
    },
    {
      category: "Property Features",
      score: analysis.propertyFeatures,
      fullMark: 100,
      icon: Home,
    },
    {
      category: "Risk Level",
      score: 100 - analysis.riskLevel,
      fullMark: 100,
      icon: Shield,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-primary-backDrop to-gray-50 dark:from-dark-backDrop dark:to-gray-900 p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-dark-accent shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-primary-heading dark:text-dark-heading">
          Detailed Analysis
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Radar Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              data={scoreData}
              outerRadius={90}
              margin={{ top: 40, right: 60, bottom: 40, left: 60 }}
            >
              <PolarGrid stroke="#e5e7eb" className="dark:stroke-gray-700 " />
              <PolarAngleAxis dataKey="category" tick={<CustomTick />} />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                fontSize={10}
                className="fill-primary-subHeading dark:fill-dark-subHeading"
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip
                formatter={(value) => [`${value}/100`, "Score"]}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Score Details */}
        <div className="space-y-4">
          {scoreData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <IconComponent className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <span className="font-medium text-primary-heading dark:text-dark-heading text-sm sm:text-base">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <span className="font-bold text-primary-heading dark:text-dark-heading text-sm sm:text-base min-w-[3rem] text-right">
                    {item.score}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailedScoresChart;
