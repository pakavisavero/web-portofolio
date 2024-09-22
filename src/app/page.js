"use client"; // Marks this component as a Client Component

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"; // Ensure this is correctly set up
import { useState, useEffect } from "react";
import { FaRegHandPaper } from "react-icons/fa";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const startTime = new Date().getTime();
      await new Promise((resolve) => setTimeout(resolve, 700)); // Simulating loading time

      const endTime = new Date().getTime();
      const dynamicDelay = endTime - startTime > 500 ? endTime - startTime : 500;
      setTimeout(() => setIsLoading(false), dynamicDelay);
    };

    fetchData();
    return () => clearTimeout();
  }, []);

  return (
    <div className="flex items-start justify-start h-full p-8 sm:p-20 gap-8 font-[family-name:var(--font-geist-sans)] mt-8">
      <main className="flex flex-col sm:flex-row gap-12 items-start sm:items-start justify-start w-full h-full">
        {/* Image container with skeleton */}
        <div className="flex-shrink-0 w-full sm:w-auto flex items-start justify-center -mt-10">
          {isLoading ? (
            <div className="w-[260px] h-[260px]">
              <Skeleton className="rounded-full w-full h-full bg-gray-300" />
            </div>
          ) : (
            <div className="relative w-[260px] h-[260px]">
              <Image
                src="/images/profile/profile-savero.png" // Make sure this path is correct
                alt="Profile Savero"
                className="rounded-full object-cover border-2 border-gray-200 dark:border-slate-600" // Dynamic border based on dark mode
                fill
                priority
              />
            </div>
          )}
        </div>

        {/* Text container with skeleton */}
        <div className="w-full sm:w-auto text-left lg:mt-[10px]">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-full sm:w-[400px] md:w-[600px] lg:w-[900px] mb-4 bg-gray-300" />
              <Skeleton className="h-6 w-full sm:w-[400px] md:w-[600px] lg:w-[900px] bg-gray-300" />
              <Skeleton className="h-6 w-full sm:w-[400px] md:w-[600px] lg:w-[900px] mt-2 bg-gray-300" />
              <Skeleton className="h-6 w-full sm:w-[400px] md:w-[600px] lg:w-[900px] mt-2 bg-gray-300" />
            </>
          ) : (
            <>
              <p className="lg:text-2xl sm:text-3xl font-bold underline">
                Hello, I'm Savero Pakavi{" "}
                <FaRegHandPaper className="inline-block ml-2 text-orange-400" />
              </p>
              <p className="lg:text-lg sm:text-lg mt-6">
                I’m a software engineer with a strong focus on building
                warehouse and transport systems. Throughout my career, I’ve
                worked on many large-scale projects, improving business
                operations and optimizing processes. I bring a well-rounded
                skill set and have successfully contributed to both the
                planning and execution of complex solutions across various
                industries.
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
