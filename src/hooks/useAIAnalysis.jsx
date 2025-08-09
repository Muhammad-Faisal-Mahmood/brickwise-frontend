import { useState } from "react";

export const useAIAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [analysisType, setAnalysisType] = useState(null);

  const generatePrompt = (property, type) => {
    const propertyDetails = `
Property Details:
- Title: ${property.title}
- Location: ${property.location}, ${property.address}
- Price: PKR ${property.price?.toLocaleString()}
- Type: ${property.type}
- Purpose: ${property.purpose}
- Bedrooms: ${property.bedrooms}
- Bathrooms: ${property.bathrooms}
- Floors: ${property.floors}
- Size: ${property.size} sq ft
- New Construction: ${property.newConstruction ? "Yes" : "No"}
- Pet Friendly: ${property.petFriendly ? "Yes" : "No"}
- Swimming Pool: ${property.swimmingPool ? "Yes" : "No"}
- Status: ${property.status}
- Views: ${property.views || 0}
- Dealer: ${property.dealerName}
    `;

    if (type === "purchase") {
      return `${propertyDetails}

Provide a property investment analysis for Pakistan's real estate market. Format your response EXACTLY as follows:

SCORES:
Overall Score: [0-100]
Market Value Score: [0-100]
Investment Potential: [0-100]
Location Quality: [0-100]
Property Features: [0-100]
Risk Level: [0-100]

METRICS:
Price per sq ft vs market: [+/-percentage]
Expected annual appreciation: [percentage]
Rental yield potential: [percentage]
Time to sell estimate: [months]

RECOMMENDATION: [BUY/HOLD/AVOID]

SUMMARY: [2-3 sentence summary]

KEY_POINTS:
- [Point 1]
- [Point 2]
- [Point 3]
- [Point 4]

Analyze market conditions, location prospects, pricing, and investment potential for Pakistan's real estate market.`;
    } else {
      return `${propertyDetails}

Analyze the pricing for this property in Pakistan's real estate market. Format your response EXACTLY as follows:

SCORES:
Price Fairness Score: [0-100]
Market Rate Comparison: [+/-percentage]
Value for Money: [0-100]
Negotiation Potential: [0-100]
Location Premium Justified: [0-100]

RECOMMENDATION: [FAIR_PRICE/OVERPRICED/UNDERPRICED]

SUMMARY: [2-3 sentence summary]

KEY_POINTS:
- [Point 1]
- [Point 2]
- [Point 3]
- [Point 4]

Consider current market rates, location premiums, and property features in Pakistan.`;
    }
  };

  const callGeminiAPI = async (prompt) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Gemini API key not found in environment variables");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text;
  };

  const parseAIResponse = (text, type) => {
    try {
      const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line);

      if (type === "purchase") {
        const scores = {};
        const metrics = {};
        let recommendation = "HOLD";
        let summary = "";
        const keyPoints = [];
        let currentSection = "";

        for (const line of lines) {
          if (line.startsWith("SCORES:")) {
            currentSection = "scores";
            continue;
          }
          if (line.startsWith("METRICS:")) {
            currentSection = "metrics";
            continue;
          }
          if (line.startsWith("RECOMMENDATION:")) {
            // Capture immediately, works if on same line
            recommendation = line.replace("RECOMMENDATION:", "").trim();
            currentSection = ""; // no need to keep parsing this section
            continue;
          }
          if (line.startsWith("SUMMARY:")) {
            // Capture same-line summary text
            summary += line.replace("SUMMARY:", "").trim() + " ";
            currentSection = "summary";
            continue;
          }
          if (line.startsWith("KEY_POINTS:")) {
            currentSection = "keypoints";
            continue;
          }

          if (currentSection === "scores") {
            const match = line.match(/^(.*?):\s*(\d+)/);
            if (match) {
              const key = match[1].toLowerCase().replace(/\s+/g, "");
              scores[key] = parseInt(match[2]);
            }
          } else if (currentSection === "metrics") {
            if (line.includes("Price per sq ft")) {
              const match = line.match(/([+-]?\d+(?:\.\d+)?)/);
              metrics.pricePerSqFt = match ? parseFloat(match[1]) : 0;
            } else if (line.includes("appreciation")) {
              const match = line.match(/(\d+(?:\.\d+)?)/);
              metrics.expectedAppreciation = match ? parseFloat(match[1]) : 0;
            } else if (line.includes("Rental yield")) {
              const match = line.match(/(\d+(?:\.\d+)?)/);
              metrics.rentalYield = match ? parseFloat(match[1]) : 0;
            } else if (line.includes("Time to sell")) {
              const match = line.match(/(\d+)/);
              metrics.timeToSell = match ? parseInt(match[1]) : 0;
            }
          } else if (currentSection === "summary") {
            // Append additional lines if summary is multi-line
            summary += line + " ";
          } else if (currentSection === "keypoints" && line.startsWith("-")) {
            keyPoints.push(line.substring(1).trim());
          }
        }

        return {
          overallScore: scores.overallscore || 75,
          marketValue: scores.marketvaluescore || 75,
          investmentPotential: scores.investmentpotential || 75,
          locationQuality: scores.locationquality || 75,
          propertyFeatures: scores.propertyfeatures || 75,
          riskLevel: scores.risklevel || 50,
          pricePerSqFt: metrics.pricePerSqFt || 0,
          expectedAppreciation: metrics.expectedAppreciation || 5,
          rentalYield: metrics.rentalYield || 4,
          timeToSell: metrics.timeToSell || 6,
          recommendation,
          summary: summary.trim(),
          keyPoints,
        };
      }

      // -------- Pricing Analysis --------
      else {
        const scores = {};
        let recommendation = "FAIR_PRICE";
        let summary = "";
        const keyPoints = [];
        let currentSection = "";

        for (const line of lines) {
          if (line.startsWith("SCORES:")) {
            currentSection = "scores";
            continue;
          }
          if (line.startsWith("RECOMMENDATION:")) {
            recommendation = line.replace("RECOMMENDATION:", "").trim();
            currentSection = "";
            continue;
          }
          if (line.startsWith("SUMMARY:")) {
            summary += line.replace("SUMMARY:", "").trim() + " ";
            currentSection = "summary";
            continue;
          }
          if (line.startsWith("KEY_POINTS:")) {
            currentSection = "keypoints";
            continue;
          }

          if (currentSection === "scores") {
            const match = line.match(/^(.*?):\s*([+-]?\d+)/);
            if (match) {
              const key = match[1].toLowerCase().replace(/\s+/g, "");
              scores[key] = Math.abs(parseInt(match[2]));
            }
          } else if (currentSection === "summary") {
            summary += line + " ";
          } else if (currentSection === "keypoints" && line.startsWith("-")) {
            keyPoints.push(line.substring(1).trim());
          }
        }

        return {
          priceFairness: scores.pricefairnessscore || 75,
          marketComparison: scores.marketratecomparison || 0,
          valueForMoney: scores.valueformoney || 75,
          negotiationPotential: scores.negotiationpotential || 50,
          locationPremium: scores.locationpremiumjustified || 75,
          recommendation,
          summary: summary.trim(),
          keyPoints,
        };
      }
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return type === "purchase"
        ? {
            overallScore: 75,
            marketValue: 75,
            investmentPotential: 75,
            locationQuality: 75,
            propertyFeatures: 75,
            riskLevel: 50,
            pricePerSqFt: 0,
            expectedAppreciation: 5,
            rentalYield: 4,
            timeToSell: 6,
            recommendation: "HOLD",
            summary: "Analysis parsing failed. Please try again.",
            keyPoints: ["Unable to parse detailed analysis"],
          }
        : {
            priceFairness: 75,
            marketComparison: 0,
            valueForMoney: 75,
            negotiationPotential: 50,
            locationPremium: 75,
            recommendation: "FAIR_PRICE",
            summary: "Analysis parsing failed. Please try again.",
            keyPoints: ["Unable to parse detailed analysis"],
          };
    }
  };

  const handleAnalysis = async (property, type) => {
    setLoading(true);
    setError(null);
    setAnalysisType(type);

    try {
      const prompt = generatePrompt(property, type);
      const aiResponse = await callGeminiAPI(prompt);
      const parsedResult = parseAIResponse(aiResponse, type);
      setAnalysis(parsedResult);
    } catch (err) {
      setError(err.message || "Failed to generate AI analysis");
      console.error("AI Analysis Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setAnalysisType(null);
    setError(null);
  };

  return {
    loading,
    analysis,
    error,
    analysisType,
    handleAnalysis,
    resetAnalysis,
  };
};
