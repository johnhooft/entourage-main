'use client'
//Login
import Login from '../../modules/Login';
import { Logo } from '../../modules/corp/Logo'
import { Footer } from '../../modules/corp/Footer'
import { AuthProvider } from '@/app/authState';
import Link from 'next/link'
import React from 'react';

export default function Home() {
    return (
        <AuthProvider>
            <div className='w-screen h-screen flex flex-col justify-between'>
                <div className='px-4 pt-4 md:px-6 md:pt-6'>
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <div className='pt-5 md:pt-0'>
                        <Login />
                    </div>
                </div>
                <Footer />
            </div>
        </AuthProvider>
    );
}