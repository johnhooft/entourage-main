import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/authState';
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const SignIn: React.FC<{ onSuccessfulSignIn: () => void; redirect: string }> = ({ onSuccessfulSignIn, redirect }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const { user, loginWithGoogle } = useAuth();

    if (user) {
        onSuccessfulSignIn();
    }

    const validateEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const onGoogleSignIn = async () => {
        try {
            console.log(redirect)
            await loginWithGoogle(redirect);

        } catch (error: any) {
            console.error('Error during Google sign-in:', error);
            setError(error.message || 'An error occurred during Google sign-in');
        }
    };

    const onSignIn = async (e: any) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            console.log('Logged in successfully:', data);
            if (onSuccessfulSignIn) {
                onSuccessfulSignIn();
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'An error occurred during sign-in');
        }
    };

    return (
        <div className='border-entourage-blue border-2 rounded-[15px] bg-entourage-black flex flex-col'>
            <div className='flex flex-row justify-center my-6 mx-20'>
                <div className="w-16 h-16 mr-4 rounded-full flex justify-center items-center bg-entourage-blue text-4xl text-entourage-black md:text-4xl font-sans font-bold">
                    <p className='pt-4 pr-4'>e</p>
                </div>
                <div className='flex justify-center items-end text-entourage-blue text-3xl font-bold pb-1 -ml-3'>
                    ntourage
                </div>
            </div>
            <div className='border-entourage-blue border-t-2 bg-transparent flex flex-col'>
                <div className='flex w-full justify-center pt-4'>
                    <p className='text-white font-bold'>Welcome Back!</p>
                </div>
                <div className='flex w-full justify-center pt-4'>  
                    <button onClick={onGoogleSignIn} className='w-5/6 border-[1px] rounded-[20px] border-entourage-orange'>
                        <p className='text-white text-sm py-2'>Sign-in with Google</p>
                    </button>
                </div>
                <div className='flex w-full justify-center items-center pt-4'>
                    <div className='border-white border-[.5px] w-1/12 h-0'></div>
                    <p className='text-white text-xs p-2'>or</p>
                    <div className='border-white border-[.5px] w-1/12 h-0'></div>
                </div>
                <form onSubmit={onSignIn} className='flex flex-col items-center w-full'>
                    <div className='flex justify-center pt-4 w-full'>
                        <div className='flex items-center w-5/6 border-[1px] rounded-[20px] border-entourage-orange px-4 py-2'>
                            <Image src="./mail.svg" alt="email" width={16} height={16} className='mr-2' />
                            <input
                                type='email'
                                className='flex-1 text-white bg-transparent focus:outline-none focus:border-transparent focus:ring-0'
                                placeholder='Enter your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                        </div>
                    </div>
                    <div className='flex justify-center pt-4 w-full'>
                        <div className='flex items-center w-5/6 border-[1px] rounded-[20px] border-entourage-orange px-4 py-2'>
                            <Image src="./lock.svg" alt="password" width={16} height={16} className='mr-2' />
                            <input
                                type='password'
                                className='flex-1 text-white bg-transparent focus:outline-none focus:border-transparent focus:ring-0'
                                placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                        </div>
                    </div>
                    {!error && (
                        <div className='w-full h-[28px] pt-2'></div>
                    )}
                    {error && (
                        <div className='flex w-full justify-center pt-2'>
                            <p className='text-red-500 text-sm'>{error}</p>
                        </div>
                    )}
                    <div className='flex w-full justify-center pt-6'>  
                        <button type="submit" className='w-5/6 rounded-[20px] bg-entourage-blue'>
                            <p className='text-black text-sm py-2'>Sign-in</p>
                        </button>
                    </div>
                </form>
                <div className='w-full flex justify-center my-2'>
                    <p className='text-white text-xs py-2 scale-90'>Not part of the beta? Signup coming soon</p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;