'use client'

import EditableText from './editable-text'
import EditableImage from './editable-image'
import EditableTripInfo from './editable-trip-info';
import { TripBlock } from '../../../utils/types/layoutTypes';
import { fontMap, FontName } from '../../../utils/site/fontMap';
import { reduceOpacity } from "../../../utils/site/reduceOpacity";
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin, DollarSign } from 'lucide-react';

interface ExpandedTripProps {
  title: string;
  description: string;
  tripBlock: TripBlock[];
  updateConfig: (newProps: any) => void;
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

export default function ExpandedTrips({ title, description, tripBlock, updateConfig, colors, fonts, setShowExpandedPage }: ExpandedTripProps) {

  const [selectedTrip, setSelectedTrip] = useState<TripBlock | null>(null);
  const [selectedTripIndex, setSelectedTripIndex] = useState<number | null>(null);
  const [showTripCard, setShowTripCard] = useState(false);

  const updateTripBlock = (index: number, newProps: Partial<TripBlock>) => {
    const updatedTripBlock = [...tripBlock]
    updatedTripBlock[index] = { ...updatedTripBlock[index], ...newProps }
    updateConfig({ tripBlock: updatedTripBlock })
  }

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
    svg: {
      color: colors.text,
    },
  };

  const addTrip = () => {
    const newTrip: TripBlock = {
      tripTitle: "New Trip",
      tripDescription: "Description of the new trip",
      tripLocation: "Location of the new trip",
      tripDates: "Start - End",
      tripImage: "none",
      tripCost: "Free",
    };
    const updatedTripBlock = [...tripBlock, newTrip];
    updateConfig({ tripBlock: updatedTripBlock });
  };

  const removeTrip = (index: number) => {
    const updatedTripBlock = tripBlock.filter((_, i) => i !== index);
    updateConfig({ tripBlock: updatedTripBlock });
  };

  const onReturn = () => {
    setShowExpandedPage("");
  }

  const handleTripClick = (trip: TripBlock, index: number) => {
    setSelectedTrip(trip);
    setSelectedTripIndex(index);
    setShowTripCard(true);
  };

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
    <div className={`min-h-screen flex flex-col items-center p-8 relative ${textFont.className}`} style={styles.container}>
      {showTripCard && (
        <div className='absolute top-0'>
          <TripCard trip={selectedTrip!} onClose={ () => {setShowTripCard(false)} } />
        </div>
      )}
      <Button 
        className='absolute top-2 left-0 md:top-10 md:left-4 rounded-[15px] bg-transparent hover:bg-transparent hover:scale-105 transition-all border-[1px] mx-4' 
        style={styles.button} 
        onClick={onReturn}
      >
          ← Back
      </Button>
      <div className={`text-4xl font-bold text-center mb-6 mt-4 md:mt-2 ${titleFont.className}`} style={styles.title}>
        <EditableText
          text={title}
          onTextChange={(newText) => updateConfig({ title: newText })}
        />
      </div>
      <div className='flex w-full justify-center px-0 md:px-40'>
        <div className="rounded-lg p-2 md:p-6 mb-8" style={styles.description}>
          <EditableText
            text={description}
            onTextChange={(newText) => updateConfig({ description: newText })}
          />
        </div>
      </div>
      <div className='w-full flex justify-center px-0 md:px-40'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {tripBlock.map((block, index) => (
            <div key={index} className="rounded-lg shadow-md overflow-hidden border relative" style={styles.tripBlock}>
              <div className="md:p-4 p-3 cursor-pointer">
                <EditableTripInfo
                  tripTitle={block.tripTitle}
                  tripDescription={block.tripDescription}
                  tripLocation={block.tripLocation}
                  tripDates={block.tripDates}
                  tripImage={block.tripImage}
                  tripCost={block.tripCost}
                  titleFont={titleFont.className}
                  onInfoChange={(updates) => updateTripBlock(index, updates)}
                  onTripClick={() => handleTripClick(block, index)}
                />
              </div>
              <button
                onClick={() => removeTrip(index)}
                className="absolute top-2 right-2 px-2 rounded-full text-white bg-gray-500 z-10"
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={addTrip}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add New Trip
        </button>
      </div>
    </div>
  )
}
