import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { PhoneOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [bgPos, setBgPos] = useState("0% 50%");
  const navigate = useNavigate();
  const titles = useMemo(
    () => [
      "exclusive",
      "luxury",
      "affordable",
      "beautiful",
      "reliable",
      "comfortable",
    ],
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleIndex((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearTimeout(timer);
  }, [titleIndex, titles]);

  useEffect(() => {
    if (titleIndex !== 0) {
      setBgPos("100% 50%");
    }
  }, [titleIndex]);

  const currentBgPosValue = useMotionValue(0); // This will track the % value (0 to 100)
  // Use useTransform to convert the numerical value to the CSS string "X% 50%"
  const currentBgPosCSS = useTransform(
    currentBgPosValue,
    (latest) => `${latest}% 50%`
  );

  return (
    <section className="w-full">
      <div className="container flex flex-col gap-6 items-center justify-center">
        {/* Small badge or tagline */}
        <Button
          onClick={() => navigate("/listings")}
          variant="secondary"
          size="sm"
          className="gap-2"
        >
          Discover your next home <RightOutlined className="w-4 h-4" />
        </Button>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl tracking-tighter text-primary-heading dark:text-dark-heading text-center font-regular">
          Find your property today
          <span className="relative flex w-full overflow-y-hidden justify-center md:pb-4 pt-5 md:pt-1">
            &nbsp;
            {titles.map((word, idx) => (
              <motion.span
                key={idx}
                onAnimationComplete={() => setBgPos("100% 50%")}
                className={`absolute font-semibold 
                  
        bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-green-500 to-yellow-500
        bg-[length:300%_300%] bg-clip-text text-transparent whitespace-nowrap`}
                initial={{ opacity: 0, y: -100, backgroundPosition: bgPos }}
                animate={
                  titleIndex === idx
                    ? {
                        y: 0,
                        opacity: 1,
                        backgroundPosition: ["0% 50%", "100% 50%"],
                      }
                    : { y: titleIndex > idx ? -150 : 150, opacity: 0 }
                }
                transition={{
                  type: "spring",
                  stiffness: 60,
                  backgroundPosition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "circInOut",
                  },
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg w-[100%] lg:w-[70%] text-primary-subHeading dark:text-dark-subHeading md:text-xl leading-relaxed tracking-tight   text-center">
          Browse thousands of verified listings, explore detailed property info,
          and connect directly with trusted dealers. Your dream home is just a
          click away.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => navigate("/listings")}
            size="lg"
            className="gap-2"
          >
            View Listings <RightOutlined className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => navigate("/dealers")}
            size="lg"
            variant="outline"
            className="gap-2"
          >
            Contact Dealers <PhoneOutlined className="w-4 h-4 text-green-500" />
          </Button>
        </div>
      </div>
    </section>
  );
}
