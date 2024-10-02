import React from 'react';
import { default as HeroSection } from './HeroSectionRender';
import { default as MovingCards } from './MovingCardsRender';
import { default as Scroll } from './ScrollRender';
import { SiteFooter } from '../site/SiteFooter';
import FullscreenExpandableMenu from '../site/NavMenu';
import { SiteConfig } from '../../../utils/types/layoutTypes';

interface SiteProps {
  siteConfig: SiteConfig;
}

const componentMap: { [key: string]: React.ComponentType<any> } = {
  HeroSection,
  MovingCards,
  Scroll,
};

const RenderSite: React.FC<SiteProps> = ({ siteConfig }) => {
  if (!siteConfig) {
    return <p>Loading...</p>;
  }

  const colors = siteConfig.colors;
  const fonts = siteConfig.fonts;
  
  return (
    <div className="flex flex-col flex-grow items-center">
      <div className="fixed top-2 right-2 z-50">
        <FullscreenExpandableMenu colors={colors} siteSections={siteConfig.layout[0].props.siteSections}/>
      </div>
      {siteConfig.layout.map((item, index) => {
        const Component = componentMap[item.component];
        if (!Component) {
          console.warn(`Component ${item.component} not found`);
          return null;
        }
        return (
          <div key={index} className="w-full">
            <Component {...item.props} colors={colors} fonts={fonts}/>
          </div>
        );
      })}
      <SiteFooter />
    </div>
  );
};

export default RenderSite;