import FeatureCircle from "./FeatureCircle";
import { HomeOutlined } from "@ant-design/icons";

export default function OrbitalFeatureView({
  visitorFeatures,
  rotationAngle,
  expandedItems,
  toggleItem,
}) {
  // Function to determine the stroke color based on theme
  // You'll need to replace this with your actual theme detection logic
  const getOrbitStrokeColor = () => {
    // This is a placeholder. In a real app, you'd check a theme context
    // or a media query like window.matchMedia('(prefers-color-scheme: dark)')
    const isDarkMode = false; // Replace with your actual dark mode detection
    return isDarkMode ? "#e0e0e0" : "#4a4a4a"; // Light gray in dark mode, dark gray in light mode
  };

  const calculatePos = (index, total, currentRadius) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const rad = (angle * Math.PI) / 180;
    return {
      x: currentRadius * Math.cos(rad),
      y: currentRadius * Math.sin(rad),
      opacity: 0.8 + 0.6 * ((1 + Math.sin(rad)) / 2),
    };
  };

  return (
    <div className="relative w-full  h-fit md:h-96 mt-0 md:mt-56 mb-0 md:mb-40 flex items-center justify-center">
      {/* SVG for orbits */}
      <svg className="absolute w-full h-full" style={{ overflow: "visible" }}>
        {visitorFeatures.map((feature, idx) => {
          // Increased base distance for the first orbit (e.g., from 100 to 150)
          // Increased gap between orbits (e.g., from 30 to 40)
          // Adjusted range to ensure orbits don't overlap too much or go out of bounds
          const baseOrbitDistance = 150; // Starting radius for the innermost orbit
          const orbitGap = 40; // The spacing between each orbit
          const orbitRadius = baseOrbitDistance + idx * orbitGap;

          return (
            <circle
              key={`orbit-${feature.id}`}
              cx="50%" // Center X relative to SVG container
              cy="50%" // Center Y relative to SVG container
              r={orbitRadius} // Use the unique radius for each orbit
              stroke={getOrbitStrokeColor()} // Dynamic stroke color
              strokeDasharray="2 4" // Dashed line
              fill="none"
              className="opacity-50"
            />
          );
        })}
      </svg>

      {/* Center Home Icon (the Sun) */}
      <div className="absolute w-16 md:w-24 h-16 md:h-24 rounded-full bg-gradient-to-br from-primary-brandColor1 to-purple-900 flex items-center justify-center shadow-lg z-10">
        <HomeOutlined className="text-white text-xl md:text-2xl" />
      </div>

      {/* Feature Circles (the Planets) */}
      {visitorFeatures.map((feature, idx) => {
        // Recalculate the radius for the feature circle to match its orbit
        const baseOrbitDistance = 150;
        const orbitGap = 40;
        const featureOrbitRadius = baseOrbitDistance + idx * orbitGap; // Must match the orbit radius

        const pos = calculatePos(
          idx,
          visitorFeatures.length,
          featureOrbitRadius
        );
        return (
          <FeatureCircle
            key={feature.id}
            feature={feature}
            pos={{
              x: pos.x,
              y: pos.y,
              opacity: pos.opacity,
            }}
            isExpanded={expandedItems[feature.id]}
            toggleItem={toggleItem}
            visitorFeatures={visitorFeatures}
          />
        );
      })}
    </div>
  );
}
