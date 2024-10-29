"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"

export const PreviewUI = ({ fromDashboard }: { fromDashboard: boolean }) => {

    const router = useRouter();

    const onReturn = () => {
        if (fromDashboard) {
            router.push('/buildsite?from=dashboard');
        }
        else {
            router.push('/buildsite');
        }
      }
    
    return (
        <div className='flex justify-center items-center'>
            <Button className='rounded-[15px] bg-entourage-blue/70 text-black hover:bg-entourage-blue hover:scale-105 transition-all' onClick={onReturn}>← Return</Button>
        </div>
    )
}