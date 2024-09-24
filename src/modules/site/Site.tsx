import React, { useState } from 'react';
import HeroSection from './HeroSection';
import MovingCards from './MovingCards';
import InfoScroll from './InfoScroll';
import Scroll from './Scroll';
import { SiteFooter } from './SiteFooter';
import ColorPickerWheel from './ColorWheel';
import FullscreenExpandableMenu from './NavMenu';
import { SiteConfig } from '../../../utils/types/layoutTypes';

interface SiteProps {
  siteConfig: SiteConfig;
}

const componentMap: { [key: string]: React.ComponentType<any> } = {
  HeroSection,
  MovingCards,
  Scroll,
};


const Site: React.FC<SiteProps> = ({ siteConfig }) => {
  const [config, setConfig] = useState<SiteConfig>(siteConfig);

  if (!siteConfig) {
    return <p>Loading...</p>;
  }

  const colors = siteConfig.colors
  const fonts = siteConfig.fonts

  const updateConfig = (index: number, newProps: any) => {
    const updatedLayout = [...config.layout];
    updatedLayout[index].props = { ...updatedLayout[index].props, ...newProps };
    setConfig({ ...config, layout: updatedLayout });
  };
  
  console.log(siteConfig)
 
  return (
    <div className="flex flex-col flex-grow items-center">
      <div className="fixed top-16 md:top-20 right-1 md:right-4 z-50">
        <FullscreenExpandableMenu colors={colors} siteSections={siteConfig.layout[0].props.siteSections}/>
      </div>
      {siteConfig.layout.map((item, index) => {
        const Component = componentMap[item.component];
        if (!Component) {
          console.warn(`Component ${item.component} not found`);
          return null;
        }
        return (
          <div key={index} className="w-screen">
            <Component {...item.props} colors={colors} fonts={fonts} updateConfig={(newProps: any) => updateConfig(index, newProps)} />
          </div>
        );
      })}
      <SiteFooter />
    </div>
  );
};

export default Site;