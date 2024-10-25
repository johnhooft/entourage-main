'use client'

import React, { useEffect, useState } from 'react';
import RenderSite from '../../modules/renderSite/renderSite';
import { SiteConfig } from '../../../utils/types/layoutTypes';
import Spinner from '../../modules/LoadingPulsate';
 
export default function Page({ params }: { params: { slug: string } }) {

    //console.log(params.slug)

    const [siteConfig, setSiteConfig] = useState<any | null>(null);
    const [siteConfigFound, setSiteConfigFound] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchSiteConfig = async (subdomain: string) => {
        const lowercaseClubName = Array.isArray(subdomain) ? subdomain[0].toLowerCase() : subdomain.toLowerCase();
        // console.log(lowercaseClubName);
        const response = await fetch('/api/siteConfig/fetch/byname', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subdomain: lowercaseClubName }),
        });
        
        const data = await response.json();
        //console.log(data);

        if (data.message === "Site config found") { 
            setSiteConfig(data.clubSite.site_config)
        }
    }

    useEffect(() => {
        if (siteConfig) {
            console.log("SiteConfig:", siteConfig);
            setSiteConfigFound(true)
        }
    }, [siteConfig]);

    useEffect(() => {
        fetchSiteConfig(params.slug);
    }, [params.slug]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Stop loading after 10 seconds
        }, 10000);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    return (
        <div>
            {(siteConfigFound && siteConfig) && (
                <div>
                    <RenderSite siteConfig={siteConfig} />
                </div>
            )}
            {!siteConfigFound && loading && ( // Check for loading state
                <div className="w-screen h-screen flex justify-center items-center">
                    <Spinner />
                </div>
            )}
            {!siteConfigFound && !loading && ( // Render message after loading
                <div className="w-screen h-screen flex justify-center items-center">
                    Could Not Load: {params.slug}
                </div>
            )}
        </div>
    )
}
