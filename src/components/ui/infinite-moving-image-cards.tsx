"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import Image from 'next/image'

interface Item {
  name: string;
  image: string;
}

interface InfiniteMovingCardsProps {
  items: Item[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)

  const [start, setStart] = useState(false)

  useEffect(() => {
    addAnimation()
  }, [])

  useEffect(() => {
    setStart(false)  // Reset start to stop the animation
    addAnimation()
  }, [items])

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      // Clear the current list of images
      scrollerRef.current.innerHTML = ""

      // Create and append new list items based on the updated `items` array
      items.forEach((item, idx) => {
        const listItem = document.createElement("li")
        listItem.className = "w-[350px] h-[200px] relative rounded-2xl flex-shrink-0 overflow-hidden"

        const imgWrapper = document.createElement("div")
        imgWrapper.className = "relative w-[350px] h-[200px] overflow-hidden rounded-2xl"

        // Create an Image component equivalent using a regular img
        const img = document.createElement("img")
        img.src = item.image
        img.alt = item.name
        img.style.objectFit = "cover"
        img.style.width = "100%"
        img.style.height = "100%"

        imgWrapper.appendChild(img)
        listItem.appendChild(imgWrapper)
        if (scrollerRef.current) {scrollerRef.current.appendChild(listItem)}
      })

      // Duplicate items for the animation effect
      const scrollerContent = Array.from(scrollerRef.current.children)
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {scrollerRef.current.appendChild(duplicatedItem)}
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      )
    }
  }

  const getSpeed = () => {
    if (containerRef.current) {
      const speedOptions = {
        fast: "20s",
        normal: "40s",
        slow: "80s"
      }
      containerRef.current.style.setProperty("--animation-duration", speedOptions[speed])
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7.1xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] h-[200px] min-h-[200px] min-w-[350px] relative rounded-2xl flex-shrink-0 overflow-hidden"
            key={`${item.name}-${idx}`}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={350}
              height={200}
              className="object-cover w-full h-full"
              // Set objectFit to cover for optimal scaling
              style={{ objectFit: "cover" }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
