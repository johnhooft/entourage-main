import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/authState';

const SignIn = ({ onSuccessfulSignIn }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const { user, loading, logout } = useAuth();

    if (user) {onSuccessfulSignIn()}

    const onSignIn = async () => {
        setError('');
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

            // Handle successful login
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
                    <button className='w-5/6 border-[1px] rounded-[20px] border-entourage-orange'>
                        <p className='text-white text-sm py-2'>Sign-in with Google</p>
                    </button>
                </div>
                <div className='flex w-full justify-center items-center pt-4'>
                    <div className='border-white border-[.5px] w-1/12 h-0'></div>
                    <p className='text-white text-xs p-2'>or</p>
                    <div className='border-white border-[.5px] w-1/12 h-0'></div>
                </div>
                <div className='flex justify-center pt-4'>
                    <div className='flex items-center w-5/6 border-[1px] rounded-[20px] border-entourage-orange px-4 py-2'>
                        <Image src="./mail.svg" alt="preview" width={16} height={16} className='mr-2' />
                        <input
                            type='text'
                            className='flex-1 text-white bg-transparent focus:outline-none focus:border-transparent focus:ring-0'
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex justify-center pt-4'>
                    <div className='flex items-center w-5/6 border-[1px] rounded-[20px] border-entourage-orange px-4 py-2'>
                        <Image src="./lock.svg" alt="preview" width={16} height={16} className='mr-2' />
                        <input
                            type='password'
                            className='flex-1 text-white bg-transparent focus:outline-none focus:border-transparent focus:ring-0'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                {error && (
                    <div className='flex w-full justify-center pt-2'>
                        <p className='text-red-500 text-sm'>{error}</p>
                    </div>
                )}
                <div className='flex w-full justify-center pt-6'>  
                    <button onClick={onSignIn} className='w-5/6 rounded-[20px] bg-entourage-blue'>
                        <p className='text-black text-sm py-2'>Sign-in</p>
                    </button>
                </div>
                <div className='w-full flex justify-center my-2'>
                    <p className='text-white text-xs py-2 scale-90'>Not part of the beta? Signup coming soon</p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;