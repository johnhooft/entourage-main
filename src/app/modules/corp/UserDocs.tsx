'use client'

import * as React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Logo } from './Logo'
import { Footer } from './Footer'
import Link from 'next/link'

const docItems = [
  {
    title: "How do I create a site?",
    content: "<Coming Soon>"
  },
  {
    title: "How do I customize my site?",
    content: "<Coming Soon>"
  },
  {
    title: "Can multiple people manage the same site? filler words for testing",
    content: "<Coming Soon>"
  },
  {
    title: "Can I use a custom domain?",
    content: "<Coming Soon>"
  },
  {
    title: "Can I transfer a domain I own?",
    content: "<Coming Soon>"
  },
  {
    title: "Do I need any technical knowledge?",
    content: "<Coming Soon>"
  },
  {
    title: "Can I sell memberships and event tickets on my site?",
    content: "<Coming Soon>"
  },
  {
    title: "How does connecting with brands work?",
    content: "<Coming Soon>"
  },
]

export function UserDocs() {
  const [selectedContent, setSelectedContent] = React.useState<any>('')
  const [openItem, setOpenItem] = React.useState<any | null>(null)

  const handleItemClick = (content: any, itemValue: string) => {
    if (openItem === itemValue) {
      setSelectedContent('')
      setOpenItem(null)
    } else {
      setSelectedContent(content)
      setOpenItem(itemValue)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
        <div className='text-black w-screen pt-5 px-5 md:pt-10 md:px-10 flex justify-end'>
            <Link href="/">
              <Logo />
            </Link>
        </div>
        <div className='flex flex-grow h-4/5 text-white px-10'>
            <div className="w-full md:w-5/12 lg:pr-6 lg:pl-28">
                <Accordion
                type="single"
                collapsible
                value={openItem}
                onValueChange={setOpenItem}
                className="w-full"
                >
                {docItems.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger
                        onClick={() => handleItemClick(item, `item-${index}`)}
                        className="text-left hover:text-gray-300 focus:text-gray-300 transition-colors"
                    >
                        {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="lg:hidden">
                        {item.content}
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </div>
            <div className="hidden lg:block lg:w-7/12 lg:px-6">
                {selectedContent ? (
                <div className='px-4'>
                    <div className='flex text-3xl font-bold pb-6'>
                      <p>{selectedContent.title}</p>
                    </div>
                    <div className='text-lg'>
                      <p>{selectedContent.content}</p>
                    </div>
                </div>
                ) : (
                <div className="flex items-start justify-center h-full mt-10">
                    <p className="text-gray-500">Select a topic from the left to view its content.</p>
                </div>
                )}
            </div>
        </div>
        <Footer />
    </div>
  )
}