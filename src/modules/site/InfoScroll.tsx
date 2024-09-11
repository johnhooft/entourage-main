"use client";
import React from "react";
import { StickyScroll } from "../../components/ui/sticky-scroll-reveal";
import Image from "next/image";

interface GenerateContent {
    [key: string]: string;
}

interface ImageHits {
    [key: string]: any;
}

interface InfoScrollProps {
    generatedContent: GenerateContent;
    imageHits: ImageHits;
}

const InfoScroll: React.FC<InfoScrollProps> = ({generatedContent, imageHits}) => {
    console.log(generatedContent);
    //console.log(imageHits.message);
    console.log(imageHits.message[0].largeImageURL);

    const content: any = [
      generatedContent.Memberships && {
        title: "Memberships",
        description: generatedContent.Memberships,
        content: (
          <div className="h-full w-full  flex items-center justify-center text-white">
            <Image
              src={imageHits.message[0].largeImageURL}
              width={300}
              height={300}
              className="h-full w-full object-cover"
              alt="linear board demo"
            />
          </div>
        ),
      },
      generatedContent.Events && {
        title: "Events",
        description: generatedContent.Events,
        content: (
          <div className="h-full w-full  flex items-center justify-center text-white">
            <Image
              src={imageHits.message[1].largeImageURL}
              width={300}
              height={300}
              className="h-full w-full object-cover"
              alt="linear board demo"
            />
          </div>
        ),
      },
      generatedContent.Trips && {
        title: "Trips",
        description: generatedContent.Trips,
        content: (
          <div className="h-full w-full  flex items-center justify-center text-white">
            <Image
              src={imageHits.message[2].largeImageURL}
              width={300}
              height={300}
              className="h-full w-full object-cover"
              alt="linear board demo"
            />
          </div>
        ),
      },
      generatedContent.Parties && {
        title: "Parties",
        description: generatedContent.Parties,
        content: (
          <div className="h-full w-full  flex items-center justify-center text-white">
            <Image
              src={imageHits.message[3].largeImageURL}
              width={300}
              height={300}
              className="h-full w-full object-cover"
              alt="linear board demo"
            />
          </div>
        ),
      },
      generatedContent.Culture && {
        title: "Culture",
        description: generatedContent.Culture,
        content: (
          <div className="h-full w-full  flex items-center justify-center text-white">
            <Image
              src={imageHits.message[4].largeImageURL}
              width={300}
              height={300}
              className="h-full w-full object-cover"
              alt="linear board demo"
            />
          </div>
        ),
      },
      generatedContent['Executive Team'] && {
        title: "Executive Team",
        description: generatedContent['Executive Team'],
        content: (
          <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
            Executive Team
          </div>
        ),
      },
    ].filter(Boolean); // This removes any falsy values (like undefined if a key doesn't exist)

    return (
        <div>
            <StickyScroll content={content} />
        </div>
    );
}

export default InfoScroll;
