"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import FullscreenExpandableMenu from './NavMenu';
import ColorPickerWheel from "./ColorWheel";

interface HeroProps {
  text: string;
  image: string;
  textColor?: string;
  textOpacity?: string;
}

const HeroSection: React.FC<HeroProps> = ({ text, image, textColor, textOpacity }) => {
  const images = [image];
  
  return (
    <div className="w-screen">
      <div className="absolute top-4 right-4">
        <FullscreenExpandableMenu color="entourage-blue"/>
      </div>
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
          <motion.p className={`font-bold text-xl md:text-6xl text-center ${textOpacity} bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400 py-4 ${textColor}`}>
            {text}
          </motion.p>
          <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
            <span>Join now →</span>
            <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
          </button>
        </motion.div>
      </ImagesSlider>
    </div>
  );
}

export default HeroSection;