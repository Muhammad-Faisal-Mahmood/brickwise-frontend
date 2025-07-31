import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const BecomeDealer = () => {
  const navigate = useNavigate();

  return (
    <section className="">
      <div className="mx-auto  flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: heading + subheading + CTA */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
          {/* Heading: always on top for small, stays on left for lg */}
          <h2 className="order-1 md:order-none text-3xl font-extrabold text-primary-heading dark:text-dark-heading sm:text-4xl mb-8 md:mb-4">
            Are you a Property Dealer?
          </h2>

          {/* Image: moves below heading on small, stays right on lg */}
          <div className="order-2 md:hidden w-full">
            <img
              src="https://plus.unsplash.com/premium_photo-1678208881503-d081cbedc095?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvcGVydHklMjBkZWFsZXJ8ZW58MHx8MHx8fDA%3D"
              alt="Property Dealer"
              className="w-full h-auto rounded-3xl shadow-md object-cover"
            />
          </div>

          {/* Subheading & CTA */}
          <p className="order-3 md:order-none mt-5 md:mt-0 text-lg leading-6 text-primary-subHeading dark:text-dark-subHeading mb-6">
            Join our platform to effortlessly manage your property listings,
            connect with potential buyers, and expand your reach.
          </p>
          <Button
            type="primary"
            className="order-4 md:order-none text-white text-base sm:text-lg md:text-xl font-bold py-3 sm:py-4 px-6 rounded-md shadow-lg transition duration-300 ease-in-out"
            onClick={() => navigate("register-dealer")}
          >
            Register Yourself as a Dealer
          </Button>
        </div>

        {/* Right image: hidden on small, shown on lg */}
        <div className="hidden md:flex flex-1 max-w-md w-full">
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
