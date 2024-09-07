import React, { useEffect, useState } from 'react';
import InfoScroll from './InfoScroll';
import SiteBigText from './SiteBigText';

interface ClubData {
  clubName: string;
  clubPurpose: string;
  clubVibe: string;
}

interface SiteData {
  clubData: ClubData;
  generatedContent: {
    clubCopy: any;
    clubImages: any;
  };
}

interface SiteProps {
  siteData: SiteData;
}

const Site: React.FC<SiteProps> = ({ siteData }) => {
  const [imageHits, setImageHits] = useState<any>(null);

  const { clubData, generatedContent } = siteData;
  const { clubCopy, clubImages } = generatedContent;

  useEffect(() => {
    console.log('Site component mounted');
    console.log(clubCopy);
    console.log(clubImages);
    
    return () => {
      console.log('Site component will unmount');
    };
  }, []);

  if (!clubData.clubName || !Object.keys(clubCopy).length) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <header className="bg-[#000000] text-[#ffffff] py-5 px-10 flex items-center justify-between border-b-2 border-[#ffffff]">
        <div className="flex items-center justify-between w-full">
          <div className="bg-gray-400 text-[#000000] p-2 rounded-full font-bold mr-5 text-center">Logo Here</div>
          <div className="flex gap-5 text-xl">
            {clubCopy.Memberships && <span className="bg-gray-400 text-black px-3 py-1 rounded">Memberships</span>}
            {clubCopy.Events && <span className="bg-gray-400 text-black px-3 py-1 rounded">Events</span>}
            {clubCopy.Trips && <span className="bg-gray-400 text-black px-3 py-1 rounded">Trips</span>}
            {clubCopy.Culture && <span className="bg-gray-400 text-black px-3 py-1 rounded">Culture</span>}
            {clubCopy['Executive Team'] && <span className="bg-gray-400 text-black px-3 py-1 rounded">Executive Team</span>}
          </div>
        </div>
      </header>
      <div className="items-center">
        <div>
          <SiteBigText clubName={clubData.clubName} />
        </div>
        <div>
          <InfoScroll generatedContent={clubCopy} imageHits={clubImages} />
        </div>
      </div>
    </div>
  );
};

export default Site;