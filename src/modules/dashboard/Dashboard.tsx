import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/authState';
import RenderSite from '../renderSite/renderSite';
import { SiteConfig } from '../../../utils/types/layoutTypes';

const Dashboard = () => {
    const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
    const router = useRouter();
    const { user, loading, logout } = useAuth();

    const fetchSiteConfig = async (userID: string) => {
        const response = await fetch('/api/siteConfig/fetch/byid', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userID }),
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
        }
    }, [siteConfig]);

    useEffect(() => {
        if (!loading && !user) {
          router.push('/login');
        }
        else if (user) { 
            console.log("get site config at ID: ", user.id)
            fetchSiteConfig(user.id)
        }
    }, [user, loading, router]);

    const onLogout = async () => {
        logout()
    }
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-full h-full flex flex-row'>
            <div className='w-fit h-full flex flex-col text-white'>
                <p>Dashboard</p>
                <button onClick={onLogout} className='mt-10'>
                    Signout
                </button>
            </div>
            <div className="flex flex-col w-full h-full justify-center items-center rounded-[15px]">
                    {(!siteConfig) && (
                        <div className='text-white'>Site Config Missing!</div>
                    )}
                    {(siteConfig) && (
                        <div className='overflow-y-scroll overflow-x-hidden max-w-screen-xl'>
                            <RenderSite siteConfig={siteConfig} />
                        </div>
                    )}
            </div>
        </div>
    )

}

export default Dashboard;