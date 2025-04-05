"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const AboutUs: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28">
      <Card className="bg-background border-none shadow-none">
        <CardContent className="flex flex-col-reverse md:flex-row items-center justify-between py-10">
          {/* Text Section */}
          <div className="md:w-1/2 text-center md:text-left mt-6 md:mt-0 md:pr-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              About Our Platform
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
              faucibus ex sapien vitae pellentesque sem placerat. In id cursus
              mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
              urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
              egestas. Iaculis massa nisl malesuada lacinia integer nunc
              posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad
              litora torquent per conubia nostra inceptos himenaeos.
            </p>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center ">
            <img
              src="AegisNsut.png"
              alt="About Us"
              className="w-64 h-auto rounded-xl shadow-lg object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUs;
