import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Colors } from '../../../utils/types/layoutTypes';
import { reduceOpacity } from '../../../utils/site/reduceOpacity';

interface FullscreenExpandableMenuProps {
  colors: Colors
  siteSections: string[];
  setExpandedPage: (page: string) => void;
}

const navMap = {
  "Memberships": "ExpandedMemberships",
  "Events": "ExpandedEvents",
  "Trips": "ExpandedTrips",
  "Executive Team": "ExpandedExec",
};

export default function FullscreenExpandableMenu({ colors, siteSections, setExpandedPage }: FullscreenExpandableMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuItems = siteSections;

  // Create a style object using the color props
  const styles = {
    toggleButton: {
      color: colors.primary,
      backgroundColor: isHovered ? reduceOpacity(colors.accent, 0.1) : 'transparent',
      transition: 'all 0.3s ease',
      border: isFocused ? `2px solid ${reduceOpacity(colors.accent, 0.5)}` : '2px solid transparent',
      outline: 'none', // Remove default focus outline
    },
    menu: {
      backgroundColor: colors.background,
    },
    menuItem: {
      color: colors.text,
    },
    menuItemHover: {
      color: colors.accent,
    },
  };

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
    <div className="">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md z-50 relative"
        aria-label="Toggle menu"
        style={styles.toggleButton}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={styles.menu}
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
                  className="text-3xl font-bold focus:outline-none transition-colors duration-200"
                  onClick={() => {
                    toggleMenu();
                    // Use navMap to set the expanded page
                    setExpandedPage(navMap[item as keyof typeof navMap] || item);
                  }}
                  style={styles.menuItem}
                  onMouseEnter={(e) => {e.currentTarget.style.color = styles.menuItemHover.color;}}
                  onMouseLeave={(e) => {e.currentTarget.style.color = styles.menuItem.color;}}
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
