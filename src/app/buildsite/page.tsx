"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Site from '../../modules/site/Site';
import { StyleChanger } from '@/modules/site/SiteGenUI';
import { SiteConfig } from '../../../utils/types/layoutTypes';

function BuildSiteContent() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const searchParams = useSearchParams();
  const fromDashboard = searchParams!.get('from') === 'dashboard';

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

  console.log("Site Config Changed:", siteConfig);

  return (
    <div className="flex flex-col">
      <StyleChanger initialConfig={siteConfig} onConfigChange={setSiteConfig} fromDashboard={fromDashboard}>
        <Site siteConfig={siteConfig} onConfigChange={setSiteConfig} />
      </StyleChanger>
    </div>
  );
}

export default function BuildSite() {
  return (
    <Suspense fallback={<div className='text-white'>Loading...</div>}>
      <BuildSiteContent />
    </Suspense>
  );
}
