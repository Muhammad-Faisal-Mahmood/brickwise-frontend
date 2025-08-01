import React from "react";
import { Carousel, Image } from "antd";
import { FullscreenOutlined } from "@ant-design/icons";

const MediaCarousel = ({
  media,
  arrows = true,
  dots = true,
  preview = true,
}) => {
  const getType = (url) => {
    const ext = url.split(".").pop().toLowerCase();
    return ["mp4", "webm", "ogg"].includes(ext) ? "video" : "image";
  };

  const processedMedia = media.map((url) => ({
    type: getType(url),
    url,
  }));

  return (
    <div className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] rounded-xl overflow-hidden">
      <style jsx>{`
        .ant-carousel .slick-slide {
          height: 250px !important;
        }
        .ant-carousel .slick-slide > div {
          height: 100% !important;
        }
        .ant-carousel .slick-list {
          height: 100% !important;
        }
        .ant-carousel .slick-track {
          height: 100% !important;
        }
        .ant-image {
          height: 100% !important;
          width: 100% !important;
        }
        .ant-image-img {
          height: 100% !important;
          width: 100% !important;
          object-fit: cover !important;
        }

        @media (min-width: 640px) {
          .ant-carousel .slick-slide {
            height: 350px !important;
          }
        }

        @media (min-width: 768px) {
          .ant-carousel .slick-slide {
            height: 450px !important;
          }
        }

        @media (min-width: 1024px) {
          .ant-carousel .slick-slide {
            height: 550px !important;
          }
        }
      `}</style>

      <Carousel arrows={arrows} dots={dots} autoplay className="h-full">
        {processedMedia.map((item, idx) => (
          <div key={idx} className="!h-full">
            <div className="h-full w-full flex items-center justify-center">
              {item.type === "image" ? (
                <Image
                  src={item.url}
                  alt={`media-${idx}`}
                  preview={preview ? { mask: <FullscreenOutlined /> } : false}
                  className="w-full h-full object-cover rounded-xl"
                  style={{ height: "100%", width: "100%" }}
                />
              ) : (
                <video
                  controls
                  className="w-full h-full object-cover rounded-xl"
                >
                  <source src={item.url} type="video/mp4" />
                  Your browser does not support video.
                </video>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MediaCarousel;
