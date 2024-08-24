import React, { useState } from 'react';
import Site from '../components/Site';
import Home from '../components/Home';

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