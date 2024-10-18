import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ExecBlock, Fonts, Colors } from '@/../utils/types/layoutTypes';
import { fontMap, FontName } from '../../../utils/site/fontMap';
import Link from 'next/link';

interface RenderExpandedExecProps {
    title: string;
    execBlock: ExecBlock[];
    fonts: Fonts;
    colors: Colors;
    setShowExpandedPage: React.Dispatch<React.SetStateAction<string>>;
}

export default function ExpandedExec({ title, execBlock, fonts, colors, setShowExpandedPage }: RenderExpandedExecProps) {
    const [selectedExec, setSelectedExec] = useState<ExecBlock | null>(null);
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
        },
    };

    const handleExecClick = (exec: ExecBlock) => {
        setSelectedExec(exec);
        setShowExecCard(true);
    };

    const onReturn = () => {
        setShowExpandedPage("");
    };

    const ExecCard = ({ exec, onClose }: { exec: ExecBlock, onClose: () => void }) => (
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
                            <Image src="/instagram.svg" alt="Instagram" width={20} height={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`w-screen h-fit mx-auto p-8 relative ${textFont.className}`} style={styles.container}>
            <Button 
                className='absolute top-2 left-0 md:top-10 md:left-4 rounded-[15px] bg-transparent hover:bg-transparent hover:scale-105 transition-all border-[1px] mx-4' 
                style={styles.button} 
                onClick={onReturn}
            >
                ← Back
            </Button>
            <div className={`text-4xl font-bold text-center mb-6 mt-4 md:mt-0 ${titleFont.className}`} style={styles.title}>
                {title}
            </div>
            <div className='px-10 md:px-20 md:ml-0 lg:ml-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {execBlock.map((exec, index) => (
                    <div key={index} className="relative">
                        <div 
                            className="rounded-[15px] p-4 flex flex-col items-center bg-transparent"
                        >
                            <div 
                                className={`rounded-[15px] border-[1px] ${hoveredIndex === index ? 'border-white' : 'border-transparent'} p-2 cursor-pointer`}
                                onClick={() => handleExecClick(exec)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="relative w-[180px] h-[180px] mb-4">
                                    <Image
                                        src={exec.image !== "none" ? exec.image : "/image-plus.svg"}
                                        alt={`${exec.name}'s profile`}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-[15px]"
                                    />
                                </div>
                                <div className={`text-center ${titleFont.className}`}>
                                    {exec.name}
                                </div>
                                <div className="text-center">
                                    {exec.role}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {(showExecCard && selectedExec) && (
                <ExecCard
                    exec={selectedExec}
                    onClose={() => setShowExecCard(false)}
                />
            )}
        </div>
    );
};