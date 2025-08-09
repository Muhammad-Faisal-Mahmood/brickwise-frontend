import React from "react";
import { useAIAnalysis } from "../../../../hooks/useAIAnalysis";
import LoadingState from "./AIAnalysis/LoadingState";
import ErrorState from "./AIAnalysis/ErrorState";
import InitialState from "./AIAnalysis/InitialState";
import AnalysisHeader from "./AIAnalysis/AnalysisHeader";
import PurchaseAnalysis from "./AIAnalysis/PurchaseAnalysis";
import PricingAnalysis from "./AIAnalysis/PricingAnalysis";

const AIPropertyAnalysis = ({ property }) => {
  const {
    loading,
    analysis,
    error,
    analysisType,
    handleAnalysis,
    resetAnalysis,
  } = useAIAnalysis();

  const onAnalysisClick = (type) => {
    handleAnalysis(property, type);
  };

  const onRetry = () => {
    resetAnalysis();
  };

  console.log("main file", analysis);
  return (
    <div className="">
      <div className="">
        {loading && <LoadingState />}

        {error && <ErrorState error={error} onRetry={onRetry} />}

        {!analysis && !loading && !error && (
          <InitialState property={property} onAnalysisClick={onAnalysisClick} />
        )}

        {analysis && !loading && (
          <div>
            <AnalysisHeader onNewAnalysis={resetAnalysis} />
            {analysisType === "purchase" ? (
              <PurchaseAnalysis analysis={analysis} />
            ) : (
              <PricingAnalysis analysis={analysis} property={property} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPropertyAnalysis;
