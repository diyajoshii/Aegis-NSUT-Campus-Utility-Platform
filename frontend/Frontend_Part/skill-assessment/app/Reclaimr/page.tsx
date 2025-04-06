// app\Reclaimr\page.tsx
"use client";
import React, { useState } from 'react';
import Navbar from '../Navbar';
import Link from 'next/link';
import { Button } from "@/components/ui/button"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportPage from '../report/page'; 
import BrowsePage from '../browse/page'; 

const Reclaimr = () => {
    const [currentSection, setCurrentSection] = useState("report");
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

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Tabs defaultValue="report" className="space-y-4" onValueChange={setCurrentSection}>
                    <TabsList className="bg-card flex justify-between items-center">
                        <div className="flex space-x-4">
                            <TabsTrigger value="report">Report Item</TabsTrigger>
                            <TabsTrigger value="browse">Browse Items</TabsTrigger>
                        </div>
                        {/* Back to Home Button */}
                        <Link href="/" passHref>
                            <Button className="ml-4">Back to Home</Button>
                        </Link>
                    </TabsList>

                    <TabsContent value="report">
                        {/* Render the ReportPage component here */}
                        <ReportPage />
                    </TabsContent>

                    <TabsContent value="browse">
                        {/* Render the BrowsePage component here */}
                        <BrowsePage />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default Reclaimr;