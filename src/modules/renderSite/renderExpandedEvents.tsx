import React, { useState, useEffect } from 'react';
import { fontMap, FontName } from '../../../utils/site/fontMap';
import { reduceOpacity } from "../../../utils/site/reduceOpacity";
import ExpandableButton from '../site/ExpandableButton';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

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
        <div className="rounded-lg p-6 border" style={{...styles.eventBlock, maxWidth: '400px', width: '100%'}}>
            <h2 className={`w-full flex justify-center text-2xl font-semibold mb-8 ${titleFont.className}`} style={styles.eventTitle}>
                {event.eventTitle}
            </h2>
            <div className="space-y-3" style={styles.eventDetails}>
                <div className="flex items-center">
                    <Calendar size={20} className="mr-4" color={colors.text} />
                    <span>{formatDate(event.eventDate)}</span>
                </div>
                <div className="flex items-center pt-4">
                    <Clock size={20} className="mr-4" color={colors.text} />
                    <span>{event.eventTime.start}</span>
                    {event.eventTime.end && (
                        <>
                            <span className="mx-1">-</span>
                            <span>{event.eventTime.end}</span>
                        </>
                    )}
                </div>
                <div className="flex items-center pt-6">
                    <MapPin size={20} className="mr-4" color={colors.text} />
                    <span>{event.eventLocation}</span>
                </div>
                <div className="flex items-center pt-6">
                    <DollarSign size={20} className="mr-4" color={colors.text} />
                    <span>{event.eventCost}</span>
                </div>
                <div className='pt-8 pb-2'>
                    <div className='font-semibold mb-4'>Details:</div>
                    <p>{event.eventDescription}</p>
                </div>
            </div>
        </div>
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
            <div className='px-4 md:px-8 lg:px-12 flex flex-row'>
                <div className="flex flex-col gap-10 w-full md:w-1/2 lg:w-6/12 h-full mt-8">
                    {eventBlock.map((event, index) => (
                        <div key={index} className="relative">
                            <div 
                                className="rounded-lg p-4 border flex flex-col md:flex-row justify-between" 
                                style={styles.eventBlock}
                            >
                                <div className={`flex flex-col ${(selectedEvent && selectedEventIndex == index) && 'md:flex hidden'}`}>
                                    <h2 className={`px-2 text-xl font-semibold mb-6 text-center md:text-left ${titleFont.className}`} style={styles.eventTitle}>
                                        {event.eventTitle}
                                    </h2>
                                    <div style={styles.eventDetails} className='flex flex-col'>
                                        <div className="flex items-center mb-4">
                                            <Calendar size={20} className="mr-2" color={colors.text} />
                                            <span>{formatDate(event.eventDate)}</span>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <Clock size={20} className="mr-2" color={colors.text} />
                                            <span>{event.eventTime.start}</span>
                                            {event.eventTime.end && (
                                                <span> - {event.eventTime.end}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <MapPin size={20} className="mr-2" color={colors.text} />
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
                                <div className='flex justify-center items-center mt-4 md:mt-0'>
                                    <button
                                        className="md:hidden px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                                        style={{
                                            backgroundColor: colors.primary,
                                            color: colors.background,
                                        }}
                                        onClick={() => handleEventClick(event)}
                                    >
                                        {selectedEvent === event ? (
                                            <ChevronUp className="w-4 h-4" />
                                        ) : (
                                            'Details'
                                        )}
                                    </button>
                                    <div className="hidden md:block">
                                        <ExpandableButton
                                            isExpanded={selectedEvent === event}
                                            onClick={() => handleEventClick(event)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Update the details pop-up container */}
                <div className='hidden md:flex flex-col w-1/2 lg:w-6/12 h-full justify-center items-center fixed top-0 bottom-0 right-0 p-4 pl-8 overflow-y-auto pt-20'>
                    {selectedEvent ? (
                        renderEventDetails(selectedEvent)
                    ) : (
                        <div className="rounded-lg p-6 border" style={styles.eventBlock}>
                            <p style={styles.eventDetails}>Select an event to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
