import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/authState';
import { useRouter } from 'next/navigation';
import { ThreeDLandingVisual } from './3dLandingCard';
import { Logo } from './Logo';
import { BetaNav } from './BetaNavBar';
import { BetaFooter } from './BetaFooter';
import { Navbar } from './Navbar';
import { NavButtons } from './NavButtons';
import { Footer } from './Footer';
import { Moon, Sun } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/moving-border";

export default function LandingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [isDark, setIsDark] = useState(true);

    // Apply the dark mode class to the root <html> element
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleDarkMode = () => {
        setIsDark(!isDark);
    };

    return (
        <div>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#77BDD9] to-[#ACD1F2] dark:bg-entourage-black dark:from-entourage-black dark:to-entourage-black">
                <div className='flex flex-row justify-between px-4 pt-4 md:px-6 md:pt-6'>
                    <Logo />
                    <div className='flex flex-row w-fit md:w-full items-center justify-between md:pl-24'>
                        <BetaNav />
                        {/* mobile optimized multiple button navbar: {isMd ? <Navbar /> : <NavButtons />} */}
                        <button onClick={toggleDarkMode} className='mx-2 sm:mx-5'>
                            {isDark ? (
                                <Sun className="h-8 w-8 text-entourage-orange" />
                            ) : (
                                <Moon className="h-8 w-8 text-entourage-black" />
                            )}
                        </button>
                    </div>
                </div>

                <main className="flex flex-grow justify-center items-center px-4 sm:px-14 md:px-24 py-2 w-full">
                    <div className="scale-95 flex flex-grow flex-col max-w-[70rem] max-h-fit md:flex-row items-center justify-between gap-10 md:gap-8">
                        <div className="flex flex-col max-w-[30rem] items-center md:items-start space-y-4 gap-5 md:space-y-6">
                            <p className="text-4xl md:text-5xl font-semibold text-center md:text-left">
                                <span className="text-entourage-black dark:text-entourage-blue">Welcome to the entourage </span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-entourage-black to-entourage-orange dark:bg-gradient-to-r dark:from-entourage-blue dark:to-entourage-orange">
                                    beta
                                </span>
                                <span className="text-entourage-black dark:text-entourage-blue"> ! </span>
                            </p>
                            <p className="text-md md:text-lg text-center md:text-left dark:text-entourage-orange">
                                Here you can generate your club a website by answering a couple of prompts, customize it, and go live on your own subdomain. Completely free.
                                <br /><br />
                                Hit the launch button below to get started.
                            </p>
                            <div>
                                <Link href={'/questionnaire'}>
                                    <Button
                                        borderRadius="1.5rem"
                                        className="bg-entourage-orange text-entourage-black font-extrabold"
                                    >
                                        Lets Launch
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className='w-full md:w-2/3 lg:w-1/2 flex justify-center max-h-fit'>
                            <ThreeDLandingVisual />
                        </div>
                    </div>
                </main>
                <div className='mb-4'>
                    <BetaFooter />
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    );
}
