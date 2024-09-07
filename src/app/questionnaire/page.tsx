"use client";

import React, { useState, useEffect } from 'react';
import Site from '../modules/site/Site';
import Quiz from '../modules/Quiz';
import { genClubInfo } from '../utils/generateClubInfo';
import Spinner from '../modules/Spinner'; // Add a spinner component for better UX

// Define types for the state and props
interface ClubData {
  clubName: string;
  clubPurpose: string; // Optional fields
  clubVibe: string;
}

interface SiteData {
  clubData: ClubData;
  generatedContent: GenerateContent;
}

interface ErrorState {
  message: string;
}

interface GenerateContent {
  clubCopy: any;
  clubImages: any;
}

// Update Home function component to use TypeScript
export default function Home() {
  const [clubData, setClubData] = useState<ClubData | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GenerateContent | null>(null);
  const [doneGen, setDoneGen] = useState<boolean>(false);
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState | null>(null);

  // Update function signature to use TypeScript
  const handleDataSubmission = (data: ClubData) => {
    setClubData(data);
    setIsLoading(true);
    setError(null);
  };

  useEffect(() => {
    const generateContent = async () => {
      if (clubData) {
        try {
          setGeneratedContent( await genClubInfo(clubData) );
        } catch (error) {
          console.error("Error generating content:", error);
          setError({ message: "Failed to generate content. Please try again." });
          setIsLoading(false);
        }
      }
    };

    generateContent();
  }, [clubData]);

  useEffect(() => {
    if (generatedContent && clubData) {
      setSiteData({ clubData: clubData, generatedContent });
      setDoneGen(true);
      setIsLoading(false);
      console.log("site render")
    }
  }, [generatedContent, clubData]);

  return (
    <div className="h-screen w-screen">
      {isLoading && (
        <div className="loading-screen">
          <Spinner />
        </div>
      )}
      {error && <div className="error-message">{error.message}</div>}
      {siteData ? ( 
        <div className="flex flex-col">
          <Site siteData={siteData} /> 
        </div>
      ) : (
        !doneGen ? <Quiz onSubmit={handleDataSubmission} /> : null 
      )}
      <style jsx>{`
        .container {
          position: relative;
          min-height: 100vh;
        }
        .loading-screen {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: rgba(52, 50, 50, 0.8);
          z-index: 999;
        }
        .error-message {
          color: red;
          text-align: center;
        }
      `}</style>
    </div>
  );
}