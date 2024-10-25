'use client'

import React from 'react'
import { motion } from 'framer-motion'

// interface SpinnerProps {
//   size?: 'small' | 'medium' | 'large'
//   color?: string
// }

export default function Spinner() {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  }

  const spinnerSize = "medium"
  //const spinnerColor = `border-${color}-500`
  const size = 'medium' 
  const color = 'indigo'

  return (
    <div className="flex flex-col items-center justify-center bg-transparent">
      <div className={`relative w-[100px] h-[100px]`}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 ${i % 3 === 0 ? 'h-6' : 'h-3'} border-entourage-orange rounded-full transform -translate-x-1/2`}
            style={{
              top: '0',
              left: '50%',
              transformOrigin: '50% 100%',
              rotate: `${i * 30}deg`,
            }}
            initial={{ opacity: 0.1 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: i * 0.1,
            }}
          />
        ))}
        <motion.div
          className={`absolute inset-0 rounded-full bg-entourage-blue`}
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>
      <motion.p
        className={`mt-4 font-semibold bg-gradient-to-r from-entourage-orange to-entourage-blue bg-clip-text text-transparent`}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        Loading...
      </motion.p>
    </div>
  )
}
