import React, { useState } from "react";
import EditableText from './editable-text';
import EditableImage from './editable-image';
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-image-cards";
import { Colors, Fonts } from '../../../utils/types/layoutTypes';
import { fontMap, FontName } from '../../../utils/site/fontMap';
import { reduceOpacity } from "../../../utils/site/reduceOpacity";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MovingCardsProps {
  aboutText: string;
  imageArr: string[];
  colors: Colors;
  fonts: Fonts;
  updateConfig: (newProps: any) => void;
}

const MovingCards: React.FC<MovingCardsProps> = ({ aboutText, imageArr, colors, fonts, updateConfig }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    const handleImageUpdate = (index: number, newImageUrl: string) => {
        const newImageArr = [...imageArr];
        newImageArr[index] = newImageUrl;
        updateConfig({ imageArr: newImageArr });
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
                    <EditableText text={aboutText} onTextChange={(newText) => updateConfig({ aboutText: newText })} />
                </div>
                <div 
                    className="flex w-screen justify-center relative border-transparent border-[1px] rounded-[20px] hover:border-gray-300 transition-all duration-200"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <InfiniteMovingCards
                        items={images}
                        direction="left"
                        speed="slow"
                    />
                    {isHovered && (
                        <button
                            className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition-colors duration-300"
                            onClick={() => setIsDialogOpen(true)}
                        >
                            Change Images
                        </button>
                    )}
                </div>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="w-11/12 max-w-[70vw] h-[80vh] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl mb-2">Edit Images</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {imageArr.map((image, index) => (
                            <EditableImage
                                key={index}
                                src={image}
                                alt={`Image ${index + 1}`}
                                width={350}
                                height={200}
                                className="w-full h-full object-cover rounded-lg shadow-md max-w-[350px] max-h-[200px]"
                                id={`image-${index}`}
                                onImageUpdate={(newImageUrl) => handleImageUpdate(index, newImageUrl)}
                            />
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MovingCards;