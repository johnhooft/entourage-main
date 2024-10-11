import React, { useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-image-cards";
import { Colors, Fonts } from '../../../utils/types/layoutTypes';
import { fontMap, FontName } from '../../../utils/site/fontMap';
import { reduceOpacity } from "../../../utils/site/reduceOpacity";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface MovingCardsProps {
  aboutText: string;
  imageArr: string[];
  colors: Colors;
  fonts: Fonts;
}

const MovingCards: React.FC<MovingCardsProps> = ({ aboutText, imageArr, colors, fonts }) => {
    // Function to create an image object for the InfiniteMovingCards component
    function createImage(imageStr: string, index: number) {
        return { image: imageStr, name: index.toString(), title: "" };
    }

    // Get current fonts
    const titleFont = fontMap[fonts.title as FontName];
    const textFont = fontMap[fonts.text as FontName];
    const images = imageArr.map(createImage);

    // In line CSS for Dynamic Styles
    const styles = {
        container: {
            backgroundColor: reduceOpacity(colors.background, 1),
        },
        text: {
            color: colors.text,
        },
    };

    return (
        <div
            className="h-fit md:h-[22rem] rounded-sm flex flex-col antialiased items-center justify-center relative overflow-hidden"
            style={styles.container}
        >
            <div className="flex flex-grow flex-col justify-evenly items-center">
                <div
                    className={`flex w-screen px-6 py-3 md:px-12 lg:px-28 ${textFont.className} justify-center`}
                    style={styles.text}
                >
                    {aboutText}
                </div>
                <div 
                    className="flex w-screen justify-center relative transition-all duration-200"
                >
                    <InfiniteMovingCards
                        items={images}
                        direction="left"
                        speed="slow"
                    />
                </div>
            </div>
        </div>
    );
};

export default MovingCards;