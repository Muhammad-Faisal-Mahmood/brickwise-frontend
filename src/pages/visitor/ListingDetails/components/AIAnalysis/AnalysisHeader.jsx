import React from "react";

const AnalysisHeader = ({ onNewAnalysis }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-primary-heading dark:text-dark-heading">
      AI Analysis Results
    </h2>
    <button
      onClick={onNewAnalysis}
      className="px-4 py-2 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-dark-accent transition-colors"
    >
      New Analysis
    </button>
  </div>
);

export default AnalysisHeader;
