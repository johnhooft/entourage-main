"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/authState';
import RenderSite from '../renderSite/renderSite';
import { SiteConfig } from '../../../utils/types/layoutTypes';
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconLogout, IconEdit, IconTrash, IconDashboard } from "@tabler/icons-react";
import Link from 'next/link';
import { Logo } from '../corp/Logo';
import { cn } from "@/lib/utils";

const Dashboard = () => {
    const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
    const router = useRouter();
    const { user, loading, logout } = useAuth();
    const [open, setOpen] = useState(false);  // Change this line
    const [animatedText, setAnimatedText] = useState('');

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
          router.push('/signin');
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
            sessionStorage.setItem('siteConfig', JSON.stringify(siteConfig));
            router.push('/buildsite');
        } else {
            console.error('No site configuration available to edit');
        }
    }

    const links = [
        // {
        //     label: "Dashboard",
        //     href: "#",
        //     icon: <IconDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
        // },
        {
            label: "Edit Site",
            href: "#",
            icon: <IconEdit className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
            onClick: onEditSite,
        },
        {
            label: "Delete Site",
            href: "#",
            icon: <IconTrash className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
        },
        {
            label: "Sign Out",
            href: "#",
            icon: <IconLogout className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
            onClick: onLogout,
        },
    ];
    
    useEffect(() => {
        if (open) {
            const text = 'entourage';
            let index = 0;
            const intervalId = setInterval(() => {
                setAnimatedText((prev) => prev + text[index]);
                index++;
                if (index === text.length) {
                    clearInterval(intervalId);
                }
            }, 100); // Adjust timing as needed
            return () => clearInterval(intervalId);
        } else {
            setAnimatedText('');
        }
    }, [open]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={cn(
            "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-full flex-1 border border-neutral-200 dark:border-neutral-700",
        )}>
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1">
                        <div className="h-12 w-12 relative flex items-center">
                            <div className={`absolute top-0 right-[15px] w-full h-full transition-transform duration-300 ease-in-out ${open ? 'scale-[60%]' : 'scale-[35%]'}`}>
                                <Link href="/">
                                    <Logo />
                                </Link>
                            </div>
                            {open && (
                                <div className="mt-5 ml-12 text-xl font-bold text-neutral-700 dark:text-neutral-200">
                                    {animatedText}
                                </div>
                            )}
                        </div>
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                </SidebarBody>
            </Sidebar>
            <div className="flex flex-1">
                <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
                    {(!siteConfig) && (
                        <div className='text-neutral-700 dark:text-neutral-200'>No Site Associated with your Login.</div>
                    )}
                    {(siteConfig) && (
                        <div className='overflow-y-scroll overflow-x-hidden border-2 border-neutral-200 dark:border-neutral-700 rounded-[15px] h-full'>
                            <RenderSite siteConfig={siteConfig} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
