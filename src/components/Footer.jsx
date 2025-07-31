import React from "react";
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
  LinkedinFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full text-white bg-dark-accent px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h1 className="text-xl font-bold">Brickwise Pvt Ltd</h1>
          <p className="text-gray-400 text-sm mt-1">
            Empowering modern property deals
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex gap-6">
          <a href="#" className="text-gray-300 hover:text-white transition">
            About
          </a>
          <Link
            to={"/contact-us"}
            className="text-gray-300 hover:text-white transition"
          >
            Contact
          </Link>
          <a href="#" className="text-gray-300 hover:text-white transition">
            Privacy Policy
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary-brandColor1 transition">
            <FacebookFilled style={{ fontSize: "20px" }} />
          </a>
          <a href="#" className="hover:text-primary-brandColor1 transition">
            <TwitterSquareFilled style={{ fontSize: "20px" }} />
          </a>
          <a href="#" className="hover:text-primary-brandColor1 transition">
            <InstagramFilled style={{ fontSize: "20px" }} />
          </a>
          <a href="#" className="hover:text-primary-brandColor1 transition">
            <LinkedinFilled style={{ fontSize: "20px" }} />
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-gray-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} Brickwise Pvt Ltd. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
