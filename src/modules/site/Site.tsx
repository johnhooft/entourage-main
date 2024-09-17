import React, { useState } from 'react';
import HeroSection from './HeroSection';
import MovingCards from './MovingCards';
import InfoScroll from './InfoScroll';
import ColorPickerWheel from './ColorWheel';
import { SiteConfig } from '../../../utils/types/layoutTypes';

interface SiteProps {
  siteConfig: SiteConfig;
}

const componentMap: { [key: string]: React.ComponentType<any> } = {
  HeroSection,
  MovingCards,
  InfoScroll,
};

const Site: React.FC<SiteProps> = ({ siteConfig }) => {
  const [config, setConfig] = useState<SiteConfig>(siteConfig);

  if (!siteConfig) {
    return <p>Loading...</p>;
  }
 
  const updateConfig = (index: number, newProps: any) => {
    const updatedLayout = [...config.layout];
    updatedLayout[index].props = { ...updatedLayout[index].props, ...newProps };
    setConfig({ ...config, layout: updatedLayout });
  };
  
  console.log(siteConfig.layout)
 
  return (
    <div className="flex flex-col flex-grow items-center">
      {siteConfig.layout.map((item, index) => {
        const Component = componentMap[item.component];
        if (!Component) {
          console.warn(`Component ${item.component} not found`);
          return null;
        }
        return (
          <div key={index} className="w-screen">
            <Component {...item.props} />
            {/* { index==0 && (
              <button
                onClick={() =>
                  updateConfig(index, { textColor: 'text-red-500' }) // Example to change text color
                }
              >
                Change Text Color
              </button>
            ) } */}
          </div>
        );
      })}
    </div>
  );
};

export default Site;