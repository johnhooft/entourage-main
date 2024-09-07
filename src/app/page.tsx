'use client'

import LandingPage from './modules/corp/LandingPage';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const handleGenerateClick = () => {
        router.push('/questionnaire');
    };

    return (
        <LandingPage />
    );
}