import Link from 'next/link'
import Image from 'next/image'
import { FooterComponentProps } from '../../../utils/types/layoutTypes'

export interface RenderSiteFooterProps {
  links: FooterComponentProps;
}

export default function SiteFooter({links}: RenderSiteFooterProps) {
  return (
    <footer className="w-full bg-entourage-black text-entourage-blue py-4">
      <div className="w-full px-4">
        <div className="flex flex-row justify-between items-center text-sm">
          <div className="flex items-center flex-row space-x-4 md:space-x-12">
            {links.email !== "none" && (
              <Link href={`mailto:${links.email}`} className="transition-colors">
                <Image src="mail-plus.svg" alt="Email" width={20} height={20} />
              </Link>
            )}
            {links.instagram !== "none" && (
              <Link href={links.instagram} className="transition-colors">
                <Image src="instagram.svg" alt="Instagram" width={20} height={20} />
              </Link>
            )}
            {links.facebook !== "none" && (
              <Link href={links.facebook} className="transition-colors">
                <Image src="fb.svg" alt="Facebook" width={20} height={20} />
              </Link>
            )}
          </div>
          <div className=''>
            <Link href="/" className="hover:text-orange-500 transition-colors text-center md:text-left flex flex-row space-x-1">
              <div>
                Made with
              </div>
              <div className='text-white'>
               entourage
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}