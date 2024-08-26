import React, { useState, useEffect } from 'react';
import Site from '../components/Site';
import Home from '../components/Home';
import { genClubInfo } from '../utils/generateClubInfo';

export default function Index() {
  const [clubData, setClubData] = useState(null); // Store {clubName, clubPurpose, clubVibe}
  const [generatedContent, setGeneratedContent] = useState(null);
  const [doneGen, setDoneGen] = useState(false);
  const [siteData, setSiteData] = useState(null); // Store {clubName, generatedContent]

  const handleDataSubmission = (data) => {
    setClubData(data); // Update state when data is submitted
  };

  useEffect(() => {
    const generateContent = async () => { // Create async function inside useEffect
      if (clubData) {
        try {
          const genContent = await genClubInfo(clubData);
          setGeneratedContent(genContent);
        } catch (error) {
          console.error("Error generating content:", error);
          // Handle the error appropriately
        }
      }
    };
  
    generateContent(); // Call the async function
  }, [clubData]);

  useEffect(() => {
    // This effect runs after every render where generatedContent changes
    if (generatedContent) { 
      setSiteData({ clubName: clubData.clubName, generatedContent });
      setDoneGen(true);
    }
  }, [generatedContent]); 
  

  return (
    <div>
      {!doneGen ? ( 
        <Home onSubmit={handleDataSubmission} /> 
      ) : (
        <Site clubData={siteData} /> 
      )}
    </div>
  );
}