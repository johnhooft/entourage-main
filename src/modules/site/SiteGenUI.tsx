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
  fromDashboard?: boolean
  onConfigChange: (newConfig: SiteConfig) => void
}

const FontPreview: React.FC<{ fontName: FontName; onClick: () => void; isSelected: boolean }> = ({ fontName, onClick, isSelected }) => {
  const font = fontMap[fontName]
  return (
    <div 
      className={`${font.className} cursor-pointer p-2 hover:bg-gray-200 rounded text-center ${isSelected ? 'bg-entourage-blue text-white' : 'bg-white text-black'}`}
      onClick={onClick}
    >
      <h3 className="text-lg font-bold">Aa</h3>
      <p className="text-xs">{fontName}</p>
    </div>
  )
}

export const StyleChanger: React.FC<StyleChangerProps> = ({ children, initialConfig, onConfigChange, fromDashboard }) => {
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

  const urbanchicColors: Colors = {
    primary: 'hsla(240, 30%, 25%, 1)',    // Deep Indigo
    accent: 'hsla(233, 25%, 60%, 1)',     // Soft Periwinkle
    background: 'hsla(0, 0%, 98%, 1)',    // Slightly Off-White
    text: 'hsla(240, 20%, 30%, 1)',       // Dark Blue-Gray
  }

  const pastels: Colors = {
    primary: 'hsla(350, 80%, 85%, 1)',    // Soft Pink
    accent: 'hsla(180, 40%, 80%, 1)',     // Light Mint
    background: 'hsla(45, 60%, 97%, 1)',  // Warm Cream
    text: 'hsla(330, 25%, 35%, 1)',       // Muted Plum
  }

  const vintageCharm: Colors = {
    primary: 'hsla(24, 35%, 53%, 1)',     // Muted Terracotta
    accent: 'hsla(43, 60%, 66%, 1)',      // Warm Golden Yellow
    background: 'hsla(33, 30%, 96%, 1)',  // Soft Cream
    text: 'hsla(355, 30%, 25%, 1)',       // Deep Burgundy
  }

  const oceanBreeze: Colors = { 
    primary: 'hsla(200, 60%, 40%, 1)',    // Deep Ocean Blue
    accent: 'hsla(170, 45%, 60%, 1)',     // Sea Foam Green
    background: 'hsla(195, 40%, 97%, 1)', // Very Pale Sky Blue
    text: 'hsla(210, 55%, 20%, 1)',       // Navy
  }

  const mintForest: Colors = {
    primary: 'hsla(160, 45%, 30%, 1)',    // Forest Green
    accent: 'hsla(140, 35%, 70%, 1)',     // Soft Mint
    background: 'hsla(120, 20%, 97%, 1)', // Very Pale Sage
    text: 'hsla(180, 45%, 15%, 1)',       // Deep Teal
  }

  const midnightGlow: Colors = {
    primary: 'hsla(240, 45%, 20%, 1)',    // Deep Midnight Blue
    accent: 'hsla(280, 50%, 50%, 1)',     // Muted Purple
    background: 'hsla(220, 35%, 15%, 1)', // Very Dark Navy
    text: 'hsla(0, 0%, 90%, 1)',          // Light Gray
  }

  const darkForest: Colors = {
    primary: 'hsla(150, 45%, 20%, 1)',    // Deep Forest Green
    accent: 'hsla(80, 50%, 45%, 1)',      // Muted Lime Green
    background: 'hsla(120, 25%, 15%, 1)', // Very Dark Green
    text: 'hsla(60, 25%, 92%, 1)',        // Light Khaki
  }

  const volcanicNight: Colors = {
    primary: 'hsla(0, 55%, 30%, 1)',      // Deep Red
    accent: 'hsla(30, 90%, 50%, 1)',      // Muted Orange
    background: 'hsla(0, 0%, 15%, 1)',    // Very Dark Gray
    text: 'hsla(0, 0%, 95%, 1)',          // Off-White
  }

  const sunsetSerenade: Colors = {
    primary: 'hsla(25, 75%, 55%, 1)',     // Warm Orange
    accent: 'hsla(330, 50%, 65%, 1)',     // Soft Pink
    background: 'hsla(45, 70%, 97%, 1)',  // Pale Yellow
    text: 'hsla(350, 45%, 30%, 1)',       // Deep Rose
  }

  const arcticFrost: Colors = {
    primary: 'hsla(200, 55%, 50%, 1)',    // Ice Blue
    accent: 'hsla(170, 45%, 70%, 1)',     // Pale Turquoise
    background: 'hsla(210, 40%, 98%, 1)', // Almost White with a Blue Tint
    text: 'hsla(220, 65%, 20%, 1)',       // Deep Blue
  }

  const moonlitDesert: Colors = {
    primary: 'hsla(45, 40%, 45%, 1)',     // Muted Sand
    accent: 'hsla(15, 50%, 45%, 1)',      // Subdued Terracotta
    background: 'hsla(240, 20%, 15%, 1)', // Deep Night Blue
    text: 'hsla(40, 20%, 80%, 1)',        // Soft Sand
  }

  const emeraldNight: Colors = {
    primary: 'hsla(140, 30%, 35%, 1)',    // Deep Forest Green
    accent: 'hsla(160, 40%, 55%, 1)',     // Muted Teal
    background: 'hsla(180, 25%, 12%, 1)', // Dark Teal
    text: 'hsla(150, 30%, 75%, 1)',       // Pale Sage
  }

  const cosmicPurple: Colors = {
    primary: 'hsla(280, 40%, 45%, 1)',    // Muted Purple
    accent: 'hsla(320, 50%, 55%, 1)',     // Soft Magenta
    background: 'hsla(260, 35%, 10%, 1)', // Deep Space Purple
    text: 'hsla(270, 20%, 85%, 1)',       // Light Lavender
  }

  const charcoalAutumn: Colors = {
    primary: 'hsla(20, 45%, 40%, 1)',     // Muted Rust
    accent: 'hsla(45, 50%, 50%, 1)',      // Subdued Gold
    background: 'hsla(0, 0%, 11%, 1)',    // Charcoal Black
    text: 'hsla(30, 15%, 85%, 1)',        // Warm Off-White
  }
  
  const renderColorBlocks = (colors: Colors) => {
    return Object.entries(colors).map(([key, value]) => (
      <div key={key} className="w-10 h-10 rounded-full" style={{ backgroundColor: value }} title={key}></div>
    ))
  }

  const saveConfig = async (clubName: string, config: SiteConfig) => {
    console.log(config)
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
    //console.log(initialConfig.userID, subDomain, initialConfig)
  
    // Transfer images and update URLs
    const response = await fetch('/api/siteConfig/transferImages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ siteConfig: initialConfig }),
    });
    const { updatedConfig } = await response.json();

    console.log(updatedConfig)

    await saveConfig(subDomain, updatedConfig)
  }

  const onLaunchPopup = () => {
    if (fromDashboard) {
      onUpdate();
    } else {
      setIsLaunchPopupOpen(true);
    }
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
      <div key={key} className="flex items-center justify-between">
        <span className="text-sm text-black capitalize">{key}</span>
        <button
          className="w-8 h-8 rounded-full border border-gray-300"
          style={{ backgroundColor: value }}
          onClick={() => handleColorButtonClick(key as keyof Colors)}
        ></button>
        {activeColorPicker === key && isColorPickerOpen && (
          <div ref={colorRef} className="absolute right-full mr-2 bottom-16 z-10">
            <HexColorPicker color={value} onChange={handleColorChange} />
          </div>
        )}
      </div>
    ));
  };

  const onUpdate = async() => {
    // Transfer images and update URLs
    const response = await fetch('/api/siteConfig/transferImages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ siteConfig: initialConfig }),
    });
    const { updatedConfig } = await response.json();

    console.log(updatedConfig)

    // Call the update API route
    const updateResponse = await fetch('/api/siteConfig/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clubName: subDomain, siteConfig: updatedConfig }),
    });

    const updateData = await updateResponse.json();
    console.log(updateData.message);

    if (updateData.message !== "Site config updated successfully!") {
      setLaunchError(updateData.message)
    } else {
      setLaunchError("")
      setIsLaunched(true)
      setIsLaunchPopupOpen(false)
    }
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
          <Button className='ml-2 md:ml-8 rounded-[15px] bg-entourage-blue text-black hover:bg-entourage-blue hover:scale-105 transition-all' onClick={onPreview}>
            Preview
            <Image src="./screen-share.svg" alt="preview" width={20} height={20} className='ml-2'/>
          </Button>
          <Button className='rounded-[15px] bg-entourage-blue text-black hover:bg-entourage-blue hover:scale-105 transition-all' onClick={onLaunchPopup}>
            {fromDashboard ? 'Save Changes' : 'Launch'}
            <Image src={fromDashboard ? "./save.svg" : "./rocket.svg"} alt={fromDashboard ? "save" : "launch"} width={20} height={20} className='ml-2'/>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-16">{children}</div>

      {/* Right-side column for color selection */}
      {isColorPopupOpen && (
        <div className="fixed top-0 right-0 bottom-0 w-64 bg-gray-100 shadow-lg z-50 flex flex-col">
          <div className="p-4 border-b border-gray-300">
            <h2 className="text-xl font-bold text-black">Color Selection</h2>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4">
            {/* Predefined palettes */}
            {[urbanchicColors, pastels, vintageCharm, oceanBreeze, mintForest, midnightGlow, darkForest, volcanicNight, sunsetSerenade, arcticFrost, moonlitDesert, emeraldNight, cosmicPurple, charcoalAutumn].map((palette, index) => (
              <div key={index} className="mb-6 cursor-pointer" onClick={() => handleColorSetClick(palette)}>
                <div className="flex space-x-2 p-2 bg-white rounded-md shadow-sm">
                  {renderColorBlocks(palette)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Custom color picker */}
          <div className="p-4 border-t border-gray-300">
            <h3 className="text-lg font-semibold text-black mb-2">Custom</h3>
            <div className="flex flex-col space-y-2">
              {renderColorPickers()}
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-300">
            <Button className='w-full bg-entourage-blue text-black hover:bg-entourage-blue hover:scale-105 transition-all' onClick={() => setIsColorPopupOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Right-side column for font selection */}
      {isFontPopupOpen && (
        <div className="fixed top-0 right-0 bottom-0 w-64 bg-gray-100 shadow-lg z-50 flex flex-col">
          <div className="p-4 border-b border-gray-300">
            <h2 className="text-xl font-bold text-black">Font Selection</h2>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4">
            <div className="mb-6">
              <div className="flex flex-col items-center mb-4">
                <div className="flex items-center justify-center w-full mb-2">
                  <span className={`text-sm font-medium mr-2 ${activeFontTab === 'title' ? 'text-entourage-blue' : 'text-black'}`}>Title</span>
                  <div 
                    className="w-12 h-6 bg-gray-200 rounded-full p-1 cursor-pointer"
                    onClick={() => setActiveFontTab(activeFontTab === 'title' ? 'text' : 'title')}
                  >
                    <div
                      className={`bg-entourage-blue w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                        activeFontTab === 'text' ? 'translate-x-6' : ''
                      }`}
                    ></div>
                  </div>
                  <span className={`text-sm font-medium ml-2 ${activeFontTab === 'text' ? 'text-entourage-blue' : 'text-black'}`}>Text</span>
                </div>
                <p className="text-xs text-black">
                  Editing <span className="font-semibold text-entourage-blue">{activeFontTab === 'title' ? 'Title' : 'Text'}</span> Font
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {Object.keys(fontMap).map((fontName) => (
                <FontPreview 
                  key={fontName} 
                  fontName={fontName as FontName} 
                  onClick={() => handleFontChange(fontName as FontName)}
                  isSelected={(activeFontTab === 'title' ? selectedTitleFont : selectedTextFont) === fontName}
                />
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-300">
            <Button className='w-full bg-entourage-blue text-white hover:bg-entourage-blue hover:scale-105 transition-all' onClick={() => setIsFontPopupOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
