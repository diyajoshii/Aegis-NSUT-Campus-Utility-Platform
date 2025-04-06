//app\Middle.tsx
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const cardItems = [
  {
    title: "SkillX",
    description: "Experience fair and focused assessments with SkillX's secure platform. Real-time proctoring and test scores for efficient performance tracking and a seamless test-taking experience.",
    link: "/SkillX",
  },
  {
    title: "ScholarAid",
    description: "Discover your ideal scholarships with ScholarAid. Get personalized recommendations and easily access the resources you need to fund your education.",
    link: "/ScholarAid",
  },
  {
    title: "Reclaimr",
    description: "Lost something on campus? Reclaimr is your simple college lost and found. Easily report lost items and connect with found objects to get your belongings back quickly.",
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
