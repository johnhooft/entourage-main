// types/layoutTypes.ts
import { FontName } from "../site/fontMap";
/*
SiteConfig
|   Fonts
|   Colors
|   Expanded
|   |   name
|   |   props
|   |   |   { props for components }
|   Layout
|   |   Component
|   |   |   name
|   |   |   props
|   |   |   |   { props for components }
*/


// ----- High Level Struct ----- //

export interface SiteConfig {
    userID: string;
    fonts: Fonts;
    colors: Colors;
    layout: LayoutComponent[];
    expandedPages: ExpandedPageComponent[];
}
// ----- ----- ----- //



// ----- Site Styles ----- //

export interface Fonts {
    title: FontName;
    text: FontName;
}

export interface Colors {
    primary: string;
    accent:string;
    background: string;
    text: string;
}
// ----- ----- ----- //



// ----- Site Components ----- //

export interface LayoutComponent {
    component: string;
    props: ComponentProps;
}

export interface ComponentProps {
    [key: string]: any;
}

export interface HeroSectionProps extends ComponentProps {
    logo: string;
    text: string;
    image: string;
    buttonText: string;
    buttonLink: string;
    siteSections: string[];
}

export interface MovingCardsProps extends ComponentProps {
    aboutText: string;
    imageArr: string[];
}

export interface InfoScrollProps extends ComponentProps {
    numblocks: number;
    blockArr: InfoBlock[];
}

export interface InfoBlock {
    id: string;
    title: string;
    text: string;
    image: string;
}
// ----- ----- ----- //



// ----- Expanded Pages Components ----- //

export interface ExpandedPageComponent {
    component: string;
    props: ExpandedPagesProps
}

export interface ExpandedPagesProps {
    [key: string]: any;
}

export interface ExpandedEventProps extends ExpandedPagesProps {
    title: string;
    eventBlock: EventBlock[];
}

export interface EventBlock {
    eventTitle: string;
    eventDate: Date;
    eventTime: {
        start: string;
        end?: string;
    };
    eventCost: string;
    eventDescription: string;
    eventLocation: string;
}

export interface ExpandedMembershipProps extends ExpandedPagesProps {
    descrition: string
    link: string
}

export interface ExpandedTripProps extends ExpandedPagesProps {
    title: string;
    description: string;
    tripBlock: TripBlock[];
}

export interface TripBlock {
    tripTitle: string;
    tripDescription: string;
    tripLocation: string;
}