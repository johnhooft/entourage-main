import React, { useState } from 'react';
import Home from '../components/home';
import Site from '../components/Site';

export default function Index() {
  const [clubData, setClubData] = useState(null); // Store club name and content

  const handleDataSubmission = (data) => {
    setClubData(data); // Update state when data is submitted
  };

  return (
    <div>
      {!clubData ? ( 
        <Home onSubmit={handleDataSubmission} /> 
      ) : (
        <Site clubData={clubData} /> 
      )}
    </div>
  );
}