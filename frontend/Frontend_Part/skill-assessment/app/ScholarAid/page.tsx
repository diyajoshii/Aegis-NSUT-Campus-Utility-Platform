"use client";
import React, { useState } from 'react';
import Navbar from '../Navbar';
import Link from 'next/link';
import { Button } from "@/components/ui/button"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SchemesPage from '../schemes/page'; 

const ScholarAid = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [currentSection, setCurrentSection] = useState("schemes");

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
                <Tabs defaultValue="schemes" className="space-y-4" onValueChange={setCurrentSection}>
                    <TabsList className="bg-card flex justify-between items-center">
                        <div className="flex space-x-4">
                            <TabsTrigger value="schemes">Schemes</TabsTrigger>
                            <TabsTrigger value="ai-assist">AI-Assist</TabsTrigger>
                        </div>
                        {/* Back to Home Button */}
                        <Link href="/" passHref>
                            <Button className="ml-4">Back to Home</Button>
                        </Link>
                    </TabsList>

                    <TabsContent value="schemes">
                        {/* Render the SchemesPage component here */}
                        <SchemesPage />
                    </TabsContent>

                    <TabsContent value="ai-assist">
                        {/* Content for AI-Assist */}
                        <div className="p-4">
                            <h2 className="text-xl font-bold">AI-Assist Page Content</h2>
                            {/* Add your AI-Assist page content here */}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default ScholarAid;