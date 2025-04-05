"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  UserCircle,
  Calendar,
  Users,
  Search,
  ArrowLeft,
  Mic,
  MicOff,
  Bookmark,
} from "lucide-react";
import { schemes } from "./data/schemes";
import SchemeApplication from "../SchemeApplication";
import Link from "next/link";
import { Bookmarks } from "../types/Bookmarks";

interface Scheme {
  id: number;
  name: string;
  description: string;
  eligibility: string;
  benefit: string;
  icon: string;
  category: string;
  documents: string[];
  status: string;
  deadline: string;
  beneficiaries: string;
  color: string;
  applicationUrl: string;
  pdfUrl?: string;
}

const SchemesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState<Bookmarks[]>([]);

  const categories = [
    "All",
    "Agriculture",
    "Healthcare",
    "Housing",
    "Education",
    "Employment",
    "Insurance",
    "Welfare",
  ];

  const startVoiceRecognition = () => {
    if (
      typeof window !== "undefined" &&
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        alert(`Speech recognition error: ${event.error}`);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  };

  useEffect(() => {
    const fetchBookmarks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, redirecting to login.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/bookmarks", {
          headers: {
            "x-auth-token": token,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Bookmarks[] = await response.json();
        setBookmarkedSchemes(data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []);

  const handleBookmark = async (schemeId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, cannot add/remove bookmark.");
      return;
    }

    const existingBookmark = bookmarkedSchemes.find(
      (b) => b.schemeId === schemeId
    );

    if (existingBookmark) {
      setBookmarkedSchemes((prev) =>
        prev.filter((b) => b._id !== existingBookmark._id)
      );

      try {
        const response = await fetch(
          `http://localhost:5000/api/bookmarks/${existingBookmark._id}`,
          {
            method: "DELETE",
            headers: {
              "x-auth-token": token,
            },
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error(`Error removing bookmark: ${errorMessage}`);
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorMessage}`
          );
        }
      } catch (error) {
        console.error("Error removing bookmark:", error);
        setBookmarkedSchemes((prev) => [...prev, existingBookmark]);
      }
    } else {
      const newBookmark: Bookmarks = {
        _id: "",
        userId: "yourUserId",
        schemeId,
        createdAt: new Date(),
      };

      setBookmarkedSchemes((prev) => [...prev, newBookmark]);

      try {
        const response = await fetch("http://localhost:5000/api/bookmarks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({ schemeId }),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error(`Error adding bookmark: ${errorMessage}`);
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorMessage}`
          );
        }

        const addedBookmark = await response.json();
        setBookmarkedSchemes((prev) =>
          prev.map((b) => (b.schemeId === schemeId ? addedBookmark : b))
        );
      } catch (error) {
        console.error("Error adding bookmark:", error);
        setBookmarkedSchemes((prev) =>
          prev.filter((b) => b.schemeId !== schemeId)
        );
      }
    }
  };

  const filteredSchemes = schemes.filter((scheme) => {
    if (!scheme.name) console.warn("Scheme missing name:", scheme);
    const matchesSearch =
      scheme.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (scheme.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesSearch;
  });

  const handleSchemeClick = (scheme: Scheme) => {
    setSelectedScheme(scheme);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 max-w-7.5xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            Government Schemes
          </h1>
          <Link href="/">
            <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition duration-200">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </button>
          </Link>
        </div>

        <div className="relative mb-6 max-w-2xl mx-auto flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-4 pl-12 border border-gray-300 shadow-md focus:border-blue-500 focus:outline-none rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={startVoiceRecognition}
            className={`p-3 rounded-full ${
              isListening ? "bg-red-500" : "bg-blue-500"
            } text-white hover:opacity-90 transition-opacity shadow-md`}
            title={isListening ? "Listening..." : "Start voice search"}
          >
            {isListening ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-5 py-2 rounded-full text-sm font-medium transition duration-200 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="text-gray-500 mb-6">
          {filteredSchemes.length > 0
            ? `Showing ${filteredSchemes.length} schemes`
            : "No schemes found"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSchemes.map((scheme) => (
            <Card
              key={scheme.id}
              className="hover:shadow-lg transition-shadow cursor-pointer bg-white rounded-lg border border-gray-200"
              onClick={() => handleSchemeClick(scheme)}
            >
              <CardHeader className="bg-blue-50">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{scheme.icon}</span>
                  <div>
                    <CardTitle className="text-xl font-bold">
                      {scheme.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{scheme.category}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark(scheme.id);
                    }}
                    className="ml-auto"
                  >
                    <Bookmark
                      className={`h-5 w-5 ${
                        bookmarkedSchemes.some((b) => b.schemeId === scheme.id)
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">{scheme.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <UserCircle className="text-blue-600" />
                  <p>{scheme.eligibility}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="text-blue-600" />
                  <p>{scheme.benefit}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="text-blue-600" />
                  <p>Deadline: {scheme.deadline}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="text-blue-600" />
                  <p>{scheme.beneficiaries} beneficiaries</p>
                </div>
                <div className="mt-6">
                  <p className="font-semibold text-gray-700 mb-2">
                    Required Documents:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {scheme.documents.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 mt-6">
                  <button className="flex-1 min-w-0 bg-blue-600 text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition duration-200">
                    Check Eligibility
                  </button>
                  <a
                    href={scheme.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-0 bg-green-600 text-white py-2 rounded-lg font-semibold text-sm hover:bg-green-700 transition duration-200 text-center"
                  >
                    Apply Now
                  </a>
                  {scheme.pdfUrl && (
                    <a
                      href={scheme.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-12 h-10 bg-yellow-600 text-white rounded-lg flex justify-center items-center hover:bg-yellow-700 transition duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </a>
                  )}
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No schemes found</p>
          </div>
        )}

        {selectedScheme && (
          <SchemeApplication
            scheme={selectedScheme}
            onClose={() => setSelectedScheme(null)}
          />
        )}
      </div>
    </div>
  );
};

export default SchemesPage;
