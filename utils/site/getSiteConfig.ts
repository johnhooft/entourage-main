import { SiteConfig, HeroSectionProps, MovingCardsProps, InfoScrollProps } from '../types/layoutTypes';
import { ExpandedEventProps, ExpandedMembershipProps, ExpandedTripProps, ExpandedPagesProps } from '../types/layoutTypes';

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
            primary: 'hsla(208, 73%, 81%, 1)',
            accent: 'hsla(17, 100%, 55%, 1)',
            background: 'hsla(0, 0%, 13%, 1)',
            text: 'hsla(0, 11%, 96%, 1)',
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
            }
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
                    siteSections:  Object.keys(genContent.clubCopy),
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
                        { id: "block-0", title: "Memberships", text: genContent.clubCopy.Memberships, image: genContent.clubImages.message[1].largeImageURL },
                        { id: "block-1", title: "Events", text: genContent.clubCopy.Events, image: genContent.clubImages.message[2].largeImageURL },
                        { id: "block-2", title: "Trips", text: genContent.clubCopy.Trips, image: genContent.clubImages.message[3].largeImageURL },
                        { id: "block-3", title: "History", text: genContent.clubCopy.History, image: genContent.clubImages.message[4].largeImageURL },
                        { id: "block-4", title: "Executive Team", text: genContent.clubCopy['Executive Team'], image: genContent.clubImages.message[5].largeImageURL },
                        { id: "block-5", title: "Something Else", text: genContent.clubCopy['Something Else'], image: genContent.clubImages.message[6].largeImageURL },
                    ],
                } as InfoScrollProps
            }
        ]
    };

    return siteConfig;
}