'use client'
import React, { useState, useEffect } from 'react';
import { fontMap, FontName } from '../../../utils/site/fontMap';
import { reduceOpacity } from "../../../utils/site/reduceOpacity";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Calendar, DollarSign, MapPin } from 'lucide-react';

interface TripBlock {
  tripTitle: string;
  tripDescription: string;
  tripLocation: string;
  tripDates: string;
  tripImage: string;
  tripCost: string;
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
    const [selectedTrip, setSelectedTrip] = useState<TripBlock | null>(null);
    const [showTripCard, setShowTripCard] = useState(false);

    const titleFont = fontMap[fonts.title as FontName]
    const textFont = fontMap[fonts.text as FontName]

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
            borderColor: colors.accent,
            color: colors.text,
        },
        card: {
            backgroundColor: colors.background,
            color: colors.text,
        },
    };

    const onBack = () => {
        setShowExpandedPage("");
    }

    const handleTripClick = (trip: TripBlock) => {
        setSelectedTrip(trip);
        setShowTripCard(true);
    };

    useEffect(() => {
        // Reset scroll position to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    const TripCard = ({ trip, onClose }: { trip: TripBlock, onClose: () => void }) => (
        <div 
          className="fixed inset-0 w-screen h-screen z-50 bg-black/50"
          onClick={onClose}
        >
          <div className='w-full h-full flex justify-center items-center'>
            <div 
              className="p-6 rounded-[15px] w-[300px] flex flex-col border-[1px]"
              style={styles.card}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className={`flex w-full justify-center text-xl font-semibold mb-6 ${titleFont.className}`}>
                {trip.tripTitle}
              </h2>
              <div className="flex items-center mb-4">
                <Calendar size={20} color={colors.accent} className='mr-2' />
                {trip.tripDates}
              </div>
              <div className="flex items-center mb-4">
                <DollarSign size={20} color={colors.accent} className='mr-2' />
                {trip.tripCost}
              </div>
              <div className='flex items-center'>
                <MapPin size={20} color={colors.accent} className='mr-2' />
                {trip.tripLocation}
              </div>
              <div className='mt-8'>
                {trip.tripDescription}
              </div>
            </div>
          </div>
        </div>
    );

    return (
        <div className={`min-h-[93vh] flex flex-col items-center p-8 relative ${textFont.className}`} style={styles.container}>
            {showTripCard && (
                <div className='absolute top-0'>
                    <TripCard trip={selectedTrip!} onClose={() => setShowTripCard(false)} />
                </div>
            )}
            <Button 
                className='absolute top-2 left-0 md:top-10 md:left-4 rounded-[15px] bg-transparent hover:bg-transparent hover:scale-105 transition-all border-[1px] mx-4' 
                style={styles.button} 
                onClick={onBack}
            >
                ← Back
            </Button>
            <div className={`text-4xl font-bold text-center mb-6 mt-4 md:mt-2 ${titleFont.className}`} style={styles.title}>
                {title}
            </div>
            <div className='flex w-full justify-center px-0 md:px-40'>
                <div className="rounded-lg p-2 md:p-6 mb-8" style={styles.description}>
                    <div>
                        {description}
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center px-0 md:px-40'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {tripBlock.map((block, index) => (
                        <div key={index} className="rounded-lg shadow-md overflow-hidden border relative cursor-pointer" style={styles.tripBlock} onClick={() => handleTripClick(block)}>
                            <div className="md:p-4 p-3">
                                <div className="rounded-[15px] overflow-hidden">
                                    {block.tripImage === "none" ? (
                                        <div className="flex justify-center items-center">
                                            <Image 
                                                src="/image-plus.svg"
                                                alt="Add trip image"
                                                width={300}
                                                height={300}
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className='w-[300px] h-[300px] overflow-hidden relative'>
                                            <Image 
                                                src={block.tripImage} 
                                                alt="Trip image"
                                                fill
                                                sizes="300px"
                                                className="object-cover rounded-[15px]"
                                            />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black rounded-[15px] bg-opacity-50 text-white m-[12px] md:m-[16px]">
                                        <div className={`text-l font-semibold ${titleFont.className}`}>{block.tripTitle}</div>
                                        <div className="text-sm">{block.tripLocation}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
