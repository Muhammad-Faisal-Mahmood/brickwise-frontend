export const getScoreColor = (score) => {
  if (score >= 80) return "#10b981"; // Green
  if (score >= 60) return "#f59e0b"; // Yellow
  return "#ef4444"; // Red
};

export const getRecommendationColor = (recommendation) => {
  switch (recommendation) {
    case "BUY":
      return "#10b981";
    case "FAIR_PRICE":
      return "#f59e0b";
    case "OVERPRICED":
      return "#ef4444";
    default:
      return "#6b7280";
  }
};
