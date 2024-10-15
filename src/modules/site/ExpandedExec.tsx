import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import EditableText from './editable-text';
import { ExecBlock, Fonts, Colors } from '@/../utils/types/layoutTypes';
import { fontMap, FontName } from '../../../utils/site/fontMap';
import EditableImage from './editable-image';

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
        }
    };

    const handleExecClick = (exec: ExecBlock, index: number) => {
        if (selectedExec === exec) {
            setSelectedExec(null);
            setSelectedExecIndex(null);
        } else {
            setSelectedExec(exec);
            setSelectedExecIndex(index);
        }
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
                            className="rounded-[15px] p-4 flex flex-col items-center cursor-pointer"
                            style={styles.execBlock}
                            // onClick={() => handleExecClick(exec, index)}
                        >
                            <div className="w-40 h-40 rounded-[15px] overflow-hidden mb-2">
                                <EditableImage 
                                    src={exec.image} 
                                    alt={"Executive image"}
                                    width={160} 
                                    height={160} 
                                    className="object-cover"
                                    id={`exec-image-${index}`}
                                    onImageUpdate={(newImageUrl) => {
                                        // Update the exec's image in your state or database
                                        // For example:
                                        // updateExec(exec.id, { image: newImageUrl });
                                    }}
                                />
                            </div>
                            <div className={`text-xl font-semibold mb-2 ${titleFont.className}`}>
                                <EditableText
                                    text={exec.name}
                                    onTextChange={(newText) => updateExecBlock(index, { name: newText })}
                                />
                            </div>
                            <div>
                                <EditableText
                                    text={exec.role}
                                    onTextChange={(newText) => updateExecBlock(index, { role: newText })}
                                />
                            </div>
                            {selectedExec === exec && (
                                <Button 
                                    className="mt-4 bg-red-500 hover:bg-red-600 text-white"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeExec(index);
                                    }}
                                >
                                    Remove
                                </Button>
                            )}
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
        </div>
    );
};
