import React from "react";
import { TrendingUp, DollarSign } from "lucide-react";

const AnalysisButtons = ({ property, onAnalysisClick }) => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    {property.purpose === "sale" && (
      <button
        onClick={() => onAnalysisClick("purchase")}
        className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
      >
        <TrendingUp className="w-5 h-5" />
        <span>Investment Analysis</span>
      </button>
    )}
    <button
      onClick={() => onAnalysisClick("pricing")}
      className="flex-1 sm:flex-none bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
    >
      <DollarSign className="w-5 h-5" />
      <span>Price Analysis</span>
    </button>
  </div>
);

export default AnalysisButtons;
