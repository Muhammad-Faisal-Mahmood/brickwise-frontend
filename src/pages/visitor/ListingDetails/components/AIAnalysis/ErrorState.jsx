import React from "react";
import { AlertTriangle } from "lucide-react";

const ErrorState = ({ error, onRetry }) => (
  <div className="bg-red-50 dark:bg-dark-accent border border-red-200 dark:border-red-500 rounded-xl p-6 text-center">
    <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
    <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
      Analysis Failed
    </h3>
    <p className="text-red-600 dark:text-red-300">{error}</p>
    <button
      onClick={onRetry}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
    >
      Try Again
    </button>
  </div>
);

export default ErrorState;
