import { SiteConfig, HeroSectionProps, MovingCardsProps, InfoScrollProps, InfoBlock, ExecBlock } from '../types/layoutTypes';
import { ExpandedEventProps, ExpandedMembershipProps, ExpandedExecProps, ExpandedTripProps, ExpandedPagesProps } from '../types/layoutTypes';

interface ClubData {
    clubName: string;
    clubPurpose: string;
    clubVibe: string;
    userID: string
}
  
interface ImageData {
    largeImageURL: string;
}
  
interface GenerateContent {
    clubCopy: {
        [key: string]: string;
    };
    clubImages: {
        message: ImageData[];
    };
}

export function getSiteConfigFromQuiz(clubData: ClubData, genContent: GenerateContent): SiteConfig {
    console.log(genContent)
    const siteConfig: SiteConfig = {
        
        userID: clubData.userID,

        fonts: {
            title: "inter",
            text: "merriweather"
        },

        //Global Site Styles
        colors: {
            primary: 'hsla(210, 10%, 25%, 1)',   // Very Dark Gray with a hint of blue
            accent: 'hsla(210, 15%, 60%, 1)',    // Medium Gray with a touch of blue
            background: 'hsla(0, 0%, 98%, 1)',   // Off-White
            text: 'hsla(210, 10%, 20%, 1)',      // Almost Black with a subtle blue undertone
        },

        expandedPages: [
            {
                component: "ExpandedEvents",
                props: {
                    title: "Your Events Here",
                    eventBlock: [
                        { eventTitle: "Event Title", eventDate: new Date("2024-01-01"), eventTime: { start: "10:00pm", end: "" }, eventCost: "10$ for members, 25$ for non members", eventDescription: "Event Description", eventLocation: "Event Location" },
                        { eventTitle: "Event Title", eventDate: new Date("2024-02-15"), eventTime: { start: "9:00am", end: "2:00pm" }, eventCost: "10$", eventDescription: "Event Description", eventLocation: "Event Location" },
                    ],
                } as ExpandedEventProps
            },
            {
                component: "ExpandedTrips",
                props: {
                    title: "Your Trips Here",
                    description: genContent.clubCopy.Trips,
                    tripBlock: [
                        { tripTitle: "Trip Title", tripDescription: "Trip Description", tripLocation: "Trip Location" },
                        { tripTitle: "Trip Title", tripDescription: "Trip Description", tripLocation: "Trip Location" },
                        { tripTitle: "Trip Title", tripDescription: "Trip Description", tripLocation: "Trip Location" },
                        { tripTitle: "Trip Title", tripDescription: "Trip Description", tripLocation: "Trip Location" },
                    ],
                } as ExpandedTripProps
            },
            {
                component: "ExpandedExec",
                props: {
                    title: "Executive Team",
                    execBlock: [
                        { image: "none", name: "First Last", role: "Role", instaURL: "https://www.instagram.com/entourage.ai/", bio: "Add a quick bio here!"},
                        { image: "none", name: "First Last", role: "Role", instaURL: "https://www.instagram.com/entourage.ai/", bio: "Add a quick bio here!"},
                        { image: "none", name: "First Last", role: "Role", instaURL: "https://www.instagram.com/entourage.ai/", bio: "Add a quick bio here!"},
                        { image: "none", name: "First Last", role: "Role", instaURL: "https://www.instagram.com/entourage.ai/", bio: "Add a quick bio here!"},
                    ]
                } as ExpandedExecProps
            },
            {
                component: "ExpandedMemberships",
                props: {
                    title: "Memberships",
                    image: genContent.clubImages.message[1].largeImageURL,
                    text: genContent.clubCopy.Memberships,
                    buttonLink: "",
                    buttonText: "Join the Club",
                }
            },
        ],

        //Site Layout
        layout: [
            {
                component: "HeroSection",
                props: {
                    logo: "https://qrengcbkopwqcuirwapp.supabase.co/storage/v1/object/public/images/images/placeholder-logo.png",
                    text: clubData.clubName,
                    image: genContent.clubImages.message[0].largeImageURL,
                    buttonText: "Join the Club",
                    buttonLink: "#",
                    siteSections: [
                        "Memberships",
                        "Events",
                        "Trips",
                        "Executive Team"
                    ].filter(section => genContent.clubCopy[section] !== undefined && genContent.clubCopy[section] !== null)
                } as HeroSectionProps
            },
            {
                component: "MovingCards",
                props: {
                    imageArr: genContent.clubImages.message.slice(1, 7).map(img => img.largeImageURL),
                    aboutText: genContent.clubCopy['About Us'],
                } as MovingCardsProps
            },
            {
                component: "Scroll",
                props: {
                    numblocks: 6,
                    blockArr: [
                        { id: "block-0", title: "Memberships", text: genContent.clubCopy.Memberships, image: genContent.clubImages.message[1].largeImageURL, buttonlink:"", buttonExpandedPage:"ExpandedMemberships", buttonlinkText:"Join the Club", buttonLinkURL:"#" },
                        { id: "block-1", title: "Events", text: genContent.clubCopy.Events, image: genContent.clubImages.message[2].largeImageURL, buttonlink:"", buttonExpandedPage:"ExpandedEvents", buttonlinkText:"Get Tickets", buttonLinkURL:"#" },
                        { id: "block-2", title: "Trips", text: genContent.clubCopy.Trips, image: genContent.clubImages.message[3].largeImageURL, buttonlink:"", buttonExpandedPage:"ExpandedTrips" },
                        { id: "block-3", title: "History", text: genContent.clubCopy.History, image: genContent.clubImages.message[4].largeImageURL },
                        { id: "block-4", title: "Executive Team", text: genContent.clubCopy['Executive Team'], image: genContent.clubImages.message[5].largeImageURL, buttonlink:"", buttonExpandedPage:"ExpandedExec" },
                        { id: "block-5", title: "Something Else", text: genContent.clubCopy['Something Else'], image: genContent.clubImages.message[6].largeImageURL },
                    ] as InfoBlock[],
                } as InfoScrollProps
            }
        ],

        footer: {
            links: {
                email: "none",
                instagram: "none",
                facebook: "none",
            }
        },
    };

    return siteConfig;
}
