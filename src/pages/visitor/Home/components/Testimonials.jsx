import React from "react";
import { Card, Avatar, Carousel } from "antd";
import { StarFilled, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { testimonialsData } from "../../../../data/TestimonialsData";

const renderStars = (rating) =>
  Array(5)
    .fill()
    .map((_, i) => (
      <StarFilled
        key={i}
        className={`${
          i < rating ? "text-yellow-400" : "text-gray-300"
        } text-lg`}
      />
    ));

const TestimonialCard = ({ testimonial }) => (
  <Card
    hoverable
    className="w-fit mb-5 mx-3 sm:mx-5 md:mx-10  rounded-xl shadow-md border-none"
    // style={{ padding: "1.25rem" }}
  >
    <div className="flex items-center mb-4">
      <Avatar src={testimonial.avatar} size={64} className="mr-4" />
      <div>
        <h3 className="text-lg font-semibold text-primary-heading dark:text-dark-heading">
          {testimonial.name}
        </h3>
        <p className="text-sm text-primary-subHeading dark:text-dark-subHeading">
          {testimonial.role}
        </p>
        <div className="flex mt-2">{renderStars(testimonial.rating)}</div>
      </div>
    </div>
    <p className="text-primary-subHeading dark:text-dark-subHeading text-base mb-4">
      "{testimonial.comment}"
    </p>
    <p className="text-gray-500 text-sm">{testimonial.date}</p>
  </Card>
);

const Testimonials = () => {
  const carouselRef = React.useRef();

  return (
    <div className=" text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-heading dark:text-dark-heading mb-2">
        What Our Clients Say
      </h1>
      <p className="text-base md:text-lg text-primary-subHeading dark:text-dark-subHeading max-w-2xl mx-auto mb-8 md:mb-12">
        Hear from people who found their perfect property through our platform
      </p>

      <div className="relative mx-auto">
        {/* Carousel with responsive slides */}
        <Carousel
          dots={false}
          ref={carouselRef}
          slidesToShow={3}
          slidesToScroll={1}
          autoplay
          autoplaySpeed={2000}
          arrows={false}
          responsive={[
            { breakpoint: 1000, settings: { slidesToShow: 2 } },
            { breakpoint: 786, settings: { slidesToShow: 1 } },
          ]}
        >
          {testimonialsData.map((t, i) => (
            <div key={i} className="">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </Carousel>

        {/* Custom arrows */}
        <div className="hidden md:flex justify-center mt-6 space-x-6">
          <button
            onClick={() => carouselRef.current?.prev()}
            className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <LeftOutlined />
          </button>
          <button
            onClick={() => carouselRef.current?.next()}
            className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <RightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
