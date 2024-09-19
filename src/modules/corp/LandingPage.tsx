import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/authState';
import { useRouter } from 'next/navigation';
import { LandingPageCard } from './LandingPageCard';
import { LandingVisual } from './LandingVisual';
import { ThreeDLandingVisual } from './3dLandingCard';
import { Logo } from './Logo';
import { Navbar } from './Navbar';
import { NavButtons } from './NavButtons';
import { Footer } from './Footer';
import { Moon, Sun } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/moving-border";

export default function LandingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [isMd, setIsMd] = useState(false);
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const handleResize = () => {
          setIsMd(window.innerWidth < 768); // 768px is the Tailwind `md` breakpoint
        };
    
        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                <div className='mb-4 lg:mb-0 flex flex-row justify-between px-4 pt-4 md:px-6 md:pt-6'>
                    <Logo />
                    <div className='flex flex-row w-fit md:w-full items-center justify-between md:pl-24'>
                        {isMd ? <Navbar /> : <NavButtons />}
                        <button onClick={toggleDarkMode} className='mx-2 sm:mx-5'>
                            {isDark ? (
                                <Sun className="h-8 w-8 text-entourage-orange" />
                            ) : (
                                <Moon className="h-8 w-8 text-entourage-black" />
                            )}
                        </button>
                    </div>
                </div>

                <main className="flex flex-grow justify-center items-center px-4 sm:px-14 md:px-24 py-8 w-full mb-10">
                    <div className="flex flex-grow flex-col max-w-[70rem] max-h-fit md:flex-row items-center justify-between gap-10 md:gap-8">
                        <div className="flex flex-col max-w-[30rem] items-center md:items-start space-y-4 gap-5 md:space-y-6">
                            {/* <h1 className="text-6xl lg:text-7xl font-bold text-entourage-black dark:text-entourage-blue tracking-tighter">
                                entourage
                            </h1> */}
                            <p className="text-4xl md:text-5xl font-semibold text-center md:text-left">
                                <span className="text-entourage-black dark:text-entourage-blue">Build a </span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-entourage-black to-entourage-orange dark:bg-gradient-to-r dark:from-entourage-blue dark:to-entourage-orange">
                                    club website
                                </span>
                                <span className="text-entourage-black dark:text-entourage-blue"> in seconds</span>
                            </p>
                            <p className="text-md md:text-lg text-center md:text-left dark:text-entourage-orange">
                                Let our AI put all of your information in one place, get in touch with the right brands, and unlock time for what you’re best at. Running your club.
                            </p>
                            <div>
                                <Link href={'/questionnaire'}>
                                    <Button
                                        borderRadius="1.5rem"
                                        className="bg-entourage-orange text-entourage-black font-extrabold"
                                    >
                                        Launch Your Site
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className='w-full md:w-2/3 lg:w-1/2 flex justify-center max-h-fit'>
                            <ThreeDLandingVisual />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}