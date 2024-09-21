import React, { useEffect } from 'react';
import { useAuth } from '@/app/authState';
import { useRouter } from 'next/navigation';
import { LandingPageCard } from './LandingPageCard';
import { Logo } from './Logo';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [isDark, setIsDark] = React.useState(false);

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
    const handleGenerateClick = () => {
        router.push('/questionnaire');
    };

    return (
        <div>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#77BDD9] to-[#ACD1F2] dark:bg-entourage-black dark:from-entourage-black dark:to-entourage-black">
                <div className='mb-4 lg:mb-0 flex flex-row justify-between px-4 pt-4 md:px-6 md:pt-6'>
                    <Logo />
                    <div className='flex flex-row items-center'>
                        <Navbar />
                        <button onClick={toggleDarkMode} className='mx-5'>
                            {isDark ? (
                                <Sun className="h-8 w-8" />
                            ) : (
                                <Moon className="h-8 w-8" />
                            )}
                        </button>
                    </div>
                </div>

                <main className="flex-grow container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-20 xl:gap-32">
                        <div className="flex flex-col items-center md:items-start space-y-4 gap-5 md:space-y-6 w-full lg:w-1/2 max-w-xl">
                            <h1 className="text-6xl lg:text-7xl font-bold text-entourage-black dark:text-entourage-blue tracking-tighter">
                                entourage
                            </h1>
                            <p className="text-5xl lg:text-6xl font-semibold text-entourage-orange dark:text-entourage-blue text-center md:text-left">
                                Club sites in seconds
                            </p>
                            <p className="text-xl md:text-2xl text-center md:text-left dark:text-entourage-orange">
                                Bring your members into the know, get noticed by brands, and unlock time for what matters most. Creating community.
                            </p>
                            <button 
                                //onClick={handleGenerateClick} 
                                className="max-w-52 sm:w-auto inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#FF5E1C,45%,#ff9d75,55%,#FF5E1C)] bg-[length:200%_100%] px-6 font-medium text-[#ACD1F2] transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                                Beta coming soon
                            </button>
                        </div>
                        <div className='w-full lg:w-1/2 flex items-center justify-center rounded-3xl scale-95'>
                            <LandingPageCard />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}