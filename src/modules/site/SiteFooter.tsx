import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="w-full bg-entourage-black text-entourage-blue py-4">
      <div className="w-full px-4">
        <div className="flex flex-row justify-between items-center text-sm">
          <div className="flex items-center flex-row space-x-4 md:space-x-12">
            <Link href="#" className="hover:text-blue-500 transition-colors">
              Contact
            </Link>
            <Link href="#" className="hover:text-blue-500 transition-colors text-center md:text-left">
              IG
            </Link>
            <Link href="#" className="hover:text-blue-500 transition-colors text-center md:text-left">
              FB
            </Link>
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