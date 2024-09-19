import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full bg-entourage-black text-entourage-orange dark:text-entourage-blue py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:justify-between items-center text-lg">
          <div className="flex flex-col space-y-4 items-center md:flex-row md:space-y-0 md:space-x-12">
            <Link href="/docs" className="hover:text-orange-500 transition-colors">
              User Docs
            </Link>
            <Link href="/" className="hover:text-orange-500 transition-colors text-center md:text-left">
              Why Entourage?
            </Link>
            <Link href="/" className="hover:text-orange-500 transition-colors text-center md:text-left">
              Pricing
            </Link>
          </div>
          <div className=''>
            <Link href="/" className="hover:text-orange-500 transition-colors text-center md:text-left">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}