'use client'

import React, { useEffect, useState } from 'react';
import RenderSite from '../../modules/renderSite/renderSite';
import { SiteConfig } from '../../../utils/types/layoutTypes';
 
export default function Page({ params }: { params: { slug: string } }) {

    console.log(params.slug)

    const [siteConfig, setSiteConfig] = useState<any | null>(null);
    const [siteConfigFound, setSiteConfigFound] = useState(false);

    const fetchSiteConfig = async (clubName: string) => {
        const response = await fetch('/api/siteConfig/fetch/byname', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ clubName }),
        });
        
        const data = await response.json();
        console.log(data);

        if (data.message === "Site config found") { 
            setSiteConfig(data.clubSite.site_config)
        }
    }

    useEffect(() => {
        if (siteConfig) {
            console.log("Updated siteConfig:", siteConfig);
            setSiteConfigFound(true)
        }
    }, [siteConfig]);

    useEffect(() => {
        fetchSiteConfig(params.slug);
    }, [params.slug]);

    return (
        <div>
            {(siteConfigFound && siteConfig) && (
                <div>
                    <RenderSite siteConfig={siteConfig} />
                </div>
            )}
            {!siteConfigFound && (
                <div className="text-white">
                    Could Not Load: {params.slug}
                </div>
            )}
        </div>
    )
}