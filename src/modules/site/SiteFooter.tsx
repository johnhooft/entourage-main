import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FooterComponentProps } from '../../../utils/types/layoutTypes'

export interface SiteFooterProps {
  links: FooterComponentProps;
  updateConfig: (newProps: any) => void;
}

export default function SiteFooter({links, updateConfig}: SiteFooterProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState(links.email)
  const [instagramLink, setInstagramLink] = useState(links.instagram);
  const [facebookLink, setFacebookLink] = useState(links.facebook);

  const handleSaveLinks = () => {
    updateConfig({ links: { ...links, instagram: instagramLink, facebook: facebookLink, email: email } });
    setIsDialogOpen(false);
  };

  return (
    <footer className="w-full bg-entourage-black text-entourage-blue py-4">
      <div className="w-full px-4">
        <div className="flex flex-row justify-between items-center text-sm">
          <div 
            className="flex items-center flex-row space-x-4 md:space-x-12 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {email !== "none" ? (
              <Link href={`mailto:${email}`} className="transition-colors">
                <Image src="mail-plus.svg" alt="Email" width={20} height={20} />
              </Link>
            ) : (
              <Image src="mail-plus.svg" alt="Email" width={20} height={20} />
            )}
            {instagramLink !== "none" ? (
              <Link href={instagramLink} className="transition-colors">
                <Image src="instagram.svg" alt="Instagram" width={20} height={20} />
              </Link>
            ) : (
              <Image src="instagram.svg" alt="Instagram" width={20} height={20} />
            )}
            {facebookLink !== "none" ? (
              <Link href={facebookLink} className="transition-colors">
                <Image src="fb.svg" alt="Facebook" width={20} height={20} />
              </Link>
            ) : (
              <Image src="fb.svg" alt="Facebook" width={20} height={20} />
            )}
            {isHovered && (
              <Button
                className="absolute right-8 bg-white text-black hover:bg-white/70 scale-90"
                onClick={() => setIsDialogOpen(true)}
              >
                Edit Links
              </Button>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white text-black">
          <DialogHeader>
            <DialogTitle>Edit Social Media Links</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instagram" className="text-right">
                Instagram
              </Label>
              <Input
                id="instagram"
                value={instagramLink}
                onChange={(e) => setInstagramLink(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="facebook" className="text-right">
                Facebook
              </Label>
              <Input
                id="facebook"
                value={facebookLink}
                onChange={(e) => setFacebookLink(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <div className='flex w-full justify-center'>
            <Button onClick={handleSaveLinks} className='text-black bg-white hover:bg-white border-[1px] rounded-[15px] border-black hover:scale-105 transition-all'>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  )
}
