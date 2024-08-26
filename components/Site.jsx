import React, { useEffect, useState } from 'react';
import styles from '../styles/Site.module.css'; // Import module CSS
import PropTypes from 'prop-types';

export default function Site({ clubData }) {
  const { clubName, generatedContent } = clubData;

  if (!clubName || !Object.keys(generatedContent).length) {
    return <p>Loading...</p>;
  }

  // Add PropTypes for type checking
  Site.propTypes = {
    clubData: PropTypes.shape({
      clubName: PropTypes.string.isRequired,
      generatedContent: PropTypes.object.isRequired,
    }).isRequired,
  };

  //console.log(generatedContent);

  return (
    <div className={styles.siteContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoPlaceholder}>Logo Here</div>
          <h1 className={styles.clubName}>{clubName}</h1>
          <div className={styles.headerSelections}>
            {generatedContent.Memberships && <span>Memberships</span>}
            {generatedContent.Events && <span>Events</span>}
            {generatedContent.Trips && <span>Trips</span>}
            {generatedContent.Culture && <span>Culture</span>}
            {generatedContent['Executive Team'] && <span>Executive Team</span>}
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.aboutSection}>
          <div className={styles.aboutContent}>
            <p>{generatedContent['About Us']}</p>
            <div className={styles.aboutImage}>
              {/* Replace with actual image URL */}
              {/* <img src="about-image.png" alt="About Us Image" /> */}
            </div>
          </div>
        </section>

        <div className={styles.gridContainer}>
          {generatedContent.Memberships && (
            <section className={`${styles.fullWidthSection} ${styles.membershipsSection}`}>
              <h2>Memberships</h2>
              <div className={styles.sectionContent}>
                <p>{generatedContent.Memberships}</p>
                <a href="#" className={styles.button}>Get a Membership</a>
              </div>
            </section>
          )}

          {generatedContent.Events && (
            <section className={`${styles.fullWidthSection} ${styles.eventsSection}`}>
              <h2>Events</h2>
              <div className={styles.sectionContent}>
                <p>{generatedContent.Events}</p>
                <a href="#" className={styles.button}>View Events</a>
              </div>
            </section>
          )}

          {generatedContent.Trips && (
            <section className={`${styles.fullWidthSection} ${styles.tripsSection}`}>
              <h2>Trips</h2>
              <div className={styles.sectionContent}>
                <p>{generatedContent.Trips}</p>
                <a href="#" className={styles.button}>Explore Trips</a>
              </div>
            </section>
          )}

          {generatedContent.Culture && (
            <section className={`${styles.fullWidthSection} ${styles.cultureSection}`}>
              <h2>Culture</h2>
              <div className={styles.sectionContent}>
                <p>{generatedContent.Culture}</p>
                <a href="#" className={styles.button}>Learn More</a>
              </div>
            </section>
          )}

          {generatedContent['Executive Team'] && (
            <section className={`${styles.fullWidthSection} ${styles.executiveTeamSection}`}>
              <h2>Executive Team</h2>
              <div className={styles.sectionContent}>
                <p>{generatedContent['Executive Team']}</p>
                <a href="#" className={styles.button}>Meet the Team</a>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
