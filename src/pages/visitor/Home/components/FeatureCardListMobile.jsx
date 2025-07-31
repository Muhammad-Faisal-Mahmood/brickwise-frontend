import { Card, Badge, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function FeatureCardListMobile({
  visitorFeatures,
  expandedItems,
  toggleItem,
}) {
  return (
    <div className="w-full md:hidden space-y-4 mb-8">
      {visitorFeatures.map((feature) => (
        <Card
          key={feature.id}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => toggleItem(feature.id)}
        >
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary-brandColor1 flex items-center justify-center text-white mr-4">
              {feature.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{feature.title}</h3>
              <Badge status="Success" count="Live" color="green" />
            </div>
          </div>
          {expandedItems[feature.id] && (
            <div className="mt-4">
              <p className="text-sm mb-3">{feature.description}</p>
              {feature.related.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-xs mb-1">Related Features</h4>
                  <div className="flex flex-wrap gap-2">
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
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
