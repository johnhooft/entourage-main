// types/layoutTypes.ts

/*
SiteConfig
|   Global Styles
|   |   theme
|   Layout
|   |   Component
|   |   |   name
|   |   |   props
|   |   |   |   { props for components }
*/

export interface SiteConfig {
    colors: Colors;
    layout: LayoutComponent[];
}

export interface Colors {
    primary: string;
    accent:string;
    background: string;
    text: string;
}

export interface LayoutComponent {
    component: string;
    props: ComponentProps;
}

export interface ComponentProps {
    [key: string]: any;
}

export interface HeroSectionProps extends ComponentProps {
    text: string;
    image: string;
    textColor: string;
    textOpacity?: string;
    siteSections: string[];
}

export interface MovingCardsProps extends ComponentProps {
    aboutText: string;
    imageArr: string[];
    textColor?: string;
    textOpacity?: string;
}

export interface InfoScrollProps extends ComponentProps {
    numblocks: number;
    blockArr: InfoBlock[];
}

export interface InfoBlock {
    title: string;
    text: string;
    image: string;
}