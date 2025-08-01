import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const BecomeDealer = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
        {/* Left: heading + subheading + CTA */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
          {/* Heading: responsive text sizing */}
          <h2 className="order-1 md:order-none text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-heading dark:text-dark-heading mb-4 sm:mb-6 md:mb-4 leading-tight">
            Are you a Property Dealer?
          </h2>

          {/* Image: mobile only with constrained height */}
          <div className="order-2 md:hidden w-full mb-4">
            <img
              src="https://plus.unsplash.com/premium_photo-1678208881503-d081cbedc095?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvcGVydHklMjBkZWFsZXJ8ZW58MHx8MHx8fDA%3D"
              alt="Property Dealer"
              className="w-full h-64 sm:h-72 md:h-8 rounded-2xl sm:rounded-3xl shadow-md object-cover"
            />
          </div>

          {/* Subheading: responsive text and spacing */}
          <p className="order-3 md:order-none md:w-[80%] lg:w-[70%] w-full text-sm sm:text-base lg:text-lg leading-relaxed text-primary-subHeading dark:text-dark-subHeading mb-4 sm:mb-6">
            Join our platform to effortlessly manage your property listings,
            connect with potential buyers, and expand your reach.
          </p>

          {/* Button: responsive sizing */}
          <Button
            type="primary"
            size="large"
            className="order-4 md:order-none text-white text-sm sm:text-base font-medium px-4 sm:px-6 lg:px-8 rounded-md shadow-lg transition duration-300 ease-in-out w-full sm:w-auto"
            onClick={() => navigate("register-dealer")}
          >
            Register Yourself as a Dealer
          </Button>
        </div>

        {/* Right image: desktop only */}
        <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md w-full">
          <img
            src="https://plus.unsplash.com/premium_photo-1678208881503-d081cbedc095?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvcGVydHklMjBkZWFsZXJ8ZW58MHx8MHx8fDA%3D"
            alt="Property Dealer"
            className="w-full h-auto rounded-2xl shadow-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default BecomeDealer;
