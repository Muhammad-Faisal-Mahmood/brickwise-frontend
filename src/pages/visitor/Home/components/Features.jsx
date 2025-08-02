import { useState, useEffect, useRef } from "react";
import { visitorFeatures } from "../../../../data/VisitorFeaturesData";
import FeaturesHeader from "./FeaturesHeader";
import FeatureCardListMobile from "./FeatureCardListMobile";
import OrbitalFeatureView from "./OrbitalFeatureView";
import CoreVisitorFeatures from "./CoreVisitorFeatures";

export default function Features() {
  const [expandedItems, setExpandedItems] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1025);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let timer;
    if (autoRotate) {
      timer = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.3) % 360);
      }, 50);
    }
    return () => clearInterval(timer);
  }, [autoRotate]);

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      Object.keys(next).forEach((k) => {
        if (parseInt(k) !== id) next[k] = false;
      });
      if (next[id]) {
        setAutoRotate(false);
      } else {
        setAutoRotate(true);
      }
      return next;
    });
  };

  return (
    <div
      ref={containerRef}
      className="w-full  flex flex-col items-center justify-center overflow-x-hidden"
    >
      <FeaturesHeader />

      {isMobile ? (
        <FeatureCardListMobile
          visitorFeatures={visitorFeatures}
          expandedItems={expandedItems}
          toggleItem={toggleItem}
        />
      ) : (
        <OrbitalFeatureView
          visitorFeatures={visitorFeatures}
          rotationAngle={rotationAngle}
          expandedItems={expandedItems}
          toggleItem={toggleItem}
        />
      )}

      <CoreVisitorFeatures />
    </div>
  );
}
