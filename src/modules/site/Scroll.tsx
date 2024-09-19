'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Block {
  title: string
  text: string
  image: string
}

interface InfoScrollProps {
  blockArr: Block[]
}

export default function Scroll({ blockArr }: InfoScrollProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black p-8">
      <div className="w-full max-w-6xl h-[80vh] overflow-y-auto rounded-3xl border-4 border-entourage-blue bg-black shadow-2xl relative p-16">
        {blockArr.map((block, index) => (
          block.text ? (
            // Use Framer Motion's `motion.div` for fade-in/out effect
            <motion.div 
              key={index}
              className="mb-40 lg:first:mt-20 last:mb-0"  // Increased margin-bottom for larger spacing
              initial={{ opacity: 0, y: 50 }}  // Initial fade and slight slide up
              whileInView={{ opacity: 1, y: 0 }}  // Fade-in when the block is in view
              exit={{ opacity: 0 }}  // Fade-out effect
              transition={{ duration: 0.6 }}  // Control the speed of the animation
              viewport={{ once: true }}  // Animation happens only once when in view
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2">
                  <h2 className="text-2xl font-bold mb-4 text-white">{block.title}</h2>
                  <p className="text-white">{block.text}</p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                  <Image
                    src={block.image}
                    width={400}
                    height={400}
                    alt={`Image for ${block.title}`}
                    className="rounded-lg shadow-md max-h-[400px] object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ) : null
        ))}
      </div>
    </div>
  )
}
