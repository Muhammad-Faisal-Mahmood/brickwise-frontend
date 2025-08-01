// src/layouts/PublicLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const VisitorLayout = () => {
  return (
    <>
      <Header />
      <main className="py-40 px-6 sm:px-12 md:px-20 lg:px-24 xl:px-32">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default VisitorLayout;
