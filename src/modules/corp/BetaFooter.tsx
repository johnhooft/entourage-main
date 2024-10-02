import Link from 'next/link'

export function BetaFooter() {
  return (
    <footer className="w-full dark:bg-entourage-black text-black dark:text-entourage-blue">
      <div className="mx-6">
        <div className="flex flex-row justify-between items-center text-lg">
            <Link href="https://www.instagram.com/entourage.ai/">
              <img src="./instagram.svg" alt="insta" height={20} width={20}/>
            </Link>
            <Link href="/" className="hover:text-orange-500 transition-colors text-center md:text-left">
              Contact
            </Link>
        </div>
      </div>
    </footer>
  )
}