import React from "react";
import { Hero } from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import BecomeDealer from "./components/BecomeDealer";
import Contact from "./components/Contact";

const Home = () => {
  return (
    <div className="flex flex-col gap-20 md:gap-32 ">
      <Hero />
      <Features />
      <Testimonials />
      <BecomeDealer />
      <Contact />
    </div>
  );
};

export default Home;
