'use client'

import { fontMap, FontName } from '../../../utils/site/fontMap';
import { reduceOpacity } from "../../../utils/site/reduceOpacity";
import { Button } from '@/components/ui/button';

interface TripBlock {
  tripTitle: string;
  tripDescription: string;
  tripLocation: string;
}

interface RenderExpandedTripProps {
  title: string;
  description: string;
  tripBlock: TripBlock[];
  colors: {
    primary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    title: string;
    text: string;
  };
  setShowExpandedPage: React.Dispatch<React.SetStateAction<string>>;
}

export default function ExpandedTrips({ title, description, tripBlock, colors, fonts, setShowExpandedPage }: RenderExpandedTripProps) {
    const titleFont = fontMap[fonts.title as FontName]
    const textFont = fontMap[fonts.text as FontName]

    //console.log(description)

    const styles = {
        container: {
            backgroundColor: colors.background,
        },
        title: {
            color: colors.primary,
        },
        description: {
            color: colors.text,
            backgroundColor: reduceOpacity(colors.primary, 0.1),
            borderRadius: "0.5rem",
            borderColor: colors.accent,
            borderWidth: "1px",
            whiteSpace: "pre-wrap",
        },
        tripBlock: {
            backgroundColor: colors.background,
            borderColor: colors.accent,
        },
        tripTitle: {
            color: colors.primary,
        },
        tripDescription: {
            color: colors.text,
        },
        tripLocation: {
            color: colors.text,
        },
        button: {
            backgroundColor: colors.accent
        }
    };

    const onReturn = () => {
        setShowExpandedPage("");
    }

    return (
        <div className={`w-screen h-fit mx-auto px-6 py-8 ${textFont.className}`} style={styles.container}>
            <Button className='absolute top-2 left-0 md:top-10 md:left-4 rounded-[15px] text-black hover:scale-105 transition-all mx-4' style={styles.button} onClick={onReturn}>← Back</Button>
            <div className={`text-4xl font-bold text-center mb-8 mt-4 md:mt-0 ${titleFont.className}`} style={styles.title}>
                {title}
            </div>
            <div className='flex w-full justify-center px-10 md:px-40'>
                <div className="rounded-lg p-8 mb-8" style={styles.description}>
                    <div>
                        {description}
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center px-10 md:px-40'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {tripBlock.map((block, index) => (
                        <div key={index} className="rounded-lg shadow-md overflow-hidden border relative" style={styles.tripBlock}>
                            <div className="p-6 flex flex-col gap-2">
                                <h2 className={`text-xl font-semibold mb-2 ${titleFont.className}`} style={styles.tripTitle}>
                                    {block.tripTitle}
                                </h2>
                                <div className="mb-2" style={styles.tripDescription}>
                                    {block.tripDescription}
                                </div>
                                <div className="text-sm" style={styles.tripLocation}>
                                    {block.tripLocation}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}