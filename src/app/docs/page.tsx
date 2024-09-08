'use client'

import { UserDocs } from '@/app/modules/corp/UserDocs';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const handleGenerateClick = () => {
        router.push('/');
    };

    return (
        <UserDocs />
    );
}