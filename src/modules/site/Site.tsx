import React, { useState } from 'react';
import HeroSection from './HeroSection';
import MovingCards from './MovingCards';
import Scroll from './Scroll';
import { SiteFooter } from './SiteFooter';
import FullscreenExpandableMenu from './NavMenu';
import { SiteConfig } from '../../../utils/types/layoutTypes';
import ExpandedTrips from './ExpandedTrips';
import ExpandedEvents from './ExpandedEvents';

interface SiteProps {
  siteConfig: SiteConfig;
}

const expandedPageMap: { [key: string]: React.ComponentType<any> } = {
  ExpandedTrips,
  ExpandedEvents,
};

const componentMap: { [key: string]: React.ComponentType<any> } = {
  HeroSection,
  MovingCards,
  Scroll,
};

const Site: React.FC<SiteProps> = ({ siteConfig }) => {
  const [config, setConfig] = useState<SiteConfig>(siteConfig);
  const [showExpandedPage, setShowExpandedPage] = useState("ExpandedEvents"); // ExpandedTrips ExpandedEvents

  if (!siteConfig) {
    return <p>Loading...</p>;
  }

  const colors = siteConfig.colors
  const fonts = siteConfig.fonts

  const updateConfig = (index: number, newProps: any, fromExpandedPage: boolean) => {

    console.log(newProps, index);

    if (fromExpandedPage) {
      const updatedExpandedPages = [...config.expandedPages];
      updatedExpandedPages[index].props = { ...updatedExpandedPages[index].props, ...newProps };
      setConfig({ ...config, expandedPages: updatedExpandedPages });
    } else {
      const updatedLayout = [...config.layout];
      updatedLayout[index].props = { ...updatedLayout[index].props, ...newProps };
      console.log(updatedLayout);
      setConfig({ ...config, layout: updatedLayout });
    }
  };
  
  console.log(siteConfig)
 
  return (
    <div className="flex flex-col flex-grow items-center">
      {showExpandedPage && expandedPageMap[showExpandedPage] ? (
        <div className="absolute top-20 left-0 w-screen h-screen z-40">
          {React.createElement(expandedPageMap[showExpandedPage], {
            ...siteConfig.expandedPages.find(page => page.component === showExpandedPage)?.props,
            colors,
            fonts,
            updateConfig: (newProps: any) => updateConfig(
              siteConfig.expandedPages.findIndex(page => page.component === showExpandedPage),
              newProps,
              true
            ),
            setShowExpandedPage: setShowExpandedPage
          })}
        </div>
      ) : (
        siteConfig.layout.map((item, index) => {
          const Component = componentMap[item.component];
          if (!Component) {
            console.warn(`Component ${item.component} not found`);
            return null;
          }
          return (
            <div key={index} className="w-screen">
              <Component
                {...item.props}
                colors={colors}
                fonts={fonts}
                updateConfig={(newProps: any) => updateConfig(index, newProps, false)}
              />
            </div>
          );
        })
      )}
      <SiteFooter />
    </div>
  );
};

export default Site;