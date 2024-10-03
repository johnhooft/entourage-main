"use client";
import React, { useState } from "react";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

const loadingStates = [
  {
    text: "Loading your prompts",
  },
  {
    text: "Sorting your inputs",
  },
  {
    text: "Generating components",
  },
  {
    text: "Adding text",
  },
  {
    text: "Adding images",
  },
  {
    text: "Adding buttons",
  },
  {
    text: "Finishing build",
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
