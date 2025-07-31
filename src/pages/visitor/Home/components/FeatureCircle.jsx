import { motion } from "framer-motion";
import { Card, Badge, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function FeatureCircle({
  feature,
  pos,
  isExpanded,
  toggleItem,
  visitorFeatures,
}) {
  return (
    <motion.div
      className={`absolute cursor-pointer ${
        isExpanded ? "z-[2000]" : "z-[500]"
      }`}
      animate={{
        x: pos.x,
        y: pos.y,
        opacity: 1,
      }}
      onClick={(e) => {
        e.stopPropagation();
        toggleItem(feature.id);
      }}
      whileHover={{ filter: "brightness(1.2)" }}
    >
      <div
        className={`relative w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center text-white bg-primary-brandColor1 border-2 ${
          isExpanded
            ? "border-white shadow-lg z-[2001]"
            : "border-white/40 z-[501]"
        }`}
      >
        {feature.icon}
      </div>
      {!isExpanded && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap z-[502]">
          {feature.title}
        </div>
      )}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-[calc(100%+20px)] left-1/2 transform -translate-x-1/2 w-64 z-[2002]"
        >
          <Card
            title={
              <div className="flex justify-between items-center">
                <span className="text-base">{feature.title}</span>
                <Badge color="green" count="Live" />
              </div>
            }
          >
            <p className="mb-4">{feature.description}</p>
            {feature.related.length > 0 && (
              <div className="mt-2">
                <h4 className="text-xs mb-1">Works Well With</h4>
                <div className="flex flex-wrap gap-1">
                  {feature.related.map((rid) => {
                    const rel = visitorFeatures.find((f) => f.id === rid);
                    return (
                      <Button
                        key={rid}
                        size="small"
                        className="text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItem(rid);
                        }}
                      >
                        {rel?.title} <ArrowRightOutlined />
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
