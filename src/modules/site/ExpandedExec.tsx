import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import EditableText from './editable-text';
import { ExecBlock, Fonts, Colors } from '@/../utils/types/layoutTypes';
import { fontMap, FontName } from '../../../utils/site/fontMap';
import EditableExecInfo from './editable-exec-info';
import Link from 'next/link';

interface ExpandedExecTypes {
    title: string;
    execBlock: ExecBlock[];
    fonts: Fonts;
    colors: Colors;
    updateConfig: (newProps: any) => void;
    setShowExpandedPage: React.Dispatch<React.SetStateAction<string>>;
}

export default function ExpandedExec({ title, execBlock, fonts, colors, updateConfig, setShowExpandedPage }: ExpandedExecTypes) {
    const [selectedExec, setSelectedExec] = useState<ExecBlock | null>(null);
    const [selectedExecIndex, setSelectedExecIndex] = useState<number | null>(null);
    const [showExecCard, setShowExecCard] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
        execBlock: {
            backgroundColor: colors.primary,
            color: colors.background,
        },
        button: {
            borderColor: colors.accent,
            color: colors.text,
        },
        overlay: {
            backgroundColor: `${colors.background}CC`, // CC for 80% opacity
        },
        card: {
            backgroundColor: colors.background,
            color: colors.text,
            // boxShadow: `0 4px 6px ${colors.accent}`,
        },
    };

    const handleExecClick = (exec: ExecBlock, index: number) => {
        setSelectedExec(exec);
        setSelectedExecIndex(index);
        setShowExecCard(true);
    };

    const updateExecBlock = (index: number, updates: Partial<ExecBlock>) => {
        const updatedExecBlock = execBlock.map((exec, i) => 
            i === index ? { ...exec, ...updates } : exec
        );
        updateConfig({ execBlock: updatedExecBlock });
    };

    const addNewExec = () => {
        const newExec: ExecBlock = {
            image: "none",
            name: "New Executive",
            role: "New Role",
            bio: "Add a quick bio here!",
            instaURL: "https://www.instagram.com/entourage.ai/",
        };
        const updatedExecBlock = [...execBlock, newExec];
        updateConfig({ execBlock: updatedExecBlock });
    };

    const removeExec = (indexToRemove: number) => {
        const updatedExecBlock = execBlock.filter((_, index) => index !== indexToRemove);
        updateConfig({ execBlock: updatedExecBlock });
        if (selectedExecIndex === indexToRemove) {
            setSelectedExec(null);
            setSelectedExecIndex(null);
        }
    };

    const onReturn = () => {
        setShowExpandedPage("");
    };

    const ExecCard = ({ exec, onClose, onUpdate }: { exec: ExecBlock, onClose: () => void, onUpdate: (updates: Partial<ExecBlock>) => void }) => (
        <div 
            className="fixed inset-0 w-screen h-screen z-50 bg-black/50"
            onClick={onClose}
        >
            <div className='w-full h-full flex justify-center items-center'>

                <div 
                    className="p-6 rounded-[15px] w-[250px] flex flex-col"
                    style={styles.card}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className='w-full flex justify-center'>
                        <div className="mb-4 relative w-[180px] h-[180px]">
                            <Image
                                src={exec.image !== "none" ? exec.image : "/image-plus.svg"}
                                alt={`${exec.name}'s profile`}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-[15px]"
                            />
                        </div>
                    </div>
                    <div className='flex w-full justify-center'>
                        {exec.name}
                    </div>
                    <div className='flex w-full justify-center'>
                        {exec.role}
                    </div>
                    <div className='flex w-full justify-center my-20'>
                        {exec.bio}
                    </div>
                    <div className='flex w-full justify-center'>
                        <Link href={exec.instaURL}>
                            <img src="./instagram.svg" alt="insta" height={20} width={20}/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`w-screen h-fit mx-auto px-4 py-8 ${textFont.className}`} style={styles.container}>
            <Button 
                className='absolute top-2 left-0 md:top-10 md:left-4 rounded-[15px] bg-transparent hover:bg-transparent hover:scale-105 transition-all border-[1px] mx-4' 
                style={styles.button} 
                onClick={onReturn}
            >
                ← Back
            </Button>
            <div className={`text-4xl font-bold text-center mb-6 mt-4 md:mt-0 ${titleFont.className}`} style={styles.title}>
                <EditableText
                    text={title}
                    onTextChange={(newText) => updateConfig({ title: newText })}
                />
            </div>
            <div className='px-10 md:px-20 md:ml-0 lg:ml-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {execBlock.map((exec, index) => (
                    <div key={index} className="relative">
                        <div 
                            className="rounded-[15px] p-4 flex flex-col items-center bg-transparent"
                        >
                            <div 
                                className={`rounded-[15px] border-[1px] ${hoveredIndex === index ? 'border-white' : 'border-transparent'} p-2 cursor-pointer`}
                                onClick={() => handleExecClick(exec, index)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {hoveredIndex === index && (
                                    <div 
                                        className='absolute top-2 right-12 hover:scale-105 flex justify-center items-center font-mono font-bold text-black w-5 h-5 rounded-full bg-red-600'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeExec(index);
                                        }}
                                    >
                                        x
                                    </div>
                                )}
                                <EditableExecInfo
                                    name={exec.name}
                                    role={exec.role}
                                    image={exec.image}
                                    bio={exec.bio}
                                    instaURL={exec.instaURL}
                                    titleFont={titleFont.className}
                                    onInfoChange={(updates) => updateExecBlock(index, updates)}
                                    setShowExecCard={setShowExecCard}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <div className="flex items-center justify-center">
                    <Button 
                        className="p-4 rounded-[15px] bg-transparent hover:bg-transparent hover:scale-105 transition-all border-[1px] mx-4"
                        style={styles.button}
                        onClick={addNewExec}
                    >
                        Add Exec
                    </Button>
                </div>
            </div>
            {(showExecCard && selectedExec) && (
                <ExecCard
                    exec={selectedExec}
                    onClose={() => setShowExecCard(false)}
                    onUpdate={(updates) => {
                        if (selectedExecIndex !== null) {
                            updateExecBlock(selectedExecIndex, updates);
                        }
                    }}
                />
            )}
        </div>
    );
};
