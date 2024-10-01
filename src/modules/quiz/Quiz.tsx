'use client'

import React, { FC, useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Logo } from '../corp/Logo'
import classNames from 'classnames';
import Link from 'next/link'
import { Progress } from "@/components/ui/progress"

interface Props {
    onSubmit: (data: { clubName: string; clubPurpose: string; clubVibe: string }) => void;
}

function NextBtn({ onClick }: any) {
    return(
        <button onClick={onClick} className="group px-4 py-2 border border-entourage-blue rounded-full bg-transparent text-white hover:border-entourage-orange hover:bg-primary/10 transition-colors duration-200 flex items-center space-x-2">
            <span>Next</span>
            <ArrowRight size={16} className='text-entourage-orange group-hover:text-entourage-blue' />
        </button>
    )
}

function BackBtn({ onClick }: any) {
    return(
        <button onClick={onClick} className="group px-4 py-2 border border-entourage-blue rounded-full bg-transparent text-white hover:border-entourage-orange hover:bg-primary/10 transition-colors duration-200 flex items-center space-x-2">
            <ArrowLeft size={16} className='text-entourage-orange group-hover:text-entourage-blue' />
            <span>Back</span>
        </button>
    )
}

const Quiz: FC<Props> = ({ onSubmit }) => {
    const [step, setStep] = useState<number>(1);
    const [clubName, setClubName] = useState<string>('');
    const [clubPurpose, setClubPurpose] = useState<string>('');
    const [clubVibe, setClubVibe] = useState<string>('');
    
    const [flashError, setFlashError] = useState<boolean>(false);

    const backClick = () => {
        setStep(step - 1);
    }

    const nextClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (step === 1 && clubName.trim() === "") {
            setFlashError(true);
            setTimeout(() => setFlashError(false), 2000);
            return;
        } else if (step === 2 && clubPurpose.trim() === "") {
            setFlashError(true);
            setTimeout(() => setFlashError(false), 2000);
            return;
        }
        
        setStep(step + 1);
    }

    const handleSelect = (e: React.MouseEvent<HTMLDivElement>, section: 'clubPurpose' | 'vibe') => {
        const value = (e.target as HTMLElement).getAttribute('data-value') || '';
        setFlashError(false);
    
        if (section === 'clubPurpose') {
          setClubPurpose(prev =>
            prev.includes(value)
              ? prev.replace(value, '').replace(/,,/g, ',').replace(/^,|,$/g, '')
              : prev ? `${prev},${value}` : value
          );
        }
      };

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!clubVibe.trim()) {
          setFlashError(true);
          setTimeout(() => setFlashError(false), 2000);
          return;
        }

        setStep(step + 1);
        onSubmit({ clubName, clubPurpose, clubVibe: clubVibe });
      };

      return (
        <div className='min-h-screen flex flex-col'>
            <div className='flex flex-grow flex-col relative bg-grid-small-white/[0.2] bg-entourage-black'>
                {/* Radial gradient overlay */}
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-entourage-black [mask-image:radial-gradient(ellipse_at_center,transparent_40%,rgba(33,33,33,1))]"></div>
                <div className='absolute top-0 left-0 p-4 md:p-6'>
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>
                <div className='absolute top-[15%] md:top-[10%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center'>
                    <Progress 
                        value={((step / 4) * 100)} 
                        className="w-[40%] bg-entourage-black border-[1px] border-entourage-blue [&>div]:bg-entourage-blue" 
                    />
                </div>
                <div className='flex flex-col flex-grow md:flex-grow-0 mt-44 md:mt-32'>
                    <form onSubmit={handleSubmit} className='text-white flex-grow flex mx-6 justify-center my-10'>
                        {step === 1 && (
                            <div className='flex flex-col justify-between px-4 py-8 md:p-6 lg:p-10 w-11/12 md:w-8/12 lg:w-7/12 h-[300px] md:h-80 lg:h-96 border-4 rounded-xl border-entourage-blue bg-entourage-black'>
                                <div className='text-3xl lg:text-4xl font-bold'>
                                    What&apos;s the name of your club?
                                </div>
                                <div className='my-8 flex items-center'>
                                    <textarea
                                        value={clubName}
                                        onChange={(e) => setClubName(e.target.value)}
                                        className={`w-full h-16 md:h-14 px-3 py-4 border-[1px] bg-transparent rounded-lg text-white text-xl resize-none duration-1000 ${flashError ? 'border-entourage-orange' : 'border-entourage-blue'} ${flashError ? 'animate-pulse' : ''}`}
                                        placeholder='Enter club name...'
                                    />
                                </div>
                                <div className='flex justify-center'>
                                    <NextBtn onClick={nextClick} />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className='flex flex-col justify-between px-4 py-8 md:p-8 lg:p-10 w-full md:w-9/12 lg:w-7/12 border-4 rounded-xl border-entourage-blue bg-entourage-black'>
                                <div className='text-3xl lg:text-4xl font-bold'>
                                    What should your website highlight?
                                </div>
                                <div className='my-8 flex items-center justify-center'>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:grid-cols-3">
                                        {['Memberships', 'Events', 'Trips', 'Parties', 'Culture', 'Executive Team'].map(option => (
                                            <div
                                                key={option}
                                                data-value={option}
                                                className={classNames(
                                                    'bg-none border-2 rounded-lg text-center cursor-pointer p-4 md:p-6 flex items-center justify-center min-h-[100px] md:min-h-[110px] text-xl md:text-2xl hover:scale-105 transition-all',
                                                    {
                                                        'border-entourage-blue': !flashError || clubPurpose.includes(option),
                                                        'bg-entourage-orange/30 animate-pulse': flashError,
                                                        'border-entourage-orange': clubPurpose.includes(option),
                                                    }
                                                )}
                                                onClick={(e: React.MouseEvent<HTMLDivElement>) => handleSelect(e, 'clubPurpose')}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <BackBtn onClick={backClick} />
                                    <NextBtn onClick={nextClick} />
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className='flex flex-col justify-between px-4 py-8 md:p-6 lg:p-10 w-11/12 md:w-8/12 lg:w-7/12 h-[400px] md:h-[450px] border-4 rounded-xl border-entourage-blue bg-entourage-black'>
                                <div className='text-3xl lg:text-4xl font-bold'>
                                    Tell us about the Club!
                                </div>
                                <div className='my-8 flex items-center'>
                                    <textarea
                                        value={clubVibe}
                                        onChange={(e) => setClubVibe(e.target.value)}
                                        className={`w-full h-36 md:h-44 px-3 py-4 border-[1px] bg-transparent rounded-lg text-white text-xl resize-none duration-1000 ${flashError ? 'border-entourage-orange' : 'border-entourage-blue'} ${flashError ? 'animate-pulse' : ''}`}
                                        placeholder='In a sentence or two, describe the club and tell us why we should join!'
                                    />
                                </div>
                                <div className='flex justify-between'>
                                    <BackBtn onClick={backClick} />
                                    <button type='submit' className="group px-4 py-2 border border-entourage-blue rounded-full bg-transparent text-white hover:border-entourage-orange hover:bg-primary/10 transition-colors duration-200 flex items-center space-x-2">
                                        <span>Generate Site</span>
                                        <ArrowRight size={16} className='text-entourage-orange group-hover:text-entourage-blue' />
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Quiz;
