//app\Middle.tsx
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const cardItems = [
  {
    title: "SkillX",
    description: "Visualize a secure assessment platform with real-time monitoring. Imagine a streamlined test-taking experience with AI-driven insights.",
    link: "/SkillX",
  },
  {
    title: "ScholarAid",
    description: "Picture a comprehensive platform for discovering scholarships and grants. Envision students easily accessing the resources they need.",
    link: "/ScholarAid",
  },
  {
    title: "Reclaimr",
    description: "See an AI-powered solution simplifying the recovery of unclaimed assets. Imagine individuals and institutions finding their lost items.",
    link: "/Reclaimr",
  },
];

const FeatureCards = () => {
  return (
    <section className="py-10 px-4 md:px-10 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardItems.map((item, idx) => (
          <Link key={idx} href={item.link}>
            <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {item.title}
                  <ArrowRight className="h-4 w-4" />
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Click to explore more.
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
