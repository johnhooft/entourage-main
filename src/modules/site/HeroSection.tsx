"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import EditableText from './editable-text';
import EditableImage from "./editable-image";
import { ImagesSlider } from "@/components/ui/images-slider";
import { Colors, Fonts } from '../../../utils/types/layoutTypes';
import { fontMap, FontName } from '../../../utils/site/fontMap';
import { reduceOpacity } from "../../../utils/site/reduceOpacity";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface HeroProps {
  text: string;
  image: string;
  fonts: Fonts;
  colors: Colors;
  buttonText: string;
  buttonLink: string;
  updateConfig: (newProps: any) => void;
}

const HeroSection: React.FC<HeroProps> = ({ text, image, fonts, colors, buttonText, buttonLink, updateConfig }) => {
  const titleFont = fontMap[fonts.title as FontName];
  const textFont = fontMap[fonts.text as FontName]
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localText, setLocalText] = useState(text);
  const [localButtonText, setLocalButtonText] = useState(buttonText);
  const [localButtonLink, setLocalButtonLink] = useState(buttonLink);

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

  const handleImageUpdate = (newImageUrl: string) => {
    updateConfig({ image: newImageUrl });
  };

  const handleSave = () => {
    updateConfig({
      text: localText,
      buttonText: localButtonText,
      buttonLink: localButtonLink,
    });
    setIsMenuOpen(false);
  };

  return (
    <div className="w-screen">
      <ImagesSlider key={image} className="h-[22rem]" images={[image]} autoplay={false}>
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-50 flex flex-col justify-center items-center border border-transparent hover:border-gray-300 rounded-[20px] transition-all duration-200 p-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
          {isHovered && (
            <button
              className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition-colors duration-300"
              onClick={() => setIsMenuOpen(true)}
            >
              Customize Section
            </button>
          )}
        </motion.div>
      </ImagesSlider>
      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent className="flex flex-grow flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl mb-2">Customize Hero Section</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="hero-text">Title Text</Label>
              <Input
                id="hero-text"
                value={localText}
                onChange={(e) => setLocalText(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="button-text">Button Text</Label>
              <Input
                id="button-text"
                value={localButtonText}
                onChange={(e) => setLocalButtonText(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="button-link">Button Link</Label>
              <Input
                id="button-link"
                value={localButtonLink}
                onChange={(e) => setLocalButtonLink(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="border-[1px] border-black rounded-[20px] flex flex-col p-4">
              <Label>Background Image:</Label>
              <EditableImage 
                src={image}
                alt='bg-image'
                width={350}
                height={200}
                id='landing-image'
                className="w-full h-full object-cover rounded-lg shadow-md max-w-[350px] max-h-[200px] mt-2"
                onImageUpdate={(newImageUrl) => handleImageUpdate(newImageUrl)}
              />
            </div>
            <Button onClick={handleSave} className="w-full">Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroSection;