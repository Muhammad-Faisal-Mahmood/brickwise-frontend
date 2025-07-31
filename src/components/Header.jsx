import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import Navbar from "./Navbar";

const navItems = [
  { name: "Home", url: "/" },
  { name: "Listings", url: "/listings" },
  { name: "Dealers", url: "/dealers" },
  { name: "Estimator", url: "/cost-estimator" },
];

const Header = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <div className="fixed w-full z-[999] bg-primary-backDrop dark:bg-dark-accent shadow-md h-16">
      <header className="flex items-center justify-between px-6 py-4 h-full max-w-7xl mx-auto">
        <Logo />
        <Navbar
          drawerVisible={drawerVisible}
          navItems={navItems}
          setDrawerVisible={setDrawerVisible}
        />
      </header>
    </div>
  );
};

export default Header;
