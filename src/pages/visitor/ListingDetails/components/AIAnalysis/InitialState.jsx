import React from "react";
import { Brain } from "lucide-react";
import PropertyOverview from "./PropertyOverview";
import AnalysisButtons from "./AnalysisButtons";

const InitialState = ({ property, onAnalysisClick }) => (
  <div className="space-y-6">
    {/* Hero Section */}
    <div className="text-center py-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Brain className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-primary-heading dark:text-dark-heading mb-3">
        AI Property Intelligence
      </h2>
      <p className="text-primary-subHeading dark:text-dark-subHeading max-w-2xl mx-auto">
        Get data-driven insights with visual analytics powered by advanced AI to
        make informed property decisions
      </p>
    </div>

    <PropertyOverview property={property} />
    <AnalysisButtons property={property} onAnalysisClick={onAnalysisClick} />
  </div>
);

export default InitialState;
