"use client";
import React, { useState } from 'react';
import Navbar from './Navbar';
import HeroComponent from './Hero';

const Main = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        toggleMobileMenu={toggleMobileMenu}
        mobileMenuOpen={mobileMenuOpen}
      />
      <HeroComponent />
    </div>
  );
};

export default Main;
