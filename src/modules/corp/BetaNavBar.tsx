import React from "react";
import Link from "next/link"
import { useAuth } from '@/app/authState';

export function BetaNav() {
    const { user } = useAuth();

    return (
        <div className="flex flex-row w-full justify-between">
            {!user && (
                <Link href="/login" className="px-6 py-3 border-2 border-entourage-black dark:border-entourage-blue rounded-full bg-transparent text-entourage-orange hover:scale-105 hover:z-10 transition-transform duration-200">
                    <span>Sign In</span>
                </Link>
            )}
            {user && (
                <Link href="/dashboard" className="px-6 py-3 border-2 border-entourage-black dark:border-entourage-blue rounded-full bg-transparent text-entourage-orange hover:scale-105 hover:z-10 transition-transform duration-200">
                    <span>Dashboard</span>
                </Link>
            )}
        </div>
    );
}
