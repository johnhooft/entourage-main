// types/layoutTypes.ts

export interface ComponentProps {
    [key: string]: any;
}

export interface LayoutComponent {
    component: string;
    props: ComponentProps;
}

export interface HeroSectionProps extends ComponentProps {
    text: string;
    image: string;
    textColor: string;
    textOpacity?: string;
}

export interface MovingCardsProps extends ComponentProps {
    aboutText: string;
    imageArr: string[];
    textColor?: string;
    textOpacity?: string;
}

export interface InfoBlock {
    title: string;
    text: string;
    image: string;
}

export interface InfoScrollProps extends ComponentProps {
    numblocks: number;
    blockArr: InfoBlock[];
}

export interface SiteConfig {
    layout: LayoutComponent[];
}