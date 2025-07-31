import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <section className="">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-20">
        {/* Left image: hidden on small, shown on lg */}
        <div className="hidden md:flex flex-1 max-w-md w-full">
          <img
            src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29udGFjdHxlbnwwfHwwfHx8MA%3D%3D"
            alt="Contact us"
            className="w-full h-auto rounded-2xl shadow-md object-cover"
          />
        </div>

        {/* Right: heading + image (mobile) + subheading + button */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
          {/* Heading */}
          <h2 className="order-1 md:order-none text-3xl font-extrabold text-primary-heading dark:text-dark-heading sm:text-4xl mb-8 md:mb-4">
            We are here for you
          </h2>

          {/* Image for mobile */}
          <div className="order-2 md:hidden w-full">
            <img
              src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29udGFjdHxlbnwwfHwwfHx8MA%3D%3D"
              alt="Contact us"
              className="w-full h-auto rounded-3xl shadow-md object-cover"
            />
          </div>

          {/* Subheading */}
          <p className="order-3 md:w-[70%] md:order-none mt-5 md:mt-0 text-lg leading-6 text-primary-subHeading dark:text-dark-subHeading mb-6">
            If you have any queries or complaints, you can reach out to our team
            and we'll get back to you in 24 hours.
          </p>

          {/* Button */}
          <Button
            type="primary"
            className="order-4 md:order-none text-white text-base sm:text-sm md:text-base font-medium py-3 sm:py-4 px-6 rounded-md shadow-lg transition duration-300 ease-in-out"
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
