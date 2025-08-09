import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  MapPin,
  Home,
  Star,
  Brain,
  Target,
} from "lucide-react";

const AIPropertyAnalysis = ({ property }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [analysisType, setAnalysisType] = useState(null);

  const generatePrompt = (type) => {
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
          } else if (line.startsWith("METRICS:")) {
            currentSection = "metrics";
            continue;
          } else if (line.startsWith("RECOMMENDATION:")) {
            currentSection = "recommendation";
            continue;
          } else if (line.startsWith("SUMMARY:")) {
            currentSection = "summary";
            continue;
          } else if (line.startsWith("KEY_POINTS:")) {
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
          } else if (currentSection === "recommendation") {
            recommendation = line.replace("RECOMMENDATION:", "").trim();
          } else if (currentSection === "summary") {
            summary += line.replace("SUMMARY:", "").trim() + " ";
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
      } else {
        // Similar parsing for pricing analysis
        const scores = {};
        let recommendation = "FAIR_PRICE";
        let summary = "";
        const keyPoints = [];
        let currentSection = "";

        for (const line of lines) {
          if (line.startsWith("SCORES:")) {
            currentSection = "scores";
            continue;
          } else if (line.startsWith("RECOMMENDATION:")) {
            currentSection = "recommendation";
            continue;
          } else if (line.startsWith("SUMMARY:")) {
            currentSection = "summary";
            continue;
          } else if (line.startsWith("KEY_POINTS:")) {
            currentSection = "keypoints";
            continue;
          }

          if (currentSection === "scores") {
            const match = line.match(/^(.*?):\s*([+-]?\d+)/);
            if (match) {
              const key = match[1].toLowerCase().replace(/\s+/g, "");
              scores[key] = Math.abs(parseInt(match[2]));
            }
          } else if (currentSection === "recommendation") {
            recommendation = line.replace("RECOMMENDATION:", "").trim();
          } else if (currentSection === "summary") {
            summary += line.replace("SUMMARY:", "").trim() + " ";
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
      // Return fallback data if parsing fails
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

  const handleAnalysis = async (type) => {
    setLoading(true);
    setError(null);
    setAnalysisType(type);

    try {
      const prompt = generatePrompt(type);
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

  const getScoreColor = (score) => {
    if (score >= 80) return "#10b981"; // Green
    if (score >= 60) return "#f59e0b"; // Yellow
    return "#ef4444"; // Red
  };

  const getRecommendationColor = (recommendation) => {
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

  const renderPurchaseAnalysis = () => {
    if (!analysis || analysisType !== "purchase") return null;

    const scoreData = [
      { name: "Market Value", score: analysis.marketValue, color: "#3b82f6" },
      {
        name: "Investment Potential",
        score: analysis.investmentPotential,
        color: "#10b981",
      },
      {
        name: "Location Quality",
        score: analysis.locationQuality,
        color: "#8b5cf6",
      },
      {
        name: "Property Features",
        score: analysis.propertyFeatures,
        color: "#f59e0b",
      },
      { name: "Risk Level", score: 100 - analysis.riskLevel, color: "#ef4444" },
    ];

    const financialMetrics = [
      {
        name: "Expected Appreciation",
        value: analysis.expectedAppreciation,
        suffix: "%/year",
      },
      { name: "Rental Yield", value: analysis.rentalYield, suffix: "%" },
      { name: "Time to Sell", value: analysis.timeToSell, suffix: " months" },
      { name: "Price vs Market", value: analysis.pricePerSqFt, suffix: "%" },
    ];

    const overallScoreData = [
      {
        name: "Score",
        value: analysis.overallScore,
        fill: getScoreColor(analysis.overallScore),
      },
      {
        name: "Remaining",
        value: 100 - analysis.overallScore,
        fill: "#e5e7eb",
      },
    ];

    return (
      <div className="space-y-6">
        {/* Overall Recommendation Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Overall Recommendation
            </h3>
            <div
              className={`px-4 py-2 rounded-full text-white font-semibold`}
              style={{
                backgroundColor: getRecommendationColor(
                  analysis.recommendation
                ),
              }}
            >
              {analysis.recommendation === "BUY"
                ? "✓ RECOMMENDED"
                : analysis.recommendation}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Overall Score</h4>
              <ResponsiveContainer width="100%" height={120}>
                <PieChart>
                  <Pie
                    data={overallScoreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={50}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    {overallScoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div
                className="text-center text-2xl font-bold"
                style={{ color: getScoreColor(analysis.overallScore) }}
              >
                {analysis.overallScore}/100
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Key Insights</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {analysis.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Scores */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Detailed Analysis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={scoreData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip
                formatter={(value) => [`${value}/100`, "Score"]}
                labelStyle={{ color: "#374151" }}
              />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {scoreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Financial Projections */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Financial Metrics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {financialMetrics.map((metric, index) => (
              <div
                key={index}
                className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg"
              >
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {metric.value > 0 && metric.name !== "Time to Sell"
                    ? "+"
                    : ""}
                  {metric.value}
                  {metric.suffix}
                </div>
                <div className="text-sm text-gray-600">{metric.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Points */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Key Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {analysis.keyPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderPricingAnalysis = () => {
    if (!analysis || analysisType !== "pricing") return null;

    const pricingData = [
      {
        name: "Price Fairness",
        score: analysis.priceFairness,
        color: "#3b82f6",
      },
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

    const marketComparisonData = [
      {
        name: "This Property",
        price: 100 + analysis.marketComparison,
        fill: "#3b82f6",
      },
      { name: "Market Average", price: 100, fill: "#e5e7eb" },
    ];

    return (
      <div className="space-y-6">
        {/* Price Assessment Header */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Price Assessment
            </h3>
            <div
              className={`px-4 py-2 rounded-full text-white font-semibold`}
              style={{
                backgroundColor: getRecommendationColor(
                  analysis.recommendation
                ),
              }}
            >
              {analysis.recommendation === "FAIR_PRICE"
                ? "FAIR PRICE"
                : analysis.recommendation}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {analysis.marketComparison > 0 ? "+" : ""}
                {analysis.marketComparison}%
              </div>
              <div className="text-sm text-gray-600">vs Market Average</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {analysis.priceFairness}/100
              </div>
              <div className="text-sm text-gray-600">Fairness Score</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                PKR {(property.price / property.size).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Per Sq Ft</div>
            </div>
          </div>
        </div>

        {/* Market Comparison Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Market Price Comparison
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={marketComparisonData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis domain={[90, 110]} />
              <Tooltip formatter={(value) => [`${value}%`, "Relative Price"]} />
              <Bar dataKey="price" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Scores Radar */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Price Analysis Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="20%"
              outerRadius="80%"
              data={pricingData}
            >
              <RadialBar
                dataKey="score"
                cornerRadius={10}
                fill={(entry) => entry.color}
              />
              <Tooltip formatter={(value) => [`${value}/100`, "Score"]} />
            </RadialBarChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {pricingData.map((item, index) => (
              <div
                key={index}
                className="text-center p-3 bg-gray-50 rounded-lg"
              >
                <div
                  className="w-4 h-4 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="font-semibold text-gray-800">
                  {item.score}/100
                </div>
                <div className="text-xs text-gray-600">{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">AI Summary</h3>
          <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {analysis.keyPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
              >
                <Star className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderInitialState = () => (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center py-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          AI Property Intelligence
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get data-driven insights with visual analytics powered by advanced AI
          to make informed property decisions
        </p>
      </div>

      {/* Property Quick Stats */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Property Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="font-bold text-gray-800">
              PKR {(property.price / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-600">Price</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Home className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="font-bold text-gray-800">{property.size} sq ft</div>
            <div className="text-sm text-gray-600">Area</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <MapPin className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="font-bold text-gray-800">{property.location}</div>
            <div className="text-sm text-gray-600">Location</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Target className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <div className="font-bold text-gray-800">
              {property.bedrooms}BR/{property.bathrooms}BA
            </div>
            <div className="text-sm text-gray-600">Layout</div>
          </div>
        </div>
      </div>

      {/* Analysis Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {property.purpose === "sale" && (
          <button
            onClick={() => handleAnalysis("purchase")}
            className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
          >
            <TrendingUp className="w-5 h-5" />
            <span>Investment Analysis</span>
          </button>
        )}
        <button
          onClick={() => handleAnalysis("pricing")}
          className="flex-1 sm:flex-none bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
        >
          <DollarSign className="w-5 h-5" />
          <span>Price Analysis</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="mt-8">
      <div className="max-w-6xl mx-auto">
        {loading && (
          <div className="text-center py-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              AI Analysis in Progress
            </h3>
            <p className="text-gray-600">
              Analyzing property data and market trends...
            </p>
            <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto mt-4 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Analysis Failed
            </h3>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!analysis && !loading && !error && renderInitialState()}

        {analysis && !loading && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                AI Analysis Results
              </h2>
              <button
                onClick={() => {
                  setAnalysis(null);
                  setAnalysisType(null);
                  setError(null);
                }}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                New Analysis
              </button>
            </div>

            {analysisType === "purchase"
              ? renderPurchaseAnalysis()
              : renderPricingAnalysis()}

            <div className="mt-6 text-center text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <AlertTriangle className="w-4 h-4 inline mr-2 text-yellow-600" />
              This analysis is AI-generated for informational purposes only.
              Always consult with qualified real estate professionals before
              making investment decisions.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPropertyAnalysis;
