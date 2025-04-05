//app\Middle.tsx
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const cardItems = [
  {
    title: "SkillX",
    description: "Explore skill-based challenges and learning modules.",
    link: "/SkillX",
  },
  {
    title: "ScholarAid",
    description: "Access curated resources to boost your knowledge.",
    link: "/ScholarAid",
  },
  {
    title: "Reclaimr",
    description: "Discover hands-on projects to build and grow.",
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
