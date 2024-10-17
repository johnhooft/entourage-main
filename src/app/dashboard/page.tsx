'use client'
//Dashboard
import React, { useEffect, useState } from 'react';
import { AuthProvider } from '@/app/authState';
import Dashboard from '@/modules/dashboard/Dashboard';

export default function Home() {

    return (
        <AuthProvider>
            <div className='w-screen h-screen'>
                <div className='w-full h-full'>
                    <Dashboard />
                </div>
            </div>
        </AuthProvider>
    );
}
