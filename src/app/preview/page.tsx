"use client"

import React, { useEffect, useState, Suspense } from 'react';
import RenderSite from '../../modules/renderSite/renderSite';
import { SiteConfig } from '../../../utils/types/layoutTypes';
import { PreviewUI } from './previewUI';
import { useSearchParams } from 'next/navigation';

function BuildSiteContent() {
    const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
    const [isMobilePreview, setIsMobilePreview] = useState(false);
    const searchParams = useSearchParams();
    const fromDashboard = searchParams!.get('from') === 'dashboard';

    useEffect(() => {
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
        <div className="">
            <div className='fixed z-30 flex w-full justify-center mt-2'>
                <PreviewUI fromDashboard={fromDashboard}/>
            </div>
            <RenderSite siteConfig={siteConfig} />
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