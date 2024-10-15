import React, { useState } from 'react';
import EditableText from './editable-text';
import EditableDate from './editable-date';
import { fontMap, FontName } from '../../../utils/site/fontMap';
import { reduceOpacity } from "../../../utils/site/reduceOpacity";
import Image from 'next/image';
import ExpandableButton from './ExpandableButton';
import { Button } from '@/components/ui/button';

interface EventTime {
    start: string;
    end?: string;
}

interface EventBlockItem {
    eventTitle: string;
    eventDate: Date;
    eventTime: EventTime;
    eventCost: string;
    eventDescription: string;
    eventLocation: string;
}

interface ExpandedEventProps {
    title: string;
    eventBlock: EventBlockItem[];
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

export default function ExpandedEvents({ title, eventBlock, updateConfig, colors, fonts, setShowExpandedPage }: ExpandedEventProps) {
    const [selectedEvent, setSelectedEvent] = useState<EventBlockItem | null>(null);
    const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);

    const titleFont = fontMap[fonts.title as FontName];
    const textFont = fontMap[fonts.text as FontName];

    //console.log(eventBlock)

    const styles = {
        container: {
            backgroundColor: colors.background,
        },
        title: {
            color: colors.primary,
        },
        eventBlock: {
            backgroundColor: reduceOpacity(colors.primary, 0.1),
            borderColor: colors.accent,
        },
        eventTitle: {
            color: colors.primary,
        },
        eventDetails: {
            color: colors.text,
        },
        button: {
            borderColor: colors.accent,
            color: colors.text,
        }
    };

    const updateEventBlock = (index: number, newProps: Partial<EventBlockItem>) => {
        const updatedEventBlock = [...eventBlock];
        updatedEventBlock[index] = { ...updatedEventBlock[index], ...newProps };
        updateConfig({ eventBlock: updatedEventBlock });
        // Add this line to update the selectedEvent state
        setSelectedEvent(updatedEventBlock[index]);
    };

    const handleEventClick = (event: EventBlockItem) => {
        if (selectedEvent === event) {
            setSelectedEvent(null);
            setSelectedEventIndex(null);
        } else {
            setSelectedEvent(event);
            setSelectedEventIndex(eventBlock.findIndex(e => e === event));
        }
    };

    const addNewEvent = () => {
        const newEvent: EventBlockItem = {
            eventTitle: "New Event",
            eventDate: new Date(),
            eventTime: { start: "12:00 PM" },
            eventCost: "Free",
            eventDescription: "Enter event description here",
            eventLocation: "Enter location here"
        };
        const updatedEventBlock = [...eventBlock, newEvent];
        updateConfig({ eventBlock: updatedEventBlock });
    };

    const removeEvent = (indexToRemove: number) => {
        const updatedEventBlock = eventBlock.filter((_, index) => index !== indexToRemove);
        updateConfig({ eventBlock: updatedEventBlock });
        if (selectedEventIndex === indexToRemove) {
            setSelectedEvent(null);
            setSelectedEventIndex(null);
        }
    };

    const onReturn = () => {
        setShowExpandedPage("")
    }

    const formatDate = (date: Date | string): string => {
        const dateObject = date instanceof Date ? date : new Date(date);
        if (isNaN(dateObject.getTime())) {
            return 'Invalid Date';
        }
        return dateObject.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className={`w-screen h-fit mx-auto px-4 py-8 ${textFont.className}`} style={styles.container}>
            <Button className='absolute top-2 left-0 md:top-10 md:left-4 rounded-[15px] bg-transparent hover:bg-transparent hover:scale-105 transition-all border-[1px] mx-4' 
                style={styles.button} onClick={onReturn}>
                    ← Back
            </Button>
            <div className={`text-4xl font-bold text-center mb-6 mt-4 md:mt-2 ${titleFont.className}`} style={styles.title}>
                <EditableText
                    text={title}
                    onTextChange={(newText) => updateConfig({ title: newText })}
                />
            </div>
            <div className='px-10 md:px-20 md:ml-0 lg:ml-20'>
                <div className="flex flex-col gap-10 w-full md:w-5/12 h-full">
                    {eventBlock.map((event, index) => (
                        <div key={index} className="relative">
                            <div 
                                className="rounded-lg p-4 border flex flex-row justify-between" 
                                style={styles.eventBlock}
                            >
                                <div className={`flex flex-col ${(selectedEvent && selectedEventIndex == index) && 'md:flex hidden'}`}>
                                    <h2 className={`text-xl font-semibold mb-2 ${titleFont.className}`} style={styles.eventTitle}>
                                    <EditableText
                                        text={event.eventTitle}
                                        onTextChange={(newText) => updateEventBlock(index, { eventTitle: newText })}
                                    />
                                    </h2>
                                    <div style={styles.eventDetails} className='flex flex-col'>
                                        <EditableDate
                                            value={event.eventDate}
                                            onChange={(newDate) => updateEventBlock(index, { eventDate: newDate })}
                                        />
                                        <div className='flex flex-row'>
                                            <Image src="./clock.svg" alt="preview" width={20} height={20} className='ml-2'/>
                                            <EditableText
                                                text={event.eventTime.start}
                                                onTextChange={(newText) => updateEventBlock(index, { eventTime: { ...event.eventTime, start: newText } })}
                                            />
                                            {event.eventTime.end && (
                                                <div className='flex flex-row'>
                                                    <p className='relative top-2'>
                                                        - 
                                                    </p>
                                                    <EditableText
                                                        text={event.eventTime.end}
                                                        onTextChange={(newText) => updateEventBlock(index, { eventTime: { ...event.eventTime, end: newText } })}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className='pl-2 flex flex-row'>
                                            <Image src="./map-pin.svg" alt="preview" width={20} height={20}/>
                                            <EditableText
                                                text={event.eventLocation}
                                                onTextChange={(newText) => updateEventBlock(index, { eventLocation: newText })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Display selected event details below on small screens */}
                                {selectedEvent === event && (
                                    <div className="md:hidden mt-4" style={styles.eventDetails}>
                                        {renderSelectedEventDetails(event, index, updateEventBlock)}
                                    </div>
                                )}
                                <div className='flex justify-center items-center'>
                                    <ExpandableButton
                                        isExpanded={selectedEvent === event}
                                        onClick={() => handleEventClick(event)}
                                    />
                                </div>
                                <button
                                    className="absolute hover:scale-105 transition-all top-24 -right-8 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                                    onClick={() => removeEvent(index)}
                                >
                                    <span className="text-black font-bold">-</span>
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className='flex w-full justify-center'>
                        <button 
                            className="px-4 py-2 w-fit bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            onClick={addNewEvent}
                        >
                            Add Event
                        </button>
                    </div>
                </div>
                <div className='hidden md:flex flex-col w-5/12 h-full justify-center fixed top-10 right-0 p-4' style={{...styles.eventDetails, maxHeight: '100vh', overflowY: 'auto'}}>
                    {selectedEvent ? renderSelectedEventDetails(selectedEvent, selectedEventIndex!, updateEventBlock) : (
                        <p>Select an event to view details</p>
                    )}
                </div>
            </div>
        </div>
    );

    function renderSelectedEventDetails(event: EventBlockItem, index: number, updateEventBlock: (index: number, updatedFields: Partial<EventBlockItem>) => void) {
        return (
            <>
                <h2 className={`px-2 text-2xl font-semibold mb-4 ${titleFont.className}`} style={styles.eventTitle}>
                    {event.eventTitle}
                </h2>
                <div
                    className="flex flex-row p-2"
                >
                    <Image src="./calendar.svg" alt="preview" width={20} height={20} className='mr-2'/>
                    <span className="editable-date__display">{formatDate(event.eventDate)}</span>
                </div>
                <div className='flex flex-row'>
                    <Image src="./clock.svg" alt="preview" width={20} height={20} className='ml-2'/>
                    <EditableText
                        text={event.eventTime.start}
                        onTextChange={(newText) => updateEventBlock(index, { eventTime: { ...event.eventTime, start: newText } })}
                    />
                    {event.eventTime.end && (
                        <div className='flex flex-row'>
                            <p className='relative top-2'>
                                - 
                            </p>
                            <EditableText
                                text={event.eventTime.end}
                                onTextChange={(newText) => updateEventBlock(index, { eventTime: { ...event.eventTime, end: newText } })}
                            />
                        </div>
                    )}
                </div>
                <div className='flex flex-row'>
                    <Image src="./map-pin.svg" alt="preview" width={20} height={20} className='ml-2'/>
                    <EditableText
                        text={event.eventLocation}
                        onTextChange={(newText) => updateEventBlock(index, { eventLocation: newText })}
                    />
                </div>
                <div className='flex flex-row'>
                    <Image src="./dollar-sign.svg" alt="preview" width={20} height={20} className='ml-2'/>
                    <EditableText
                        text={event.eventCost}
                        onTextChange={(newText) => updateEventBlock(index, { eventCost: newText })}
                    />
                </div>
                <div className='flex flex-col mt-4'>
                    <div className='flex items-center mx-2'>
                        Details: 
                    </div>
                    <EditableText
                        text={event.eventDescription}
                        onTextChange={(newText) => updateEventBlock(index, { eventDescription: newText })}
                    />
                </div>
            </>
        );
    }
}
