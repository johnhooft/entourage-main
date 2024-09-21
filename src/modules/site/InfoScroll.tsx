"use client";
import React from "react";
import { StickyScroll } from "../../components/ui/sticky-scroll-reveal";
import Image from "next/image";

interface Block {
  title: string;
  text: string;
  image: string;
}

interface InfoScrollProps {
  numBlocks: number;
  blockArr: Block[];
}

interface ContentItem {
  title: string;
  description: string;
  content: React.ReactNode;
}

const InfoScroll: React.FC<InfoScrollProps> = ({ numBlocks, blockArr }) => {
  
  const content_map: ContentItem[] = blockArr
    .map((item, index): ContentItem | null => {
      if (item.title && item.text && item.image) {
        return {
          title: item.title,
          description: item.text,
          content: (
            <div className="h-full w-full flex items-center justify-center text-white">
              <Image
                src={item.image}
                width={300}
                height={300}
                className="h-full w-full object-cover"
                alt={`block image ${index}`}
              />
            </div>
          ),
        };
      }
      return null;
    })
    .filter((item): item is ContentItem => item !== null);

  return (
    <div>
      <StickyScroll content={content_map} />
    </div>
  );
};

export default InfoScroll;