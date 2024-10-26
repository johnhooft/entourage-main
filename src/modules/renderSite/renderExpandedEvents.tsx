import React, { useState, useEffect } from 'react';
import { fontMap, FontName } from '../../../utils/site/fontMap';
import { reduceOpacity } from "../../../utils/site/reduceOpacity";
import ExpandableButton from '../site/ExpandableButton';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, DollarSign, ChevronDown, ChevronUp, AlignLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import { ScrollButtonLink } from '../site/editable-button-link';

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
    buttonText?: string;
    buttonUrl?: string;
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
            backgroundColor: colors.accent,
            borderColor: colors.accent,
            borderRadius: '20px',
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
        <div className="rounded-[20px] p-6 border" style={{...styles.eventBlock, maxWidth: '400px', width: '100%'}}>
            <h2 className={`flex w-full justify-center text-2xl font-semibold mb-8 ${titleFont.className}`} style={styles.eventTitle}>
                {event.eventTitle}
            </h2>
            <div className="space-y-6 text-sm" style={styles.eventDetails}>
                <div className="flex items-center">
                    <div className="w-6 mr-4 flex justify-center">
                        <Calendar size={16} color={colors.text} />
                    </div>
                    <span>{formatDate(event.eventDate)}</span>
                </div>
                <div className="flex items-center">
                    <div className="w-6 mr-4 flex justify-center">
                        <Clock size={16} color={colors.text} />
                    </div>
                    <span>{event.eventTime.start}</span>
                    {event.eventTime.end && (
                        <>
                            <span className="mx-1">-</span>
                            <span>{event.eventTime.end}</span>
                        </>
                    )}
                </div>
                <div className="flex items-center">
                    <div className="w-6 mr-4 flex justify-center">
                        <MapPin size={16} color={colors.text} />
                    </div>
                    <span>{event.eventLocation}</span>
                </div>
                <div className="flex items-center">
                    <div className="w-6 mr-4 flex justify-center">
                        <DollarSign size={16} color={colors.text} />
                    </div>
                    <span>{event.eventCost}</span>
                </div>
                <div className="flex items-start">
                    <div className="w-6 mr-4 flex justify-center pt-1">
                        <AlignLeft size={16} color={colors.text} />
                    </div>
                    <span>{event.eventDescription}</span>
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <ScrollButtonLink
                    initialText={event.buttonText || "Learn More"}
                    initialUrl={event.buttonUrl || "#"}
                    style={{
                        color: colors.text,
                        backgroundColor: colors.accent,
                        padding: '0.5rem 1rem',
                    }}
                    textStyle={{
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem',
                    }}
                    onUpdate={() => {}} // This is a read-only version, so we don't need to update
                />
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
                                className="rounded-[20px] p-4 border flex flex-col md:flex-row justify-between" 
                                style={styles.eventBlock}
                            >
                                <div className={`flex flex-col ${(selectedEvent && selectedEventIndex == index) && 'md:flex hidden'}`}>
                                    <h2 className={`text-xl font-semibold mb-4 md:mb-2 text-center md:text-left ${titleFont.className}`} style={styles.eventTitle}>
                                        {event.eventTitle}
                                    </h2>
                                    <div style={styles.eventDetails} className='flex flex-col text-sm'>
                                        <div className='flex flex-col md:flex-row md:flex-wrap items-center justify-center md:justify-start'>
                                            <div className='flex items-center mb-2 md:mb-0 md:mr-4'>
                                                <Calendar size={16} className='mr-2' color={colors.text} />
                                                <span>{formatDate(event.eventDate)}</span>
                                            </div>
                                            <div className='flex items-center mb-2 md:mb-0 md:mr-4'>
                                                <Clock size={16} className='mr-2' color={colors.text} />
                                                <span>{event.eventTime.start}</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <MapPin size={16} className='mr-2' color={colors.text} />
                                                <span>{event.eventLocation}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {selectedEvent === event && (
                                    <div className="md:hidden mt-4" style={styles.eventDetails}>
                                        {renderEventDetails(event)}
                                    </div>
                                )}
                                <div className='flex justify-center items-center mt-6 md:mt-0'>
                                    <button
                                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                                        style={{
                                            backgroundColor: colors.primary,
                                            color: colors.background,
                                        }}
                                        onClick={() => handleEventClick(event)}
                                    >
                                        <ChevronRight className={`w-4 h-4 hidden md:block ${selectedEvent === event ? 'transform rotate-180' : ''}`} />
                                        <ChevronDown className={`w-4 h-4 md:hidden ${selectedEvent === event ? 'transform rotate-180' : ''}`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='hidden md:flex flex-col w-1/2 lg:w-6/12 h-full justify-center items-center fixed top-0 bottom-0 right-0 p-4 pl-8 overflow-y-auto pt-20'>
                    {selectedEvent ? (
                        renderEventDetails(selectedEvent)
                    ) : (
                        <div className="rounded-[20px] p-6 border" style={styles.eventBlock}>
                            <p style={styles.eventDetails}>Select an event to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
