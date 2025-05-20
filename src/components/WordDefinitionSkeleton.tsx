"use client"

import React from "react"
import { Skeleton } from "./ui/skeleton"
import { Card, CardContent, CardFooter } from "./ui/Card"

export const WordDefinitionSkeleton: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        {/* Word title skeleton */}
        <Skeleton className="h-14 w-40 mb-1" />
        {/* Play button skeleton */}
        <Skeleton className="w-16 aspect-square rounded-full" />
      </div>

      {/* Phonetic skeleton */}
      <Skeleton className="h-6 w-24 mb-6" />

      {/* Meanings skeletons - create 3 meaning sections */}
      {[1, 2, 3].map((index) => (
        <Card key={index} variant="default" className="bg-transparent mb-8">
          <CardContent>
            <div className="flex items-center gap-5 mb-5">
              {/* Part of speech skeleton */}
              <Skeleton className="h-6 w-24" />
            </div>
            
            {/* Meaning title skeleton */}
            <Skeleton className="h-5 w-20 mb-2" />
            
            {/* Definition list skeletons */}
            <ul className="list-none pl-10 space-y-4 mb-4">
              {[1, 2, 3].map((item) => (
                <li key={item} className="pl-2 ">
                  <Skeleton className="h-4 w-full mb-2" />
                  {item === 1 && <Skeleton className="h-4 w-3/4 mt-2" />}
                </li>
              ))}
            </ul>
            
            {/* Synonyms skeleton (just for the first section) */}
            {index === 1 && (
              <div className="flex mb-4 flex-wrap">
                <Skeleton className="h-4 w-16 mr-4" />
                <div className="flex gap-2">
                  {[1, 2, 3].map((syn) => (
                    <Skeleton key={syn} className="h-4 w-16" />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Source skeleton */}
      <CardFooter className="pt-4 border-t border-gray-300 dark:border-gray-700">
        <div className="flex items-center">
          <Skeleton className="h-4 w-12 mr-4" />
          <Skeleton className="h-4 w-48" />
        </div>
      </CardFooter>
    </div>
  )
}
