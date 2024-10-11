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

    const onEditSite = () => {
        if (siteConfig) {
        // Store the siteConfig in sessionStorage
        sessionStorage.setItem('siteConfig', JSON.stringify(siteConfig));
        
        // Redirect to the buildsite page
        router.push('/buildsite');
        } else {
        console.error('No site configuration available to edit');
        // Optionally, you can show an error message to the user here
        }
    }
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-full h-full flex flex-row justify-evenly'>
            <div className='w-[10%] h-full flex flex-col text-white gap-10 p-5'>
                <button onClick={onLogout} className='bg-white text-black rounded-md'>
                    Signout
                </button>
                <button 
                    onClick={onEditSite}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                    Edit Site
                </button>
                <button className="bg-red-500 text-black px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300">
                    Delete Site
                </button>
            </div>
            <div className="w-[90%] h-full">
                    {(!siteConfig) && (
                        <div className='text-white'>Site Config Missing!</div>
                    )}
                    {(siteConfig) && (
                        <div className='overflow-y-scroll overflow-x-hidden border-2 border-black rounded-[15px]'>
                            <RenderSite siteConfig={siteConfig} />
                        </div>
                    )}
            </div>
        </div>
    )

}

export default Dashboard;