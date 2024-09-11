'use client'

import LandingPage from '../modules/corp/LandingPage';
import { AuthProvider } from './authState';
import React from 'react';

export default function Home() {
    return (
        <AuthProvider>
            <LandingPage />
        </AuthProvider>
    );
}