'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Colors, Fonts } from '../../../utils/types/layoutTypes';
import { fontMap, FontName } from '../../../utils/site/fontMap';
import { reduceOpacity } from '../../../utils/site/reduceOpacity';

interface Block {
  title: string;
  text: string;
  image: string;
}

interface InfoScrollProps {
  blockArr: Block[];
  colors: Colors;
  fonts: Fonts;
}

export default function Scroll({ blockArr, colors, fonts }: InfoScrollProps) {
  // Dynamic styles based on the colors prop

  const titleFont = fontMap[fonts.title as FontName];
  const textFont = fontMap[fonts.text as FontName]

  const styles = {
    container: {
      backgroundColor: reduceOpacity(colors.background, 1), // Full opacity background color
      borderColor: colors.accent, // Accent color for the border
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
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-8" style={{ backgroundColor: styles.container.backgroundColor }}>
      <div
        className="w-full max-w-6xl h-[80vh] overflow-y-auto rounded-3xl border-4 shadow-2xl relative p-4 md:p-16"
        style={{
          borderColor: styles.container.borderColor, // Border color
          boxShadow: styles.shadow.boxShadow, // Dynamic shadow
        }}
      >
        {blockArr.map((block, index) => (
          block.text ? (
            <motion.div 
              key={index}
              className="mb-40 first:mt-5 md:first:mt-14 last:mb-10 md:last:mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2">
                  <h2
                    className={`text-2xl font-bold mb-4 ${titleFont.className}`}
                    style={styles.title} // Title color
                  >
                    {block.title}
                  </h2>
                  <p className={`text-sm md:text-base ${textFont.className}`} style={styles.text}> {/* Text color */}
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
            </motion.div>
          ) : null
        ))}
      </div>
    </div>
  );
}
