'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import EditableText from './editable-text';
import EditableImage from './editable-image';
import { motion, useAnimation } from 'framer-motion'
import { Colors, Fonts } from '../../../utils/types/layoutTypes';
import { fontMap, FontName } from '../../../utils/site/fontMap';
import { reduceOpacity } from '../../../utils/site/reduceOpacity';
import { v4 as uuidv4 } from 'uuid';
import { useInView } from 'react-intersection-observer';

interface Block {
  id: string;
  title: string;
  text: string;
  image: string;
}

interface InfoScrollProps {
  blockArr: Block[];
  colors: Colors;
  fonts: Fonts;
  updateConfig: (newProps: any) => void;
}

export default function Scroll({ blockArr, colors, fonts, updateConfig }: InfoScrollProps) {
  const controls = useAnimation()
  const [scrollRef, inView] = useInView({
    threshold: 0.90, // Trigger when 70% of the component is visible
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

  // Get custom fonts
  const titleFont = fontMap[fonts.title as FontName];
  const textFont = fontMap[fonts.text as FontName]

  // In line CSS for Dynamic Styles
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

  const updateBlockTitle = (blockIndex: number, newTitle: string) => {
    // Get the current blockArr from the Scroll component's props
    const updatedBlocks = [...blockArr];  // Create a shallow copy of blockArr
    updatedBlocks[blockIndex] = { ...updatedBlocks[blockIndex], title: newTitle };  // Update the title of the specific block
    // Call updateConfig to update the entire blockArr in Scroll's props
    updateConfig({ blockArr: updatedBlocks });
  };

  const updateBlockText = (blockIndex: number, newText: string) => {
    const updatedBlocks = [...blockArr];
    updatedBlocks[blockIndex] = { ...updatedBlocks[blockIndex], text: newText };
    updateConfig({ blockArr: updatedBlocks });
  };

  const updateBlockImage = (blockId: string, newImageUrl: string) => {
    const updatedBlocks = blockArr.map((block) => 
      block.id === blockId ? { ...block, image: newImageUrl } : block
    );
    updateConfig({ blockArr: updatedBlocks });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-8" style={{ backgroundColor: styles.container.backgroundColor }}>
      <motion.div
        ref={scrollRef}
        animate={controls}
        className={`w-full max-w-6xl h-[80vh] rounded-3xl border-4 relative p-4 md:p-16 ${isScrollable ? 'overflow-y-auto' : 'overflow-y-hidden'}`}
        style={{
          borderColor: styles.container.borderColor, // Border color
          //boxShadow: styles.shadow.boxShadow, // Dynamic shadow
        }}
      >
        {blockArr.map((block, index) => (
          block.text ? (
            <motion.div 
              key={block.id}
              className="mb-20 md:mb-40 first:mt-0 md:first:mt-0 last:mb-0 md:last:mb-10"
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
                    <EditableText text={block.title} onTextChange={(newText) => updateBlockTitle(index, newText)} />
                  </h2>
                  <div className={`text-sm md:text-base ${textFont.className}`} style={styles.text}> {/* Text color */}
                    <EditableText text={block.text} onTextChange={(newText) => updateBlockText(index, newText)} />
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                  <EditableImage
                    src={block.image}
                    alt={`Image for ${block.title}`}
                    width={400}
                    height={400}
                    className="rounded-lg shadow-md max-h-[400px] object-cover"
                    id={block.id}
                    onImageUpdate={(newImageUrl) => updateBlockImage(block.id, newImageUrl)}
                  />
                </div>
              </div>
            </motion.div>
          ) : null
        ))}
      </motion.div>
    </div>
  );
}
