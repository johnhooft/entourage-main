import React from 'react';
import Link from "next/link";
import { ArrowRight } from 'lucide-react';
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-svg-title-cards";

export function ThreeDLandingVisual() {
  const items = [
    { title: "Ticketing", src: "/ticket.svg", bg: "#FF5E1C" },
    { title: "Communications", src: "/megaphone.svg", bg: "#ACD1F2" },
    { title: "Club Websites", src: "/monitor-smartphone.svg", bg: "#1F3075" },
    { title: "Brand Partnerships", src: "/rocket.svg", bg: "#FF5E1C" },
    { title: "Club Management", src: "/network.svg", bg: "#ACD1F2" },
  ];

  // Fixed rotation values
  const rotateY = -15; // Negative value for left rotation
  const rotateX = 5; // Slight upward tilt

  return (
    <div className=" flex items-center justify-center" style={{ perspective: "1000px" }}>
      <div
        className="w-[350px] h-[535px] bg-entourage-blue border-entourage-blue border-[1px] rounded-[20px] shadow-xl shadow-entourage-black/50 dark:shadow-entourage-blue/50 relative"
        style={{
          transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="h-1/3 flex flex-col" style={{ transform: "translateZ(50px)" }}>
          <div className='flex flex-row justify-center scale-75 mt-5'>
            <div className="scale-[80%] pt-8 pr-8 w-20 h-20 min-w-20 min-h-20 rounded-full flex justify-center items-center bg-entourage-black text-3xl text-entourage-blue md:text-4xl font-sans font-bold">
              <p>e</p>
            </div>
            <div className='flex justify-center items-end text-entourage-black text-3xl font-bold pb-2 -ml-2'>
              ntourage
            </div>
          </div>
          <div className='flex justify-center scale-[60%]' style={{ transform: "translateZ(75px)" }}>
            <Link href={'/'} className="group px-6 py-3 border-2 border-entourage-black rounded-full bg-transparent text-entourage-black hover:scale-105 transition-all duration-200 flex items-center space-x-2">
              <span>Join Now</span>
              <ArrowRight size={16} className='text-entourage-black' />
            </Link>
          </div>
        </div>
        <div className='bg-entourage-black w-full h-[350px] rounded-[20px] flex flex-col justify-between relative' style={{ transform: "translateZ(25px)" }}>
          <div className='flex flex-col gap-5 px-4 pt-5 text-white text-sm'>
          <p style={{ transform: "translateZ(40px)" }}>{`Welcome to the entourage! We're on a mission to make running a club as easy as it used to be.`}</p>
          <p style={{ transform: "translateZ(40px)" }}>{`Use our AI to do the work you don't want to do, and leave your team with all of the fun stuff.`}</p>
            <div className='w-full h-[150px] overflow-hidden scale-90 relative' style={{ transform: "translateZ(80px)" }}>
              <InfiniteMovingCards
                items={items}
                direction="left"
                speed="fast"
                pauseOnHover={true}
                className='h-full'
              />
            </div>
          </div>
          <div className='flex flex-row justify-between w-full items-center px-2 pb-3 scale-[80%]' style={{ transform: "translateZ(30px)" }}>
            <div className='flex flex-row w-full text-white text-sm gap-2'>
              <p>Contact</p>
            </div>
            <div className='flex flex-row text-sm min-w-fit gap-1'>
              <p className='text-white'>Made with</p>
              <p className='text-entourage-blue'>entourage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}