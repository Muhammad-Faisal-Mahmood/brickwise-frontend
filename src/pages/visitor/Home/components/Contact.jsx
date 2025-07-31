import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <section className="">
      <div className="mx-auto  flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-20">
        {/* Left: heading + subheading + CTA */}

        <div className="hidden md:flex flex-1 max-w-md w-full">
          <img
            src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29udGFjdHxlbnwwfHwwfHx8MA%3D%3D"
            alt="Property Dealer"
            className="w-full h-auto rounded-2xl shadow-md object-cover"
          />
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
          {/* Heading: always on top for small, stays on left for lg */}
          <div className="order-2 md:hidden w-full">
            <img
              src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29udGFjdHxlbnwwfHwwfHx8MA%3D%3D"
              alt="Contact us"
              className="w-full h-auto rounded-3xl shadow-md object-cover"
            />
          </div>

          <h2 className="order-1 lg:order-none text-3xl  font-extrabold text-primary-heading dark:text-dark-heading sm:text-4xl mb-8 md:mb-4">
            We are here for you
          </h2>

          {/* Image: moves below heading on small, stays right on lg */}

          {/* Subheading & CTA */}
          <p className="order-3 lg:order-none mt-5 w-full md:w-[70%] md:mt-0 text-lg leading-6 text-primary-subHeading dark:text-dark-subHeading mb-6">
            If you have any queries or complaints, you can reach out to our team
            and we'll get back to you in 24 hours.
          </p>
          <Button
            type="primary"
            className="order-4 lg:order-none text-white text-base sm:text-lg md:text-xl font-bold py-3 sm:py-4 px-6 rounded-md shadow-lg transition duration-300 ease-in-out"
            onClick={() => navigate("contact-us")}
          >
            Contact us
          </Button>
        </div>

        {/* Right image: hidden on small, shown on lg */}
      </div>
    </section>
  );
};

export default Contact;
