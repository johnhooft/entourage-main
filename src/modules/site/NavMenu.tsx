import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

interface FullscreenExpandableMenuProps {
  color?: string;
  siteSections: string[];
}

export default function FullscreenExpandableMenu({ color = 'primary', siteSections }: FullscreenExpandableMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuItems = siteSections;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }

    return () => {
      document.body.style.overflow = 'visible'
    }
  }, [isOpen])

  return (
    <div className={`text-${color}`}>
      <button
        onClick={toggleMenu}
        className={`p-2 rounded-md hover:bg-${color}/10 focus:outline-none focus:ring-2 focus:ring-${color}/50 z-50 relative`}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div
        className={`fixed inset-0 bg-entourage-black z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="h-full flex items-center justify-center">
          <ul className="space-y-6 text-center">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`transform transition-all duration-300 ease-in-out ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <a
                  href="#"
                  className={`text-3xl font-bold hover:text-${color} focus:outline-none focus:text-${color} transition-colors duration-200`}
                  onClick={toggleMenu}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}