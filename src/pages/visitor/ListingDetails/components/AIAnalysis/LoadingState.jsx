import React from "react";
import { Brain } from "lucide-react";

const LoadingState = () => (
  <div className="text-center py-12">
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
      <Brain className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-xl font-semibold text-primary-heading dark:text-dark-heading mb-2">
      AI Analysis in Progress
    </h3>
    <p className="text-primary-subHeading dark:text-dark-subHeading">
      Analyzing property data and market trends...
    </p>
    <div className="w-64 h-2 bg-gray-200 dark:bg-dark-accent rounded-full mx-auto mt-4 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
    </div>
  </div>
);

export default LoadingState;
