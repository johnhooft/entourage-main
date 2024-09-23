"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import { Colors } from '../../../utils/types/layoutTypes';

// Function to reduce opacity of an HSL string
const reduceOpacity = (hslString: string, newOpacity: number) => {
  return hslString.replace(/[\d.]+\)$/g, `${newOpacity})`);
};

interface HeroProps {
  text: string;
  image: string;
  textColor?: string;
  textOpacity?: string;
  colors: Colors;
}

const HeroSection: React.FC<HeroProps> = ({ text, image, textColor, textOpacity, colors }) => {
  const images = [image];

  // Style object to dynamically apply colors from the theme
  const styles = {
    text: {
      color: colors.primary,
      opacity: textOpacity || '1', // Use optional opacity if provided
    },
    button: {
      backgroundColor: reduceOpacity(colors.accent, 0.1), // 10% opacity
      borderColor: reduceOpacity(colors.accent, 0.2),     // 20% opacity
      color: colors.accent,
    },
    buttonHover: {
      backgroundColor: reduceOpacity(colors.accent, 0.2), // 20% opacity on hover
      borderColor: reduceOpacity(colors.accent, 0.4),     // 40% opacity on hover
    },
  };

  return (
    <div className="w-screen">
      <ImagesSlider className="h-[22rem]" images={images} autoplay={false}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p 
            className={`font-bold text-xl md:text-6xl text-center bg-clip-text bg-gradient-to-b py-4`} 
            style={styles.text} // Apply primary color to text
          >
            {text}
          </motion.p>

          <button
            className="px-4 py-2 backdrop-blur-sm border text-white mx-auto text-center rounded-full relative mt-4"
            style={styles.button} // Apply dynamic background and border colors
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
              e.currentTarget.style.borderColor = styles.buttonHover.borderColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
              e.currentTarget.style.borderColor = styles.button.borderColor;
            }}
          >
            <span>Join now →</span>
            <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-white to-transparent" />
          </button>
        </motion.div>
      </ImagesSlider>
    </div>
  );
};

export default HeroSection;