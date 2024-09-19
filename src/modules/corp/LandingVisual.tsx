import React, { useEffect, useState } from 'react';
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from 'lucide-react'
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-svg-title-cards";

export function LandingVisual() {

    const items = [
        {
            title: "Ticketing",
            src: "/ticket.svg",
            bg: "#FF5E1C",
        },
        {
            title: "Communications",
            src: "/megaphone.svg",
            bg: " #ACD1F2",
        },
        {
            title: "Club Websites",
            src: "/monitor-smartphone.svg",
            bg: "#1F3075",
        },
        {
            title: "Brand Partnerships",
            src: "/rocket.svg",
            bg: "#FF5E1C",
        },
        {
            title: "Club Management",
            src: "/network.svg",
            bg: "#ACD1F2",
        },
    ];

    return(
        <div className='w-[350px] h-[525px] bg-entourage-blue rounded-xl rounded-b-2xl'>
            <div className='h-1/3 flex flex-col'>
                <div className='flex justify-end p-2'>
                    <Image src="/settings.svg" alt='settings' width={33} height={25} />
                </div>
                <div className='flex flex-row justify-center scale-75 -mt-4'>
                    <div className="scale-[80%] pt-8 pr-8 w-20 h-20 min-w-20 min-h-20 rounded-full flex justify-center items-center bg-entourage-black text-3xl text-entourage-blue md:text-4xl font-sans font-bold">
                        <p>e</p>
                    </div>
                    <div className='flex justify-center items-end text-entourage-black text-3xl font-bold pb-2 -ml-2'>
                        ntourage
                    </div>
                </div>
                <div className='flex justify-center scale-[60%]'>
                    <Link href={'/'} className="group px-6 py-3 border-2 border-entourage-black rounded-full bg-transparent text-entourage-black hover:scale-105 transition-all duration-200 flex items-center space-x-2">
                        <span>Join Now</span>
                        <ArrowRight size={16} className='text-entourage-black' />
                    </Link>
                </div>
            </div>
            <div className='bg-black w-full h-2/3 rounded-b-xl flex flex-col justify-between'>
                <div className='flex flex-col gap-4 px-4 pt-8 text-white text-sm'>
                    <p>Welcome to the entourage! We’re on a mission to make running a club as easy as it used to be. </p>
                    <p>Use our AI to do the work you don’t want to do, and leave your team with all of the fun stuff. </p>
                    <div className='w-full h-[150px] overflow-hidden'>
                        <InfiniteMovingCards
                            items={items}
                            direction="left"
                            speed="fast"
                            pauseOnHover={true}
                            className='h-full'
                        />
                    </div>
                </div>
                <div className='flex flex-row justify-between w-full items-center px-5 pb-3'>
                    <div className='flex flex-row w-full text-white gap-2'>
                        <p>Contact</p>
                        <Image src='/instagram.svg' alt='instagram' width={15} height={15} />
                    </div>
                    <div className='flex flex-row text-sm min-w-fit gap-1'>
                        <p className='text-white'>Made with</p>
                        <p className='text-entourage-blue'>entourage</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}