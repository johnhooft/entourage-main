'use client'
//Dashboard
import React, { useEffect } from 'react';
import Link from 'next/link';
import { AuthProvider } from '@/app/authState';
import Dashboard from '@/modules/dashboard/Dashboard';
import { Logo } from '@/modules/corp/Logo'

export default function Home() {

    return (
        <AuthProvider>
            <div className='px-4 pt-4 md:px-6 md:pt-6'>
                <Link href="/">
                    <Logo />
                </Link>
            </div>
            <div className='text-white m-5'>
                <Dashboard />
            </div>
        </AuthProvider>
    );
}
