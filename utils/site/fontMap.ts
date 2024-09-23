import { Inter, Roboto, Open_Sans, Merriweather } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' })
const openSans = Open_Sans({ subsets: ['latin'], display: 'swap' })
const merriweather = Merriweather({weight: '400', subsets: ['latin'], display: 'swap',})

export const fontMap = {
  'inter': inter,
  'roboto': roboto,
  'openSans': openSans,
  'merriweather': merriweather,
}

export type FontName = keyof typeof fontMap;