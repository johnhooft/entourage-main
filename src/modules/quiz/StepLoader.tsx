"use client";
import React, { useState } from "react";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

const loadingStates = [
  {
    text: "Noting your inputs",
  },
  {
    text: "Ascertaining your vibe",
  },
  {
    text: "Generating components ",
  },
  {
    text: "Adding text",
  },
  {
    text: "Adding images",
  },
  {
    text: "Adding sauce",
  }
];

export default function MultiStepLoaderDemo({ step }: {step?: number}) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="dark"> {/* Ensure dark mode class is present */}
      <MultiStepLoader loadingStates={loadingStates} duration={3000} />
    </div>
  );
}
