'use client'
//Login
import Login from '../../modules/Login';
import SignIn from '@/modules/SignIn';
import { Logo } from '../../modules/corp/Logo'
import { Footer } from '../../modules/corp/Footer'
import { BetaFooter } from '@/modules/corp/BetaFooter';
import { AuthProvider } from '@/app/authState';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import React from 'react';

export default function Home() {

    const router = useRouter();

    return (
        <AuthProvider>
            <div className='w-screen h-screen flex flex-col justify-between'>
                <div className='px-4 pt-4 md:px-6 md:pt-6 max-w-fit'>
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <div className='pt-5 md:pt-0'>
                        <SignIn onSuccessfulSignIn={() => {router.push('./dashboard')}} />
                    </div>
                </div>
                <div className='mb-4'>
                    <BetaFooter />
                </div>
            </div>
        </AuthProvider>
    );
}