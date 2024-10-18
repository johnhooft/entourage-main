"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import { Colors, Fonts } from '../../../utils/types/layoutTypes';
import { fontMap, FontName } from '../../../utils/site/fontMap';
import { reduceOpacity } from "../../../utils/site/reduceOpacity";
import FullscreenExpandableMenu from '../site/NavMenu';
import Image from "next/image";

interface HeroProps {
  text: string;
  image: string;
  fonts: Fonts;
  colors: Colors;
  buttonText: string;
  buttonLink: string;
  logo: string;
  siteSections: string[];
  setShowExpandedPage: (page: string) => void;
}

const HeroSection: React.FC<HeroProps> = ({ text, image, fonts, colors, buttonText, buttonLink, logo, siteSections, setShowExpandedPage }) => {
  const titleFont = fontMap[fonts.title as FontName];
  const textFont = fontMap[fonts.text as FontName];
  const [ifLogo, setIfLogo] = useState(true);

  useEffect(() => {
    if (logo == "") {setIfLogo(false)} 
    else {setIfLogo(true)}
  }, [logo]);

  // In line CSS for Dynamic Styles
  const styles = {
    text: {
      color: colors.primary,
    },
    button: {
      backgroundColor: reduceOpacity(colors.accent, 0.1),
      borderColor: reduceOpacity(colors.accent, 0.2),
      color: colors.accent,
    },
    buttonHover: {
      backgroundColor: reduceOpacity(colors.accent, 0.2),
      borderColor: reduceOpacity(colors.accent, 0.4),
    },
  };

  return (
    <div className="w-full -mt-16">
      {ifLogo && (
        <div className="flex flex-row justify-between relative w-[85%] md:w-[95%] top-28 left-8 md:top-28 md:left-10 text-white z-50">
          <Image
            priority
            src={logo}
            alt="logo"
            width={60}
            height={60}
          />
          <div className="w-fit z-50">
            <FullscreenExpandableMenu 
              colors={colors} 
              siteSections={siteSections}
              setExpandedPage={setShowExpandedPage}
            />
          </div>
        </div>
      )}
      <ImagesSlider key={image} className="h-[22rem]" images={[image]} autoplay={false}>
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-50 flex flex-col justify-center items-center transition-all duration-200 p-2"
        >
          <motion.div 
            className={`font-bold text-5xl md:text-6xl text-center ${titleFont.className} bg-clip-text bg-gradient-to-b py-4`} 
            style={styles.text}
          >
            <div className="-mb-2">{text}</div>
          </motion.div>

          <a
            href={buttonLink}
            className={`px-4 py-2 backdrop-blur-sm border text-white ${textFont.className} mx-auto text-center rounded-full relative mt-4`}
            style={styles.button}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
              e.currentTarget.style.borderColor = styles.buttonHover.borderColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
              e.currentTarget.style.borderColor = styles.button.borderColor;
            }}
          >
            <span>{buttonText} →</span>
            <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-white to-transparent" />
          </a>
        </motion.div>
      </ImagesSlider>
    </div>
  );
};

export default HeroSection;