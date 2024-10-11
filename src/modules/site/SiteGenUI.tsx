"use client"

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SiteConfig, Colors } from '../../../utils/types/layoutTypes'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { fontMap, FontName } from '@/../utils/site/fontMap'
import { HexColorPicker } from "react-colorful";

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
      <h3 className="text-lg font-2xl text-black">Aa</h3>
    </div>
  )
}

export const StyleChanger: React.FC<StyleChangerProps> = ({ children, initialConfig, onConfigChange }) => {
  const router = useRouter();

  const [userColors, setUserColors] = useState<Colors>({
    primary: '#000000',
    accent: '#000000',
    background: '#FFFFFF',
    text: '#000000',
  });
  const [activeColorPicker, setActiveColorPicker] = useState<keyof Colors | null>(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  
  const [isColorPopupOpen, setIsColorPopupOpen] = useState(false)
  const [isFontPopupOpen, setIsFontPopupOpen] = useState(false)
  const [isLaunchPopupOpen, setIsLaunchPopupOpen] = useState(false)
  const [isLaunched, setIsLaunched] = useState(false)
  const [launchError, setLaunchError] = useState("")
  const popupRef = useRef(null);
  const colorRef = useRef(null);

  const [subDomain, setSubDomain] = useState<string>(initialConfig.layout[0].props.text);
  const [selectedTheme, setSelectedTheme] = useState(initialConfig.colors)
  const [selectedTitleFont, setSelectedTitleFont] = useState<FontName>(initialConfig.fonts.title)
  const [selectedTextFont, setSelectedTextFont] = useState<FontName>(initialConfig.fonts.text)
  const [activeFontTab, setActiveFontTab] = useState<'title' | 'text'>('title')

  useEffect(() => {
    setSubDomain((subDomain) => subDomain.replace(/\s+/g, ''));
  }, [subDomain]);

  useEffect(() => {
    function handleClickOutsideLaunch(event: MouseEvent) {
      if (isLaunchPopupOpen && popupRef.current && !(popupRef.current as Node).contains(event.target as Node)) {
        setIsLaunchPopupOpen(false);
        setLaunchError("");
      }
    }

    function handleClickOutsideColor(event: MouseEvent) {
      if (isColorPopupOpen && colorRef.current && !(colorRef.current as Node).contains(event.target as Node)) {
        setActiveColorPicker(null); // Close the active color picker
        setIsColorPickerOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutsideLaunch);
    document.addEventListener('mousedown', handleClickOutsideColor);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideLaunch);
      document.removeEventListener('mousedown', handleClickOutsideColor);
    };
  }, [isLaunchPopupOpen, isColorPopupOpen]);

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

  const saveConfig = async (clubName: string, config: SiteConfig) => {
    const response = await fetch('/api/siteConfig/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clubName, siteConfig: config }),
    });
  
    const data = await response.json();
    console.log(data.message);

    if (data.message != "Site config saved successfully!") {
      setLaunchError(data.message)
    }
    else {
      setLaunchError("")
      setIsLaunched(true)
      setIsLaunchPopupOpen(false)
    }
  };

  const onPreview = () => {
    sessionStorage.clear();
    sessionStorage.setItem('siteConfig', JSON.stringify(initialConfig));
    router.push('/preview');
  }

  const onLaunch = async() => {
    //sessionStorage.clear();
    //sessionStorage.setItem('siteConfig', JSON.stringify(initialConfig));
    console.log(initialConfig.userID, subDomain, initialConfig)
    await saveConfig(subDomain, initialConfig)
  }

  const onLaunchPopup = () => {
    setIsLaunchPopupOpen(true)
  }

  const onDashboard = () => {
    router.push('./dashboard')
  }

  const onViewSite = () => {
    router.push(`./${subDomain}`)
  }

  const handleColorChange = (color: string) => {
    if (activeColorPicker) {
      const newUserColors = {
        ...userColors,
        [activeColorPicker]: color
      };
      setUserColors(newUserColors);
      
      // Update the selected theme and config with HSLA values
      const newConfig = { ...initialConfig, colors: convertColorsToHSLA(newUserColors) };
      setSelectedTheme(newConfig.colors);
      onConfigChange(newConfig);
    }
  };

  const handleCustomColorSetClick = (colorSet: Colors) => {
    const newConfig = { ...initialConfig, colors: convertColorsToHSLA(colorSet) };
      setSelectedTheme(newConfig.colors);
      onConfigChange(newConfig);
  }

  const convertColorsToHSLA = (colors: Colors): Colors => {
    const convertedColors: Colors = {} as Colors;
    for (const [key, value] of Object.entries(colors)) {
      convertedColors[key as keyof Colors] = hexToHSLA(value);
    }
    return convertedColors;
  };

  const hexToHSLA = (hex: string): string => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h! /= 6;
    }

    return `hsla(${Math.round(h! * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, 1)`;
  };

  const handleColorButtonClick = (key: keyof Colors) => {
    setActiveColorPicker(key);
    setIsColorPickerOpen(true);
  };

  const renderColorPickers = () => {
    return Object.entries(userColors).map(([key, value]) => (
      <div key={key} className="flex flex-col items-center">
        <button
          className="w-14 h-6 mb-2 border border-gray-300"
          style={{ backgroundColor: value }}
          onClick={() => handleColorButtonClick(key as keyof Colors)}
        ></button>
        <span className="text-sm text-black">{key}</span>
        {activeColorPicker === key && isColorPickerOpen && (
          <div ref={colorRef} className="absolute bottom-20 z-10">
            <HexColorPicker color={value} onChange={handleColorChange} />
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="relative min-h-screen min-w-screen">
      {isLaunched && (
        <div className='absolute w-full h-full flex justify-center items-top z-50 bg-black/40'>
          <div className='w-fit h-fit mt-40 flex flex-col bg-entourage-black rounded-[15px] shadow-xl shadow-entourage-blue/50'>
            <p className='flex justify-center text-white text-2xl font-bold p-8'>Congrats! Your Site is Live.</p>
            <div className='w-full flex flex-row justify-between p-8'>
              <Button className='ml-4 rounded-[15px] bg-entourage-blue text-black hover:bg-entourage-blue hover:scale-105 transition-all' onClick={onViewSite}>
                View Site
                {/* <Image src="./rocket.svg" alt="preview" width={20} height={20} className='ml-2'/> */}
              </Button>
              <Button className='mr-4 rounded-[15px] bg-entourage-blue text-black hover:bg-entourage-blue hover:scale-105 transition-all' onClick={onDashboard}>
                Dashboard
                {/* <Image src="./rocket.svg" alt="preview" width={20} height={20} className='ml-2'/> */}
              </Button>
            </div>
          </div>
        </div>
      )}
      {isLaunchPopupOpen && (
        <div className='absolute w-full h-full flex justify-center items-top z-50 bg-black/40'>
          <div ref={popupRef} className='w-fit h-fit mt-40 bg-entourage-black rounded-[15px] shadow-xl shadow-entourage-blue/50'>
            <div className='w-full flex flex-col p-6'>
              <p className='text-white font-bold text-2xl'>Edit your Sub-Domain:</p>
              <div className='flex flex-grow mt-4 border-[1px] rounded-[15px] border-entourage-orange p-2'>
                {/* URL section */}
                <span className='text-entourage-blue text-xl'>entourage-ai.com/</span>
                <input 
                  type='text' 
                  value={subDomain} 
                  onChange={(e) => setSubDomain(e.target.value)} 
                  className='text-white text-xl bg-transparent border-none focus:outline-none focus:border-b focus:border-entourage-blue'
                  placeholder='your-subdomain'
                />
              </div>
              <div className='flex w-full justify-center text-sm text-red-500 font-bold'>
                <p>{launchError}</p>
              </div>
              <div className='flex justify-center mt-6'>
                <Button className='rounded-[15px] bg-entourage-blue text-black hover:bg-entourage-blue hover:scale-105 transition-all' onClick={onLaunch}>
                  Launch
                  <Image src="./rocket.svg" alt="preview" width={20} height={20} className='ml-2'/>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Top bar for selecting menu */}
      <div className="fixed top-0 left-0 right-0 bg-entourage-white p-5 z-50 text-foreground flex flex-row">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='bg-entourage-blue border-none rounded-[15px] text-black hover:scale-105 hover:bg-entourage-blue transition-all'>
              Customize
              <Image src="./paintbrush.svg" alt="preview" width={20} height={20} className='ml-2'/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-entourage-white text-black'>
            <DropdownMenuItem className='focus:bg-entourage-blue focus:text-black' onClick={openColorPopup}>
              <Image src="./droplets.svg" alt="preview" width={14} height={14} className='mr-6 ml-2'/>
              Color
            </DropdownMenuItem>
            <DropdownMenuItem className='focus:bg-entourage-blue focus:text-black' onClick={openFontPopup}>
              <Image src="./type.svg" alt="preview" width={14} height={14} className='mr-6 ml-2'/>
              Font
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* button to preview site: clears siteconfig from sessiongStorage and loads current on in, then redirect to /preview */}
        <div className='flex w-full justify-between'>
          <Button className='ml-8 rounded-[15px] bg-entourage-blue text-black hover:bg-entourage-blue hover:scale-105 transition-all' onClick={onPreview}>
            Preview
            <Image src="./screen-share.svg" alt="preview" width={20} height={20} className='ml-2'/>
          </Button>
          <Button className='rounded-[15px] bg-entourage-blue text-black hover:bg-entourage-blue hover:scale-105 transition-all' onClick={onLaunchPopup}>
            Launch
            <Image src="./rocket.svg" alt="preview" width={20} height={20} className='ml-2'/>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-16 pb-16">{children}</div>

      {/* Bottom popup for color selection */}
      {isColorPopupOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-entourage-white py-4 px-1 z-50 text-foreground">
          <div className="flex flex-row w-full px-5 items-center">
            <Button className='mr-4 bg-entourage-blue text-black hover:bg-entourage-blue hover:scale-105 transition-all' onClick={() => setIsColorPopupOpen(false)}>Close</Button>
            <div
              className="flex flex-row pr-4 cursor-pointer"
              onClick={() => handleCustomColorSetClick(userColors)}
            >
              <div className="flex flex-row gap-2 items-center pr-4">
                {renderColorPickers()}
              </div>
            </div>
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
            {/* <div
              className="flex flex-row pr-4 cursor-pointer"
              onClick={() => handleColorSetClick(blackGreen)}
            >
              {renderColorBlocks(blackGreen)}
            </div> */}
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
              className={`${activeFontTab === 'title' ? 'bg-entourage-blue text-black hover:bg-entourage-blue' : 'bg-white text-black hover:bg-entourage-blue/45'}`}
            >
              Title Font
            </Button>
            <Button
              onClick={() => setActiveFontTab('text')}
              className={`${activeFontTab === 'text' ? 'bg-entourage-blue text-black hover:bg-entourage-blue' : 'bg-white text-black hover:bg-entourage-blue/45'}`}
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