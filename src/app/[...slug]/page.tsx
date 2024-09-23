'use client'

import React from "react";
 
export default function Page({ params }: { params: { slug: string } }) {
    console.log(params.slug)

    return (
        <div className="text-white">
            Could Not Load: {params.slug}
        </div>
    )
}