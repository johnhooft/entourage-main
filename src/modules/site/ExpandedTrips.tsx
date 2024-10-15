'use client'

import EditableText from './editable-text'
import EditableImage from './editable-image'
import { fontMap, FontName } from '../../../utils/site/fontMap';
import { reduceOpacity } from "../../../utils/site/reduceOpacity";
import { Button } from '@/components/ui/button';

interface TripBlock {
  tripTitle: string;
  tripDescription: string;
  tripLocation: string;
}

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
    }
  };

  const addTrip = () => {
    const newTrip: TripBlock = {
      tripTitle: "New Trip",
      tripDescription: "Description of the new trip",
      tripLocation: "Location of the new trip"
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

  return (
    <div className={`w-screen h-fit mx-auto px-4 py-8 ${textFont.className}`} style={styles.container}>
      <Button 
        className='absolute top-10 left-4 mx-4 rounded-[15px] bg-transparent hover:bg-transparent hover:scale-105 transition-all border-[1px]' 
        style={styles.button} 
        onClick={onReturn}
      >
          ← Back
      </Button>
      <div className={`text-4xl font-bold text-center mb-8 ${titleFont.className}`} style={styles.title}>
        <EditableText
          text={title}
          onTextChange={(newText) => updateConfig({ title: newText })}
        />
      </div>
      <div className='flex w-full justify-center px-10 md:px-40'>
        <div className="rounded-lg p-6 mb-8" style={styles.description}>
          <EditableText
            text={description}
            onTextChange={(newText) => updateConfig({ description: newText })}
          />
        </div>
      </div>
      <div className='w-full flex justify-center px-10 md:px-40'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {tripBlock.map((block, index) => (
            <div key={index} className="rounded-lg shadow-md overflow-hidden border relative" style={styles.tripBlock}>
              <button
                onClick={() => removeTrip(index)}
                className="absolute top-2 right-2 px-2 rounded-full text-white bg-gray-500 z-10"
              >
                x
              </button>
              <div className="p-4">
                <h2 className={`text-xl font-semibold mb-2 ${titleFont.className}`} style={styles.tripTitle}>
                  <EditableText
                    text={block.tripTitle}
                    onTextChange={(newText) => updateTripBlock(index, { tripTitle: newText })}
                  />
                </h2>
                <div className="mb-2" style={styles.tripDescription}>
                  <EditableText
                    text={block.tripDescription}
                    onTextChange={(newText) => updateTripBlock(index, { tripDescription: newText })}
                  />
                </div>
                <div className="text-sm" style={styles.tripLocation}>
                  <EditableText
                    text={block.tripLocation}
                    onTextChange={(newText) => updateTripBlock(index, { tripLocation: newText })}
                  />
                </div>
              </div>
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