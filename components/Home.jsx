import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import PropTypes from 'prop-types';

export const maxDuration = 300

export default function Home({ onSubmit }) { 
  const [clubPurpose, setClubPurpose] = useState('');
  const [vibe, setVibe] = useState('');
  const [generatedContent, setGeneratedContent] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [isStreamComplete, setIsStreamComplete] = useState(false);

  const handleSelect = (e, section) => {
    const value = e.target.getAttribute('data-value');
    if (section === 'clubPurpose') {
      setClubPurpose(prev => 
        prev.includes(value) ? prev.replace(value, '').replace(/,,/g, ',').replace(/^,|,$/g, '') : prev ? `${prev},${value}` : value
      );
    } else if (section === 'vibe') {
      setVibe(prev => 
        prev.includes(value) ? prev.replace(value, '').replace(/,,/g, ',').replace(/^,|,$/g, '') : prev ? `${prev},${value}` : value
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch('/api/generate', { // Correct API route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Send as JSON
        },
        body: JSON.stringify({ 
          club_name: document.getElementById('club_name').value,
          club_purpose: clubPurpose, 
          vibe: vibe 
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle the Server-Sent Events (SSE) stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const processChunk = (chunk) => {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop(); // Store incomplete lines for the next chunk

        for (const line of lines) {
          if (line) {
            const data = JSON.parse(line.slice(6)); // Remove "data: " prefix

            if (data.type === 'chunk') {
              setGeneratedContent((prevContent) => {
                const newContent = { ...prevContent };
                newContent[data.purpose] = (newContent[data.purpose] || '') + data.content;
                return newContent; 
              });
            }
          }
        }
      };

      const readStream = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              setIsStreamComplete(true);
              break;
            }
            processChunk(value);
          }
        } finally {
          setIsLoading(false);
        }
      };

      readStream();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (isStreamComplete) {
      console.log('Stream has completed, and all content has been processed.');
      console.log('Generated Content:', generatedContent);
      onSubmit({ clubName: document.getElementById('club_name').value, generatedContent: generatedContent }); 
    }
  }, [isStreamComplete, generatedContent, onSubmit]);

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <h1 className={styles.h1}>ENTOURAGE</h1>
        <h2 className={styles.h2}>Club Sites in 60 Seconds</h2>
      </header>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="club_name" className={styles.label}>Club Name:</label>
        <input type="text" id="club_name" name="club_name" required className={styles.input} />

        <section className={styles.questionSection}>
          <h2 className={styles.sectionHeader}>You Want People to Know About Your:</h2>
          <div className={styles.selectableGroup}>
            {['Memberships', 'Events', 'Trips', 'Parties', 'Culture', 'Executive Team'].map(option => (
              <div
                key={option}
                data-value={option}
                className={`${styles.selectableContainer} ${clubPurpose.includes(option) ? styles.selected : ''}`}
                onClick={e => handleSelect(e, 'clubPurpose')}
              >
                {option}
              </div>
            ))}
          </div>
          <input type="hidden" id="club_purpose" name="club_purpose" value={clubPurpose} />
        </section>

        <section className={styles.questionSection}>
          <h2 className={styles.sectionHeader}>What's your vibe?</h2>
          <div className={styles.selectableGroup}>
            {['Social', 'Athletic', 'Academic', 'Educational', 'Community', 'Competitive'].map(option => (
              <div
                key={option}
                data-value={option}
                className={`${styles.selectableContainer} ${vibe.includes(option) ? styles.selected : ''}`}
                onClick={e => handleSelect(e, 'vibe')}
              >
                {option}
              </div>
            ))}
          </div>
          <input type="hidden" id="vibe" name="vibe" value={vibe} />
        </section>

        <button id="submitButton" type="submit" className={styles.button}>Generate Site</button>

      </form>
      {isLoading && ( // Conditionally render loading screen
        <div className={styles.loadingOverlay}> 
          <div className={styles.loadingSpinner}></div>
        </div>
      )} 
    </div>
  );
}
