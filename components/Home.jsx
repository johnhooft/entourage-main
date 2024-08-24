import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import PropTypes from 'prop-types';

export const maxDuration = 300

export default function Home({ onSubmit }) { 
  const [clubPurpose, setClubPurpose] = useState('');
  const [vibe, setVibe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
  
      const data = await response.json(); // Assuming the response is JSON
      const { club_name, generated_content } = data;
  
      // Pass data to index.jsx
      onSubmit({ clubName: club_name, generatedContent: generated_content }); 

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  Home.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

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
