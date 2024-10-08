'use client'
//Dashboard
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AuthProvider } from '@/app/authState';
import Dashboard from '@/modules/dashboard/Dashboard';
import { Logo } from '@/modules/corp/Logo'

export default function Home() {

    return (
        <AuthProvider>
            <div className='flex flex-row'>
                <div className='flex flex-col w-screen h-screen'>
                    <div className='px-4 pt-4 md:px-6 md:pt-6 max-w-fit'>
                        <Link href="/">
                            <Logo />
                        </Link>
                    </div>
                    <div className='w-full h-full m-4'>
                        <Dashboard />
                    </div>
                </div>
            </div>
        </AuthProvider>
    );
}
