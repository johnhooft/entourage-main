import React, { useState } from 'react';
import { SiteConfig, Colors } from '../../../utils/types/layoutTypes';

interface StyleChangerProps {
  children: React.ReactNode;
  initialConfig: SiteConfig;
  onConfigChange: (newConfig: SiteConfig) => void;
}

export const StyleChanger: React.FC<StyleChangerProps> = ({ children, initialConfig, onConfigChange }) => {
  const [isBottomPopupOpen, setIsBottomPopupOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(initialConfig.colors);

  const handleComponentStyleChange = (componentIndex: number, propName: string, value: any) => {
    const newConfig = { ...initialConfig };
    newConfig.layout[componentIndex].props[propName] = value;
    onConfigChange(newConfig);
  };

  const openBottomPopup = () => {
    setIsBottomPopupOpen(true);
  };

  const handleColorSetClick = (colorSet: Colors) => {
    const newConfig = { ...initialConfig, colors: colorSet };
    setSelectedTheme(colorSet);
    onConfigChange(newConfig);
  };

  const lightBlueWhiteColors: Colors = {
    primary: 'hsla(210, 100%, 50%, 1)',
    accent: 'hsla(195, 100%, 50%, 1)',
    background: 'hsla(206, 14%, 21%, 1)',
    text: 'hsla(210, 36%, 96%, 1)',
  };

  const pastelGreenColors: Colors = {
    primary: 'hsla(158, 55%, 78%, 1)',
    accent: 'hsla(83, 55%, 84%, 1)',
    background: 'hsla(90, 40%, 95%, 1)',
    text: 'hsla(0, 0%, 20%, 1)',
  };

  const entourageColors: Colors = {
    primary: 'hsla(208, 73%, 81%, 1)',
    accent: 'hsla(17, 100%, 55%, 1)',
    background: 'hsla(0, 0%, 13%, 1)',
    text: 'hsla(0, 11%, 96%, 1)',
  };

  const slateBlueLilac: Colors = {
    primary: 'hsla(231, 44%, 56%, 1)',
    accent: 'hsla(262, 47%, 63%, 1)',
    background: 'hsla(200, 12%, 95%, 1)',
    text: 'hsla(0, 0%, 26%, 1)',
  };

  const blackGreen: Colors = {
    primary: 'hsla(124, 48%, 49%, 1)',
    accent: 'hsla(124, 100%, 50%, 1)',
    background: 'hsla(0, 0%, 0%, 1)',
    text: 'hsla(0, 0%, 95%, 1)',
  };

  const renderColorBlocks = (colors: Colors) => {
    return Object.entries(colors).map(([key, value]) => (
      <div key={key} className="w-16 h-10" style={{ backgroundColor: value }}></div>
    ));
  };

  return (
    <div className="relative min-h-screen">
      {/* Top bar for selecting menu */}
      <div className="fixed top-0 left-0 right-0 bg-[#D9D9D9] p-5 z-50 text-black">
        <button className="px-5" onClick={openBottomPopup}>
          Change Theme
        </button>
      </div>

      {/* Main content */}
      <div className="pt-16 pb-16">{children}</div>

      {/* Bottom popup for theme selection */}
      {isBottomPopupOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#D9D9D9] p-4 z-50 text-black">
          <div className="flex flex-row w-full px-5">
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
          <button onClick={() => setIsBottomPopupOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};
