import React from "react";
import Link from "next/link"
import { useAuth } from '@/app/authState';

export function NavButtons() {
    const { user, loading } = useAuth();

    return (
        <div className="flex flex-row w-full justify-between">
            <div className="flex flex-row md:gap-10">
                <Link href={'/'} className="group px-6 py-3 border-2 border-entourage-black dark:border-entourage-blue rounded-full bg-transparent text-entourage-orange hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                    <span>For Clubs</span>
                </Link>
                <Link href={'/'} className="group px-6 py-3 border-2 border-entourage-black dark:border-entourage-blue rounded-full bg-transparent text-entourage-orange hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                    <span>For Brands</span>
                </Link>
            </div>
            {!user && (
                <Link href={'/login'} className="group px-6 py-3 border-2 border-entourage-black dark:border-entourage-blue rounded-full bg-transparent text-entourage-orange hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                    <span>Sign In</span>
                </Link>
            )}
            {user && (
                <Link href={'/dashboard'} className="group px-6 py-3 border-2 border-entourage-black dark:border-entourage-blue rounded-full bg-transparent text-entourage-orange hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                    <span>Dashboard</span>
                </Link>
            )}
        </div>
    )
}