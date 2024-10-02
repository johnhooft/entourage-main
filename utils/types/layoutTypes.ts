// types/layoutTypes.ts
import { FontName } from "../site/fontMap";
/*
SiteConfig
|   Fonts
|   Colors
|   Layout
|   |   Component
|   |   |   name
|   |   |   props
|   |   |   |   { props for components }
*/

export interface SiteConfig {
    fonts: Fonts;
    colors: Colors;
    layout: LayoutComponent[];
}

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