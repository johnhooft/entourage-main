"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"

type ColorPickerWheelProps = {
  color: string
  setColor: React.Dispatch<React.SetStateAction<string>>
}

function ColorPickerWheel({ color, setColor }: ColorPickerWheelProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const svgRef = useRef<SVGSVGElement>(null)

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const centerX = svgRect.width / 2
      const centerY = svgRect.height / 2
      const x = clientX - svgRect.left - centerX
      const y = clientY - svgRect.top - centerY

      const radius = Math.min(centerX, centerY) - 5
      const distance = Math.sqrt(x * x + y * y)
      const angle = Math.atan2(y, x)
      const limitedX = Math.cos(angle) * Math.min(distance, radius)
      const limitedY = Math.sin(angle) * Math.min(distance, radius)

      setPosition({ x: limitedX + centerX, y: limitedY + centerY })
      updateColor(limitedX, limitedY, radius)
    }
  }, [setColor])

  const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    s /= 100
    l /= 100
    const k = (n: number) => (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    return [255 * f(0), 255 * f(8), 255 * f(4)].map(Math.round) as [number, number, number]
  }

  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  }

  const updateColor = useCallback((x: number, y: number, radius: number) => {
    const hue = ((Math.atan2(y, x) + Math.PI) / (2 * Math.PI)) * 360
    const saturation = Math.min((Math.sqrt(x * x + y * y) / radius) * 100, 100)
    const [r, g, b] = hslToRgb(hue, saturation, 50)
    const hexColor = rgbToHex(r, g, b)
    setColor(hexColor)
  }, [setColor])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    updatePosition(e.clientX, e.clientY)
  }, [updatePosition])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true)
    updatePosition(e.touches[0].clientX, e.touches[0].clientY)
  }, [updatePosition])

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (isDragging) {
      updatePosition(clientX, clientY)
    }
  }, [isDragging, updatePosition])

  const handleEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY)

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('mouseup', handleEnd)
      window.addEventListener('touchend', handleEnd)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging, handleMove, handleEnd])

  const gradientId = 'colorWheel'

  return (
    <div className="flex flex-col items-center space-y-4">
      <svg
        ref={svgRef}
        width="200"
        height="200"
        viewBox="0 0 200 200"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="cursor-pointer touch-none"
        role="img"
        aria-label="Color picker wheel"
      >
        <defs>
          <radialGradient id={gradientId}>
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g transform="translate(100, 100)">
          {[...Array(360)].map((_, i) => (
            <path
              key={i}
              d="M0,0 L100,0 A100,100 0 0,1 97.55,25.88 L0,0 Z"
              fill={`hsl(${i}, 100%, 50%)`}
              transform={`rotate(${i})`}
            />
          ))}
          <circle r="100" fill={`url(#${gradientId})`} />
        </g>
        <circle
          cx={position.x}
          cy={position.y}
          r="5"
          fill="white"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <div className="flex items-center space-x-2">
        <div
          className="w-10 h-10 rounded-full border border-gray-300"
          style={{ backgroundColor: color }}
          aria-label={`Selected color: ${color}`}
        />
        <span>{color}</span>
      </div>
    </div>
  )
}

export default ColorPickerWheel