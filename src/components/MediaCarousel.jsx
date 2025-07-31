import React from "react";
import { Carousel, Image } from "antd";
import { FullscreenOutlined } from "@ant-design/icons";

const MediaCarousel = ({ media }) => {
  const getType = (url) => {
    const ext = url.split(".").pop().toLowerCase();
    if (["mp4", "webm", "ogg"].includes(ext)) {
      return "video";
    }
    return "image";
  };

  // convert media to array of { type, url }
  const processedMedia = media.map((url) => ({
    type: getType(url),
    url,
  }));

  return (
    <div className="relative">
      <Carousel arrows autoplay={{ dotDuration: true }} arrowSize={48}>
        {processedMedia.map((item, idx) =>
          item.type === "image" ? (
            <div key={idx} className="w-full h-full">
              <Image
                width={"100%"}
                src={item.url}
                alt={`media-${idx}`}
                className="w-full h-full object-cover rounded-xl"
                preview={{ mask: <FullscreenOutlined /> }}
              />
            </div>
          ) : (
            <div
              key={idx}
              className="flex mt-40 lg:mt-56 items-center justify-center"
            >
              <video controls className="w-full object-cover rounded-xl">
                <source src={item.url} type="video/mp4" />
                Your browser does not support video.
              </video>
            </div>
          )
        )}
      </Carousel>
    </div>
  );
};

export default MediaCarousel;
