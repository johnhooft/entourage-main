"use client";
//Questionnaire
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Quiz from '../../modules/quiz/Quiz'
import { genClubInfo } from '../../../utils/site/generateClubInfo';
import { getSiteConfigFromQuiz } from '../../../utils/site/getSiteConfig'
import StepLoader from '@/modules/quiz/StepLoader';

// Define types for the state and props
interface ClubData {
  clubName: string;
  clubPurpose: string;
  clubVibe: string;
}

interface ErrorState {
  message: string;
}

interface GenerateContent {
  clubCopy: any;
  clubImages: any;
}

export default function Home() {
  // Define router
  const router = useRouter();
  //Datastructs
  const [clubData, setClubData] = useState<ClubData | null>(null);
  const [generatedContent, setGeneratedContent] = useState<GenerateContent | null>(null);
  //States
  const [doneGen, setDoneGen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successCounter, setSuccessCounter] = useState<number>(0);
  //Error
  const [error, setError] = useState<ErrorState | null>(null);

  const handleDataSubmission = (data: ClubData) => {
    setClubData(data);
    setIsLoading(true);
    setError(null);
  };

  const incrementCounter = () => {
    setSuccessCounter((prev) => prev + 1);
  };

  useEffect(() => {
    const generateContent = async () => {
      if (clubData) {
        try {
          setGeneratedContent(await genClubInfo(clubData, incrementCounter));
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
      const config = getSiteConfigFromQuiz(clubData, generatedContent);
      setDoneGen(true);
      setIsLoading(false);
      
      // Store the config in sessionStorage
      sessionStorage.setItem('siteConfig', JSON.stringify(config));
      
      // Redirect to /buildsite without passing config in the URL
      router.push('/buildsite');
    }
  }, [generatedContent, clubData, router]);

  return (
    <div className="h-screen w-screen min-h-fit">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 text-white bg-black">
          <StepLoader step={successCounter}/>
        </div>
      )}
      {error && <div className="error-message">{error.message}</div>}
      {!doneGen && <Quiz onSubmit={handleDataSubmission} />}
    </div>
  );
}