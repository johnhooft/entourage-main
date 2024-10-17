import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/app/authState';
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const SignUp: React.FC<{ onSuccessfulSignup: () => void; redirect: string; }> = ({ onSuccessfulSignup, redirect }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const { user, loginWithGoogle } = useAuth();

    if (user) {
        onSuccessfulSignup();
    }

    const validateEmail = (email: string) => {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(String(email).toLowerCase());
    };

    const onGoogleSignup = async () => {
        try {
            console.log(redirect)
            await loginWithGoogle(redirect);
        } catch (error: any) {
            console.error('Error during Google sign-up:', error);
            setError(error.message || 'An error occurred during Google sign-up');
        }
    };

    const onSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await fetch('/api/auth/signup', {
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
            onSuccessfulSignup()
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'An error occurred during sign-up');
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
                    <p className='text-white font-bold'>Join Entourage!</p>
                </div>
                <div className='flex w-full justify-center pt-4'>  
                    <button
                        onClick={onGoogleSignup}
                        className='w-5/6 border-[1px] rounded-[20px] border-entourage-orange'
                    >
                        <p className='text-white text-sm py-2'>
                            Sign up with Google
                        </p>
                    </button>
                </div>
                <div className='flex w-full justify-center items-center pt-4'>
                    <div className='border-white border-[.5px] w-1/12 h-0'></div>
                    <p className='text-white text-xs p-2'>or</p>
                    <div className='border-white border-[.5px] w-1/12 h-0'></div>
                </div>
                <form onSubmit={onSignup} className='flex flex-col items-center w-full'>
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
                                placeholder='Create a password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                            />
                        </div>
                    </div>
                    <div className='flex justify-center pt-4 w-full'>
                        <div className='flex items-center w-5/6 border-[1px] rounded-[20px] border-entourage-orange px-4 py-2'>
                            <Image src="./lock.svg" alt="confirm password" width={16} height={16} className='mr-2' />
                            <input
                                type='password'
                                className='flex-1 text-white bg-transparent focus:outline-none focus:border-transparent focus:ring-0'
                                placeholder='Confirm password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                autoComplete="new-password"
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
                        <button
                            type="submit"
                            className='w-5/6 rounded-[20px] bg-entourage-blue'
                        >
                            <p className='text-black text-sm py-2'>Sign up</p>
                        </button>
                    </div>
                </form>
                <div className='w-full flex justify-center my-2'>
                    <p className='text-white text-xs py-2 scale-90'>
                        Already on Board? <a href="/signin" className='text-entourage-orange'>Sign in here!</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;