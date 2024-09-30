"use client";

import React, { useEffect, useState } from 'react';
import Site from '../../modules/site/Site';
import { StyleChanger } from '@/modules/site/SiteGenUI';
import { SiteConfig } from '../../../utils/types/layoutTypes';

export default function BuildSite() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    // Retrieve the config from sessionStorage
    const storedConfig = sessionStorage.getItem('siteConfig');
    if (storedConfig) {
      try {
        const parsedConfig = JSON.parse(storedConfig);
        setSiteConfig(parsedConfig);
      } catch (error) {
        console.error("Error parsing siteConfig:", error);
      }
    }
  }, []);

  if (!siteConfig) {
    return <div className='text-white'>Site Config Missing!</div>;
  }

  return (
    <div className="flex flex-col">
      <StyleChanger initialConfig={siteConfig} onConfigChange={setSiteConfig}>
        <Site siteConfig={siteConfig} />
      </StyleChanger>
    </div>
  );
}