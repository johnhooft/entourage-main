import React, {useState} from 'react';
import { default as HeroSection } from './renderHeroSection';
import { default as MovingCards } from './renderMovingCards';
import { default as Scroll } from './renderScroll';
import SiteFooter from './renderSiteFooter';
import { SiteConfig } from '../../../utils/types/layoutTypes';
import ExpandedTrips from './renderExpandedTrips';
import ExpandedEvents from './renderExpandedEvents';
import ExpandedMemberships from './renderExpandedMemberships';
import ExpandedExec from './renderExpandedExec';
import FullscreenExpandableMenu from '../site/NavMenu';

interface SiteProps {
  siteConfig: SiteConfig;
}

const expandedPageMap: { [key: string]: React.ComponentType<any> } = {
  ExpandedTrips,
  ExpandedEvents,
  ExpandedMemberships,
  ExpandedExec,
};

const componentMap: { [key: string]: React.ComponentType<any> } = {
  HeroSection,
  MovingCards,
  Scroll,
};

const RenderSite: React.FC<SiteProps> = ({ siteConfig }) => {
  const [showExpandedPage, setShowExpandedPage] = useState(""); // ExpandedTrips ExpandedEvents

  if (!siteConfig) {
    return <p>Loading...</p>;
  }

  //console.log(siteConfig.footer)

  const colors = siteConfig.colors;
  const fonts = siteConfig.fonts;
  
  return (
    <div className="flex flex-col flex-grow items-center">
      {showExpandedPage && expandedPageMap[showExpandedPage] ? (
        <div className="w-screen min-h-fit flex flex-col flex-grow">
          <div className='fixed right-6 top-6 z-50'>
            <FullscreenExpandableMenu 
              colors={colors}
              siteSections={siteConfig.layout[0].props.siteSections}
              setExpandedPage={setShowExpandedPage}
            />
          </div>
          {React.createElement(expandedPageMap[showExpandedPage], {
            ...siteConfig.expandedPages.find(page => page.component === showExpandedPage)?.props,
            colors,
            fonts,
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
            <div key={index} className="w-full overflow-hidden">
              <Component 
                {...item.props} 
                colors={colors} 
                fonts={fonts}
                setShowExpandedPage={setShowExpandedPage}
              />
            </div>
          );
        })
      )}
      <div className='w-full'>
        <SiteFooter links={siteConfig.footer.links}/>
      </div>
    </div>
  );
};

export default RenderSite;