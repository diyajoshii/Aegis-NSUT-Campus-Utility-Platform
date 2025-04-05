"use client"
import React from 'react'
import { useState } from 'react';
import Navbar from '../Navbar'
import SchemesPage from '../schemes/page';

const Main = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [currentSection, setCurrentSection] = useState("SchemesPage");
    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };
  
    return (
      <div className="min-h-screen bg-background">
        <Navbar
          toggleMobileMenu={toggleMobileMenu}
          mobileMenuOpen={mobileMenuOpen}
        />
   
      </div>
    );
  };
  
  export default Main;