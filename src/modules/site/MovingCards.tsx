"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-image-cards";

interface MovingCardsProps {
    aboutText: string;
    imageArr: string[];
    textColor?: string;
    textOpacity?: string;
}

const MovingCards: React.FC<MovingCardsProps> = ({ aboutText, imageArr, textColor, textOpacity }) => {
    function createImage(imageStr: string, index: number) {
        return { image: imageStr, name: index.toString(), title: ""}
    }

    const images = imageArr.map(createImage)
    
    return (
    <div className="h-fit md:h-[22rem] rounded-sm flex flex-col antialiased bg-entourage-black items-center justify-center relative overflow-hidden">
        <div className="flex flex-grow flex-col justify-evenly items-center">
            <div className="flex text-white w-screen px-6 py-3 md:px-12 lg:px-28">
                {aboutText}
            </div>
            <div className="flex w-screen justify-center">
                <InfiniteMovingCards
                    items={images}
                    direction="left"
                    speed="slow"
                />
            </div>
        </div>
    </div>
    );
}

export default MovingCards;