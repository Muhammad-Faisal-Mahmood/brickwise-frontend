import React from "react";
import { Star, AlertTriangle } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { getRecommendationColor } from "../../../../../utils/analysisHelpers";

const PricingAnalysis = ({ analysis, property }) => {
  const pricingData = [
    { name: "Price Fairness", score: analysis.priceFairness, color: "#6366f1" },
    {
      name: "Value for Money",
      score: analysis.valueForMoney,
      color: "#10b981",
    },
    {
      name: "Location Premium",
      score: analysis.locationPremium,
      color: "#8b5cf6",
    },
    {
      name: "Negotiation Room",
      score: analysis.negotiationPotential,
      color: "#f59e0b",
    },
  ];

  // Prepare data for radar chart
  const radarData = pricingData.map((item) => ({
    subject: item.name,
    score: item.score,
    fullMark: 100,
  }));

  const marketComparisonData = [
    {
      name: "This Property",
      price: 100 + analysis.marketComparison,
      fill: "#6366f1",
    },
    { name: "Market Average", price: 100, fill: "#9ca3af" },
  ];

  // Custom tooltip for radar chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
          <p className="text-gray-800 dark:text-gray-200 font-medium">
            {label}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Score:{" "}
            <span className="font-semibold text-primary-brandColor1">
              {payload[0].value}/100
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Price Assessment Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/40 dark:to-blue-900/40 p-6 rounded-xl border border-green-200 dark:border-green-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <h3 className="text-xl font-bold text-primary-heading dark:text-dark-heading">
            Price Assessment
          </h3>
          <div
            className="px-4 py-2 rounded-full text-white font-semibold"
            style={{
              backgroundColor: getRecommendationColor(analysis.recommendation),
            }}
          >
            {analysis.recommendation === "FAIR_PRICE"
              ? "FAIR PRICE"
              : analysis.recommendation}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-brandColor1 dark:text-blue-400 mb-1">
              {analysis.marketComparison > 0 ? "+" : ""}
              {analysis.marketComparison}%
            </div>
            <div className="text-sm text-primary-subHeading dark:text-dark-subHeading">
              vs Market Average
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
              {analysis.priceFairness}/100
            </div>
            <div className="text-sm text-primary-subHeading dark:text-dark-subHeading">
              Fairness Score
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              PKR {(property.price / property.size).toLocaleString()}
            </div>
            <div className="text-sm text-primary-subHeading dark:text-dark-subHeading">
              Per Sq Ft
            </div>
          </div>
        </div>
      </div>

      {/* Market Comparison Chart */}
      <div className="bg-primary-backDrop dark:bg-dark-backDrop p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-primary-heading dark:text-dark-heading mb-4">
          Market Price Comparison
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart
            data={marketComparisonData}
            margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
          >
            <defs>
              {/* Gradient for light mode */}
              <linearGradient
                id="colorThisProperty"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>

              {/* Gradient for dark mode */}
              <linearGradient
                id="colorMarketAverage"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#e5e7eb" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#e5e7eb" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#9ca3af20" />
            <XAxis
              dataKey="name"
              stroke="currentColor"
              className="text-primary-subHeading dark:text-dark-subHeading"
            />
            <YAxis
              domain={[90, 110]}
              stroke="currentColor"
              className="text-primary-subHeading dark:text-dark-subHeading"
            />
            <Tooltip content={<CustomTooltip />} />

            {/* First series: This Property */}
            <Area
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              fill="url(#colorThisProperty)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Enhanced Price Analysis Breakdown - Radar Chart */}
      <div className="bg-primary-backDrop dark:bg-dark-backDrop p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-primary-heading dark:text-dark-heading mb-4">
          Price Analysis Breakdown
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" className="dark:stroke-gray-600" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{
                    fill: "currentColor",
                    fontSize: 12,
                  }}
                  className="text-primary-subHeading dark:text-dark-subHeading"
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{
                    fill: "currentColor",
                    fontSize: 10,
                  }}
                  className="text-primary-subHeading dark:text-dark-subHeading"
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-2 gap-4">
            {pricingData.map((item, index) => (
              <div
                key={index}
                className="text-center p-4 bg-gray-50 dark:bg-dark-accent rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div
                  className="w-6 h-6 rounded-full mx-auto mb-3"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="text-2xl font-bold text-primary-heading dark:text-dark-heading mb-1">
                  {item.score}/100
                </div>
                <div className="text-xs text-primary-subHeading dark:text-dark-subHeading">
                  {item.name}
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${item.score}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alternative Donut Chart Visualization */}
      <div className="bg-primary-backDrop dark:bg-dark-backDrop p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-primary-heading dark:text-dark-heading mb-4">
          Score Distribution
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pricingData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="score"
              >
                {pricingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip type="score" />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex flex-col justify-center space-y-3">
            {pricingData.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-primary-heading dark:text-dark-heading">
                    {item.name}
                  </div>
                  <div className="text-xs text-primary-subHeading dark:text-dark-subHeading">
                    Score: {item.score}/100
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-primary-backDrop dark:bg-dark-backDrop p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-primary-heading dark:text-dark-heading mb-4">
          AI Summary
        </h3>
        <p className="text-primary-subHeading dark:text-dark-subHeading leading-relaxed">
          {analysis.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {analysis.keyPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700"
            >
              <Star className="w-4 h-4 text-primary-brandColor1 dark:text-blue-400 flex-shrink-0" />
              <span className="text-primary-subHeading dark:text-dark-subHeading text-sm">
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
        <AlertTriangle className="w-4 h-4 inline mr-2 text-yellow-600 dark:text-yellow-400" />
        This analysis is AI-generated for informational purposes only. Always
        consult with qualified real estate professionals before making
        investment decisions.
      </div>
    </div>
  );
};

export default PricingAnalysis;
