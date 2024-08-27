import React, { useState, useEffect } from 'react';
import Site from '../components/Site';
import Home from '../components/Home';
import { genClubInfo } from '../utils/generateClubInfo';
import Spinner from '../components/Spinner'; // Add a spinner component for better UX

export default function Index() {
  const [clubData, setClubData] = useState(null); // Store {clubName, clubPurpose, clubVibe}
  const [generatedContent, setGeneratedContent] = useState(null);
  const [doneGen, setDoneGen] = useState(false);
  const [siteData, setSiteData] = useState(null); // Store {clubName, generatedContent}
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Error handling state

  const handleDataSubmission = (data) => {
    setClubData(data); // Update state when data is submitted
    setIsLoading(true);
    setError(null); // Reset error state on new submission
  };

  useEffect(() => {
    const generateContent = async () => {
      if (clubData) {
        try {
          const genContent = await genClubInfo(clubData);
          setGeneratedContent(genContent);
        } catch (error) {
          console.error("Error generating content:", error);
          setError("Failed to generate content. Please try again.");
          setIsLoading(false); // Stop loading on error
        }
      }
    };

    generateContent();
  }, [clubData]);

  useEffect(() => {
    if (generatedContent) {
      setSiteData({ clubName: clubData.clubName, generatedContent });
      setDoneGen(true);
      setIsLoading(false);
    }
  }, [generatedContent]);

  return (
    <div className="container">
      {isLoading && (
        <div className="loading-screen">
          <Spinner />
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      {!doneGen ? (
        <Home onSubmit={handleDataSubmission} />
      ) : (
        <Site clubData={siteData} />
      )}
      <style jsx>{`
        .container {
          position: relative; /* Ensure container is positioned relative */
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
          z-index: 999; /* Ensure loading screen is on top */
        }
        .error-message {
          color: red;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
