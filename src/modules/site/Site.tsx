import React, { useState } from 'react';
import HeroSection from './HeroSection';
import MovingCards from './MovingCards';
import Scroll from './Scroll';
import SiteFooter from './SiteFooter';
import { SiteConfig } from '../../../utils/types/layoutTypes';
import ExpandedTrips from './ExpandedTrips';
import ExpandedEvents from './ExpandedEvents';
import ExpandedExec from './ExpandedExec';
import ExpandedMemberships from './ExpandedMemberships'

interface SiteProps {
  siteConfig: SiteConfig;
}

const expandedPageMap: { [key: string]: React.ComponentType<any> } = {
  ExpandedTrips,
  ExpandedEvents,
  ExpandedExec,
  ExpandedMemberships,
};

const componentMap: { [key: string]: React.ComponentType<any> } = {
  HeroSection,
  MovingCards,
  Scroll,
};

const Site: React.FC<SiteProps> = ({ siteConfig }) => {
  const [config, setConfig] = useState<SiteConfig>(siteConfig);
  const [showExpandedPage, setShowExpandedPage] = useState<keyof typeof expandedPageMap | "">("");

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
 
  const updateFooterLinks = (newLinks: any) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      footer: {
        ...prevConfig.footer,
        links: {
          ...prevConfig.footer.links,
          ...newLinks
        }
      }
    }));
  };

  return (
    <div className={`flex flex-col flex-grow items-center ${showExpandedPage ? 'overflow-hidden' : ''}`}>
      {showExpandedPage && expandedPageMap[showExpandedPage] ? (
        <div key={showExpandedPage} className="fixed inset-0 top-20 z-40 overflow-y-auto">
          {React.createElement(expandedPageMap[showExpandedPage], {
            ...siteConfig.expandedPages.find(page => page.component === showExpandedPage)?.props,
            colors,
            fonts,
            updateConfig: (newProps: any) => updateConfig(
              siteConfig.expandedPages.findIndex(page => page.component === showExpandedPage),
              newProps,
              true
            ),
            setShowExpandedPage,
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
                setExpandedPage={setShowExpandedPage}
              />
            </div>
          );
        })
      )}
      <SiteFooter 
        links={config.footer.links} 
        updateConfig={updateFooterLinks}
      />
    </div>
  );
};

export default Site;
