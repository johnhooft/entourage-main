'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { Colors, Fonts, InfoBlock } from '../../../utils/types/layoutTypes';
import { fontMap, FontName } from '../../../utils/site/fontMap';
import { reduceOpacity } from '../../../utils/site/reduceOpacity';
import { useInView } from 'react-intersection-observer';
import { ScrollButtonExpanded } from './render-button-expanded';
import { ScrollButtonLink } from './render-button-link';

interface InfoScrollProps {
  blockArr: InfoBlock[];
  colors: Colors;
  fonts: Fonts;
  setShowExpandedPage: (page: string) => void;
}

export default function ScrollRender({ blockArr, colors, fonts, setShowExpandedPage }: InfoScrollProps) {
  const controls = useAnimation()
  const [scrollRef, inView] = useInView({
    threshold: .99, // Trigger when 90% of the component is visible
  });
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start({ scale: 1.02, transition: { duration: 0.5 } });
      setIsScrollable(true);
    } else {
      controls.start({ scale: 1, transition: { duration: 0.5 } });
      setIsScrollable(false);
    }
  }, [inView, controls]);

  const titleFont = fontMap[fonts.title as FontName];
  const textFont = fontMap[fonts.text as FontName]

  const styles = {
    container: {
      backgroundColor: reduceOpacity(colors.background, 1), // Full opacity background color
      borderColor: colors.accent, // Accent color for the border
    },
    innerContainer: {
      backgroundColor: reduceOpacity(colors.accent, 0.8), // Slightly transparent accent color
    },
    text: {
      color: colors.text, // Primary text color
    },
    title: {
      color: colors.primary, // Primary color for title
    },
    shadow: {
      boxShadow: `0 0 20px ${reduceOpacity(colors.accent, 0.5)}`, // Shadow with reduced opacity
    },
    button: {
      color: colors.text,
      borderColor: colors.accent,
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-8" style={{ backgroundColor: styles.container.backgroundColor }}>
      <motion.div
        ref={scrollRef}
        animate={controls}
        className={`w-full max-w-6xl h-[80vh] rounded-3xl border-4 relative p-4 md:p-16 ${isScrollable ? 'overflow-y-auto' : 'overflow-y-hidden'}`}
        style={{
          borderColor: styles.container.borderColor,
          backgroundColor: styles.innerContainer.backgroundColor, // Apply the new background color
        }}
      >
        {blockArr.map((block, index) => (
          block.text ? (
            <motion.div 
              key={index}
              className="mb-20 md:mb-40 first:mt-0 md:first:mt-0 last:mb-0 md:last:mb-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2">
                  <h2
                    className={`text-2xl font-bold mb-8 ${titleFont.className}`}
                    style={styles.title} // Title color
                  >
                    {block.title}
                  </h2>
                  <p className={`text-sm md:text-base whitespace-pre-wrap ${textFont.className}`} style={styles.text}> {/* Text color */}
                    {block.text}
                  </p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                  <Image
                    src={block.image}
                    width={400}
                    height={400}
                    alt={`Image for ${block.title}`}
                    className="rounded-lg shadow-md max-h-[400px] object-cover"
                  />
                </div>
              </div>
              <div className='flex gap-2'>
                {block.buttonlinkText && block.buttonLinkURL ? (
                  <div className='mt-4 px-2'>
                    <ScrollButtonLink 
                      text={block.buttonlinkText}
                      url={block.buttonLinkURL}
                      style={styles.button}
                    />
                  </div>
                ) : null}
                {(block.buttonExpandedPage) && (
                  <div className='mt-4 px-2'>
                    <ScrollButtonExpanded
                      text={'Learn More ->'}
                      page={block.buttonExpandedPage}
                      style={styles.button}
                      onExpand={setShowExpandedPage}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ) : null
        ))}
      </motion.div>
    </div>
  );
}
