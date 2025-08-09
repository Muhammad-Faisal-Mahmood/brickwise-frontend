import React from "react";
import {
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Award,
  Home,
  MapPin,
} from "lucide-react";
import { getRecommendationColor } from "../../../../../utils/analysisHelpers";
import OverallScoreChart from "./OverallScoreChart";
import DetailedScoresChart from "./DetailedScoresChart";

const PurchaseAnalysis = ({ analysis }) => {
  const financialMetrics = [
    {
      name: "Expected Appreciation",
      value: analysis.expectedAppreciation,
      suffix: "%/year",
      icon: TrendingUp,
      color: "text-green-600 dark:text-green-400",
    },
    {
      name: "Rental Yield",
      value: analysis.rentalYield,
      suffix: "%",
      icon: Award,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "Time to Sell",
      value: analysis.timeToSell,
      suffix: " months",
      icon: Home,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      name: "Price vs Market",
      value: analysis.pricePerSqFt,
      suffix: "%",
      icon: MapPin,
      color: "text-orange-600 dark:text-orange-400",
    },
  ];

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      {/* Overall Recommendation */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-dark-backDrop dark:to-gray-900 p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-dark-accent shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-primary-heading dark:text-dark-heading">
              Overall Recommendation
            </h3>
          </div>
          <div
            className="px-6 py-3 rounded-full text-white font-semibold text-center shadow-lg transform hover:scale-105 transition-transform text-sm sm:text-base"
            style={{
              backgroundColor: getRecommendationColor(analysis.recommendation),
            }}
          >
            {analysis.recommendation}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <OverallScoreChart score={analysis.overallScore} />
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h4 className="font-semibold text-primary-heading dark:text-dark-heading">
                Key Insights
              </h4>
            </div>
            <p className="text-primary-subHeading dark:text-dark-subHeading leading-relaxed">
              {analysis.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <DetailedScoresChart analysis={analysis} />

      {/* Financial Metrics */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-dark-backDrop dark:to-gray-900 p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-dark-accent shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-primary-heading dark:text-dark-heading">
            Financial Metrics
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {financialMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div
                key={index}
                className="group p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:scale-110 transition-transform">
                    <IconComponent className={`w-4 h-4 ${metric.color}`} />
                  </div>
                </div>
                <div
                  className={`text-xl sm:text-2xl font-bold mb-2 ${metric.color}`}
                >
                  {metric.value > 0 && metric.name !== "Time to Sell"
                    ? "+"
                    : ""}
                  {metric.value}
                  {metric.suffix}
                </div>
                <div className="text-sm text-primary-subHeading dark:text-dark-subHeading font-medium">
                  {metric.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Highlights */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 sm:p-6 rounded-2xl border border-green-200 dark:border-green-700 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-primary-heading dark:text-dark-heading">
            Key Highlights
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysis.keyPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-4 bg-white dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700 hover:shadow-md transition-shadow"
            >
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
              <span className="text-primary-subHeading dark:text-dark-subHeading">
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-center text-sm bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-center gap-2 text-yellow-800 dark:text-yellow-300">
          <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          <span className="font-medium">
            This analysis is AI-generated for informational purposes only.
            Always consult with qualified real estate professionals before
            making investment decisions.
          </span>
        </div>
      </div>
    </div>
  );
};

export default PurchaseAnalysis;
