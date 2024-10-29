import React, {useEffect} from 'react';
import { Colors, Fonts } from '../../../utils/types/layoutTypes';
import { fontMap, FontName } from '../../../utils/site/fontMap';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { ScrollButtonLink } from './render-button-link';

interface RenderExpandedMembershipsProps {
  title: string;
  image: string;
  text: string;
  buttonText: string;
  buttonLink: string;
  colors: Colors;
  fonts: Fonts;
  setShowExpandedPage: React.Dispatch<React.SetStateAction<string>>;
}

export default function ExpandedMemberships({ 
  title, 
  image, 
  text, 
  buttonLink, 
  buttonText, 
  colors, 
  fonts, 
  setShowExpandedPage 
}: RenderExpandedMembershipsProps) {
    const titleFont = fontMap[fonts.title as FontName];
    const textFont = fontMap[fonts.text as FontName];

    const styles = {
        container: {
            backgroundColor: colors.background,
            color: colors.text,
        },
        title: {
            color: colors.primary,
        },
        button: {
            borderColor: colors.accent,
            color: colors.text,
        },
    };

    const buttonStyle: React.CSSProperties = {
        color: colors.text,
        backgroundColor: colors.accent,
    };

    const onBack = () => {
        setShowExpandedPage("");
    };

    useEffect(() => {
        // Reset scroll position to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`w-full min-h-[93vh] max-h-fit flex flex-col items-center p-4 sm:p-8 relative ${textFont.className}`} style={styles.container}>
            <Button 
                className='z-40 absolute top-2 left-2 sm:top-4 sm:left-4 rounded-[15px] bg-transparent hover:bg-transparent hover:scale-105 transition-all border-[1px] mx-2 sm:mx-4' 
                style={styles.button} 
                onClick={onBack}
            >
                ← Back
            </Button>
            <div className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 mt-12 sm:mt-10 md:mt-2 whitespace-pre-wrap ${titleFont.className}`} style={styles.title}>
                {title}
            </div>
            
            <div className="flex flex-col lg:flex-row justify-center w-full max-w-6xl mb-8 sm:mb-12">
                <div className="w-full flex justify-center lg:w-1/2 mb-4 sm:mb-8 lg:mb-0 lg:mr-8">
                    <div className="w-[325px] h-[200px] md:w-[500px] md:h-[400px] lg:w-[600px] lg:h-[400px] relative">
                        <Image
                            src={image}
                            alt="Membership Image"
                            fill
                            className="rounded-lg shadow-md object-cover"
                        />
                    </div>
                </div>
                <div className={`w-full lg:w-1/2 whitespace-pre-wrap mt-4 lg:mt-0 ${textFont.className}`}>
                    {text}
                </div>
            </div>
            {(buttonLink !== "none") && (
                <ScrollButtonLink 
                    text={buttonText}
                    url={buttonLink}
                    style={buttonStyle}
                />
            )}
        </div>
    );
};
