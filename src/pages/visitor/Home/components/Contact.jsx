import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
        {/* Left image: desktop only */}
        <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md w-full">
          <img
            src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29udGFjdHxlbnwwfHwwfHx8MA%3D%3D"
            alt="Contact us"
            className="w-full h-auto rounded-2xl shadow-md object-cover"
          />
        </div>

        {/* Right: heading + image (mobile) + subheading + button */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
          {/* Heading: responsive text sizing */}
          <h2 className="order-1 md:order-none text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-heading dark:text-dark-heading mb-4 sm:mb-6 md:mb-4 leading-tight">
            We are here for you
          </h2>

          {/* Image: mobile only with constrained height */}
          <div className="order-2 md:hidden w-full mb-4">
            <img
              src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29udGFjdHxlbnwwfHwwfHx8MA%3D%3D"
              alt="Contact us"
              className="w-full h-64 sm:h-72 md:h-80 rounded-2xl sm:rounded-3xl shadow-md object-cover"
            />
          </div>

          {/* Subheading: responsive text and spacing */}
          <p className="order-3 md:w-[80%] lg:w-[70%] md:order-none w-full text-sm sm:text-base lg:text-lg leading-relaxed text-primary-subHeading dark:text-dark-subHeading mb-4 sm:mb-6">
            If you have any queries or complaints, you can reach out to our team
            and we'll get back to you in 24 hours.
          </p>

          {/* Button: responsive sizing */}
          <Button
            type="primary"
            size="large"
            className="order-4 md:order-none text-white text-sm sm:text-base font-medium px-4 sm:px-6 lg:px-8 rounded-md shadow-lg transition duration-300 ease-in-out w-full sm:w-auto"
            onClick={() => navigate("contact-us")}
          >
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
