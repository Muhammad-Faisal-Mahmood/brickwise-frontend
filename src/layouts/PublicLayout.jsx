// src/layouts/PublicLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const VisitorLayout = () => {
  return (
    <>
      <Header />
      <main className="py-40 px-10 sm:px-16 md:px-24 lg:px-32">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default VisitorLayout;
