import { Inter, Roboto, Open_Sans, Merriweather, Lato, Montserrat, Playfair_Display, Oswald, Raleway, Poppins } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' })
const openSans = Open_Sans({ subsets: ['latin'], display: 'swap' })
const merriweather = Merriweather({weight: '400', subsets: ['latin'], display: 'swap'})
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' })
const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' })
const playfairDisplay = Playfair_Display({ subsets: ['latin'], display: 'swap' })
const oswald = Oswald({ subsets: ['latin'], display: 'swap' })
const raleway = Raleway({ subsets: ['latin'], display: 'swap' })
const poppins = Poppins({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' })

export const fontMap = {
  'inter': inter,
  'roboto': roboto,
  'openSans': openSans,
  'merriweather': merriweather,
  'lato': lato,
  'montserrat': montserrat,
  'playfairDisplay': playfairDisplay,
  'oswald': oswald,
  'raleway': raleway,
  'poppins': poppins,
}

export type FontName = keyof typeof fontMap;
