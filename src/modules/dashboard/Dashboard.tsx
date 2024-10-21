"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/authState';
import RenderSite from '../renderSite/renderSite';
import { SiteConfig } from '../../../utils/types/layoutTypes';
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconLogout, IconEdit, IconTrash, IconDashboard, IconLink, IconExternalLink } from "@tabler/icons-react";
import Link from 'next/link';
import { Logo } from '../corp/Logo';
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Dashboard = () => {
    const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
    const router = useRouter();
    const { user, loading, logout } = useAuth();
    const [open, setOpen] = useState(false);  // Change this line
    const [animatedText, setAnimatedText] = useState('');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isSubdomainDialogOpen, setIsSubdomainDialogOpen] = useState(false);
    const [subDomain, setSubDomain] = useState("")
    const [newSubdomain, setNewSubdomain] = useState("");
    const [subdomainError, setSubdomainError] = useState("");

    useEffect(() => {
        // This will only run on the client side
        document.documentElement.classList.add('dark');
    }, []);

    const fetchSiteConfig = async (userID: string) => {
        const response = await fetch('/api/siteConfig/fetch/byid', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userID }),
        });
        
        const data = await response.json();
        //console.log(data);

        if (data.message === "Site config found") { 
            setSiteConfig(data.siteConfig)
            setSubDomain(data.subDomain)
        }
    }

    useEffect(() => {
        if (siteConfig) {
            setSubDomain(siteConfig.subdomain)
            console.log("SiteConfig:", siteConfig);
        }
    }, [siteConfig]);

    useEffect(() => {
        if (!loading && !user) {
          router.push('/signin');
        }
        else if (user) { 
            //console.log("get site config at ID: ", user.id)
            fetchSiteConfig(user.id)
        }
    }, [user, loading, router]);

    const onLogout = async () => {
        logout()
    }

    const onCreateOrEditSite = () => {
        if (siteConfig) {
            sessionStorage.setItem('siteConfig', JSON.stringify(siteConfig));
            router.push('/buildsite?from=dashboard');
        } else {
            router.push('/questionnaire');
        }
    }

    const onDeleteSite = async () => {
        if (user) {
            try {
                const response = await fetch('/api/siteConfig/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userID: user.id }),
                });
                
                const data = await response.json();
                
                if (data.message === "Site config and associated images deleted successfully") {
                    setSiteConfig(null);
                    // Optionally, show a success message to the user
                } else {
                    console.error('Failed to delete site config');
                    // Optionally, show an error message to the user
                }
            } catch (error) {
                console.error('Error deleting site config:', error);
                // Optionally, show an error message to the user
            }
        }
    };

    const handleSubdomainUpdate = async () => {
        if (user && siteConfig) {
            try {
                const lowercaseSubdomain = Array.isArray(newSubdomain) ? newSubdomain[0].toLowerCase() : newSubdomain.toLowerCase();
                const response = await fetch('/api/siteConfig/updateSubdomain', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userID: user.id, newSubdomain: lowercaseSubdomain }),
                });
                
                const data = await response.json();
            } catch (error) {
                console.error('Error updating subdomain:', error);
                setSubdomainError("An unexpected error occurred");
            }
            setSubDomain(newSubdomain)
        }
    };

    const onViewSite = () => {
        console.log(siteConfig, subDomain)
        if (siteConfig && subDomain) {
            router.push(`/${subDomain}`);
        } else {
            // Optionally, show a message that the site is not available
            console.log("Site is not available");
        }
    };

    const links = [
        {
            label: siteConfig ? "Edit Site" : "Create Site",
            href: "#",
            icon: <IconEdit className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
            onClick: onCreateOrEditSite,
        },
        {
            label: "View Site",
            href: "#",
            icon: <IconExternalLink className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
            onClick: onViewSite,
        },
        {
            label: "Update Subdomain",
            href: "#",
            icon: <IconLink className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
            onClick: () => setIsSubdomainDialogOpen(true),
        },
        {
            label: "Delete Site",
            href: "#",
            icon: <IconTrash className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
            onClick: () => setIsDeleteDialogOpen(true),
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
                setAnimatedText((prev) => {
                    if (index >= text.length) {
                        clearInterval(intervalId);
                        return prev;
                    }
                    const newText = prev + text[index];
                    index++;
                    return newText;
                });
            }, 100);

            return () => {
                clearInterval(intervalId);
            };
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
                    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <AlertDialogContent className='bg-white text-black'>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to delete your site?</AlertDialogTitle>
                                <AlertDialogDescription className='text-black/70'>
                                    This action cannot be undone. This will permanently delete your site configuration.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <div className='flex w-full justify-between'>
                                    <AlertDialogCancel className='bg-transparent border-[1px] rounded-[15px] hover:bg-black/30 hover:text-black'>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={onDeleteSite} className='bg-transparent border-[1px] rounded-[15px] hover:bg-red-500/70 hover:text-black'>Delete</AlertDialogAction>
                                </div>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog open={isSubdomainDialogOpen} onOpenChange={setIsSubdomainDialogOpen}>
                        <AlertDialogContent className='bg-entourage-black text-white'>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Update Your Subdomain</AlertDialogTitle>
                                <AlertDialogDescription className='text-white/70'>
                                    Enter your new subdomain below. This will update your site&apos;s URL.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className='flex flex-col space-y-4'>
                                <div className='flex flex-grow border-[1px] rounded-[15px] border-entourage-orange p-2'>
                                    <span className='text-entourage-blue text-xl'>entourage-ai.com/</span>
                                    <input 
                                        type='text' 
                                        value={newSubdomain} 
                                        onChange={(e) => setNewSubdomain(e.target.value)} 
                                        className='text-white text-xl bg-transparent border-none focus:outline-none focus:border-b focus:border-entourage-blue'
                                        placeholder='your-new-subdomain'
                                    />
                                </div>
                                {subdomainError && (
                                    <div className='text-sm text-red-500 font-bold'>
                                        {subdomainError}
                                    </div>
                                )}
                            </div>
                            <AlertDialogFooter>
                                <div className='flex w-full justify-between'>
                                    <AlertDialogCancel className='bg-transparent border-[1px] rounded-[15px] border-white hover:bg-white/30 hover:text-white'>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleSubdomainUpdate} className='bg-transparent border-[1px] rounded-[15px] text-white border-white hover:bg-entourage-blue/70 hover:text-white'>Update</AlertDialogAction>
                                </div>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
