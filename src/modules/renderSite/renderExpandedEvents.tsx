import React, { useState, useEffect } from 'react';
import { fontMap, FontName } from '../../../utils/site/fontMap';
import { reduceOpacity } from "../../../utils/site/reduceOpacity";
import Image from 'next/image';
import ExpandableButton from '../site/ExpandableButton';
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

interface RenderExpandedEventsProps {
    title: string;
    eventBlock: EventBlockItem[];
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

export default function RenderExpandedEvents({ title, eventBlock, colors, fonts, setShowExpandedPage }: RenderExpandedEventsProps) {
    const [selectedEvent, setSelectedEvent] = useState<EventBlockItem | null>(null);
    const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);

    const titleFont = fontMap[fonts.title as FontName];
    const textFont = fontMap[fonts.text as FontName];

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
        },
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

    const renderEventDetails = (event: EventBlockItem) => (
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
            <div className='flex flex-row py-2'>
                <Image src="./clock.svg" alt="clock" width={20} height={20} className='mx-2'/>
                <span>{event.eventTime.start}</span>
                {event.eventTime.end && (
                    <span> - {event.eventTime.end}</span>
                )}
            </div>
            <div className='flex flex-row py-2'>
                <Image src="./map-pin.svg" alt="location" width={20} height={20} className='mx-2'/>
                <span>{event.eventLocation}</span>
            </div>
            <div className='flex flex-row py-2'>
                <Image src="./dollar-sign.svg" alt="cost" width={20} height={20} className='mx-2'/>
                <span>{event.eventCost}</span>
            </div>
            <div className='flex flex-col mt-4 px-2'>
                <div className='font-semibold'>Details:</div>
                <p>{event.eventDescription}</p>
            </div>
        </>
    );

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

    const onBack = () => {
        setShowExpandedPage("");
    };

    useEffect(() => {
        // Reset scroll position to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`w-full min-h-full max-h-fit mx-auto p-8 relative ${textFont.className}`} style={styles.container}>
            <Button 
                className='z-40 absolute top-2 left-0 md:top-10 md:left-4 rounded-[15px] bg-transparent hover:bg-transparent hover:scale-105 transition-all border-[1px] mx-4' 
                style={styles.button} 
                onClick={onBack}
            >
                ← Back
            </Button>
            <div className={`text-4xl font-bold text-center mb-14 mt-10 md:mt-0 ${titleFont.className}`} style={styles.title}>
                {title}
            </div>
            <div className='px-0 md:px-20 md:ml-0 lg:ml-20'>
                <div className="flex flex-col gap-10 w-full md:w-5/12 h-full">
                    {eventBlock.map((event, index) => (
                        <div key={index} className="relative">
                            <div 
                                className="rounded-lg p-4 border flex flex-row justify-between" 
                                style={styles.eventBlock}
                            >
                                <div className={`flex flex-col ${(selectedEvent && selectedEventIndex == index) && 'md:flex hidden'}`}>
                                    <h2 className={`px-2 text-xl font-semibold mb-2 ${titleFont.className}`} style={styles.eventTitle}>
                                        {event.eventTitle}
                                    </h2>
                                    <div style={styles.eventDetails} className='flex flex-col gap-2'>
                                        <div
                                            className="flex flex-row p-2"
                                        >
                                            <Image src="./calendar.svg" alt="preview" width={20} height={20} className='mr-2'/>
                                            <span className="editable-date__display">{formatDate(event.eventDate)}</span>
                                        </div>
                                        <div className='flex py-2 flex-row'>
                                            <Image src="./clock.svg" alt="clock" width={20} height={20} className='mx-2'/>
                                            <span>{event.eventTime.start}</span>
                                            {event.eventTime.end && (
                                                <span> - {event.eventTime.end}</span>
                                            )}
                                        </div>
                                        <div className='py-2 flex flex-row'>
                                            <Image src="./map-pin.svg" alt="location" width={20} height={20} className='mx-2'/>
                                            <span>{event.eventLocation}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Display selected event details below on small screens */}
                                {selectedEvent === event && (
                                    <div className="md:hidden mt-4" style={styles.eventDetails}>
                                        {renderEventDetails(event)}
                                    </div>
                                )}
                                <div className='flex justify-center items-center'>
                                    <ExpandableButton
                                        isExpanded={selectedEvent === event}
                                        onClick={() => handleEventClick(event)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='hidden md:flex flex-col w-5/12 h-full justify-center fixed top-0 right-0 p-4' style={{...styles.eventDetails, maxHeight: '100vh', overflowY: 'auto'}}>
                    {selectedEvent ? renderEventDetails(selectedEvent) : (
                        <p>Select an event to view details</p>
                    )}
                </div>
            </div>
        </div>
    );
}
