"use client"

import React, { useState } from 'react'
import { SiteConfig, Colors } from '../../../utils/types/layoutTypes'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { fontMap, FontName } from '@/../utils/site/fontMap'

interface StyleChangerProps {
  children: React.ReactNode
  initialConfig: SiteConfig
  onConfigChange: (newConfig: SiteConfig) => void
}

const FontPreview: React.FC<{ fontName: FontName; onClick: () => void }> = ({ fontName, onClick }) => {
  const font = fontMap[fontName]
  return (
    <div 
      className={`${font.className} cursor-pointer p-2 hover:bg-gray-100 rounded`}
      onClick={onClick}
    >
      <h3 className="text-lg font-2xl">Aa</h3>
    </div>
  )
}

export const StyleChanger: React.FC<StyleChangerProps> = ({ children, initialConfig, onConfigChange }) => {
  const [isColorPopupOpen, setIsColorPopupOpen] = useState(false)
  const [isFontPopupOpen, setIsFontPopupOpen] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState(initialConfig.colors)
  const [selectedTitleFont, setSelectedTitleFont] = useState<FontName>(initialConfig.fonts.title)
  const [selectedTextFont, setSelectedTextFont] = useState<FontName>(initialConfig.fonts.text)
  const [activeFontTab, setActiveFontTab] = useState<'title' | 'text'>('title')

  const handleComponentStyleChange = (componentIndex: number, propName: string, value: any) => {
    const newConfig = { ...initialConfig }
    newConfig.layout[componentIndex].props[propName] = value
    onConfigChange(newConfig)
  }

  const openColorPopup = () => {
    setIsColorPopupOpen(true)
    setIsFontPopupOpen(false)
  }

  const openFontPopup = () => {
    setIsFontPopupOpen(true)
    setIsColorPopupOpen(false)
  }

  const handleColorSetClick = (colorSet: Colors) => {
    const newConfig = { ...initialConfig, colors: colorSet }
    setSelectedTheme(colorSet)
    onConfigChange(newConfig)
  }

  const handleFontChange = (fontName: FontName) => {
    const newConfig = { ...initialConfig }
    if (activeFontTab === 'title') {
      newConfig.fonts.title = fontName
      setSelectedTitleFont(fontName)
    } else {
      newConfig.fonts.text = fontName
      setSelectedTextFont(fontName)
    }
    onConfigChange(newConfig)
  }

  const lightBlueWhiteColors: Colors = {
    primary: 'hsla(210, 100%, 50%, 1)',
    accent: 'hsla(195, 100%, 50%, 1)',
    background: 'hsla(206, 14%, 21%, 1)',
    text: 'hsla(210, 36%, 96%, 1)',
  }

  const pastelGreenColors: Colors = {
    primary: 'hsla(158, 55%, 78%, 1)',
    accent: 'hsla(83, 55%, 84%, 1)',
    background: 'hsla(90, 40%, 95%, 1)',
    text: 'hsla(0, 0%, 20%, 1)',
  }

  const entourageColors: Colors = {
    primary: 'hsla(208, 73%, 81%, 1)',
    accent: 'hsla(17, 100%, 55%, 1)',
    background: 'hsla(0, 0%, 13%, 1)',
    text: 'hsla(0, 11%, 96%, 1)',
  }

  const slateBlueLilac: Colors = {
    primary: 'hsla(231, 44%, 56%, 1)',
    accent: 'hsla(262, 47%, 63%, 1)',
    background: 'hsla(200, 12%, 95%, 1)',
    text: 'hsla(0, 0%, 26%, 1)',
  }

  const blackGreen: Colors = {
    primary: 'hsla(124, 48%, 49%, 1)',
    accent: 'hsla(124, 100%, 50%, 1)',
    background: 'hsla(0, 0%, 0%, 1)',
    text: 'hsla(0, 0%, 95%, 1)',
  }

  const renderColorBlocks = (colors: Colors) => {
    return Object.entries(colors).map(([key, value]) => (
      <div key={key} className="w-14 h-6" style={{ backgroundColor: value }}></div>
    ))
  }

  return (
    <div className="relative min-h-screen">
      {/* Top bar for selecting menu */}
      <div className="fixed top-0 left-0 right-0 bg-entourage-white p-5 z-50 text-foreground">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='bg-entourage-blue border-none rounded-[15px] text-black hover:scale-105 hover:bg-entourage-blue transition-all'>Customize</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={openColorPopup}>Color</DropdownMenuItem>
            <DropdownMenuItem onClick={openFontPopup}>Font</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main content */}
      <div className="pt-16 pb-16">{children}</div>

      {/* Bottom popup for color selection */}
      {isColorPopupOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-entourage-white py-4 px-1 z-50 text-foreground">
          <div className="flex flex-row w-full px-5 items-center">
            <Button className='mr-4' onClick={() => setIsColorPopupOpen(false)}>Close</Button>
            <div
              className="flex flex-row pr-4 cursor-pointer"
              onClick={() => handleColorSetClick(lightBlueWhiteColors)}
            >
              {renderColorBlocks(lightBlueWhiteColors)}
            </div>
            <div
              className="flex flex-row pr-4 cursor-pointer"
              onClick={() => handleColorSetClick(pastelGreenColors)}
            >
              {renderColorBlocks(pastelGreenColors)}
            </div>
            <div
              className="flex flex-row pr-4 cursor-pointer"
              onClick={() => handleColorSetClick(entourageColors)}
            >
              {renderColorBlocks(entourageColors)}
            </div>
            <div
              className="flex flex-row pr-4 cursor-pointer"
              onClick={() => handleColorSetClick(slateBlueLilac)}
            >
              {renderColorBlocks(slateBlueLilac)}
            </div>
            <div
              className="flex flex-row pr-4 cursor-pointer"
              onClick={() => handleColorSetClick(blackGreen)}
            >
              {renderColorBlocks(blackGreen)}
            </div>
          </div>
        </div>
      )}

      {/* Bottom popup for font selection */}
      {isFontPopupOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-entourage-white p-4 z-50 text-foreground">
          <h2 className="text-lg font-bold mb-4">Font Selection</h2>
          <div className="flex space-x-4 mb-4">
            <Button
              onClick={() => setActiveFontTab('title')}
              className={`${activeFontTab === 'title' ? 'bg-entourage-blue text-black hover:bg-entourage-blue' : 'bg-secondary text-secondary-foreground hover:bg-entourage-blue/45'}`}
            >
              Title Font
            </Button>
            <Button
              onClick={() => setActiveFontTab('text')}
              className={`${activeFontTab === 'text' ? 'bg-entourage-blue text-black hover:bg-entourage-blue' : 'bg-secondary text-secondary-foreground hover:bg-entourage-blue/45'}`}
            >
              Text Font
            </Button>
          </div>
          <div className="flex flex-row flex-grow gap-4">
            {Object.keys(fontMap).map((fontName) => (
              <FontPreview 
                key={fontName} 
                fontName={fontName as FontName} 
                onClick={() => handleFontChange(fontName as FontName)} 
              />
            ))}
          </div>
          <Button onClick={() => setIsFontPopupOpen(false)} className="mt-4 bg-entourage-blue text-black hover:bg-entourage-blue hover:scale-105 transition-all">Close</Button>
        </div>
      )}
    </div>
  )
}