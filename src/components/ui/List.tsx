"use client"

import React from "react"
import { cn } from "../../utils/cn"
import { Text } from "./Text"

export interface ListProps {
  items: React.ReactNode[]
  markerColor?: "purple" | "gray" | "none"
  className?: string
  itemClassName?: string
}

export const List: React.FC<ListProps> = ({
  items,
  markerColor = "purple",
  className = "",
  itemClassName = ""
}) => {
  const markerColorMap = {
    purple: "text-purple-500",
    gray: "text-gray-500 dark:text-gray-400",
    none: "hidden"
  }

  return (
    <ul className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <li key={index} className={cn("flex", itemClassName)}>
          {markerColor !== "none" && (
            <span className={cn("mr-4", markerColorMap[markerColor])}>•</span>
          )}
          <div>{item}</div>
        </li>
      ))}
    </ul>
  )
}

export interface DefinitionListProps {
  definitions: Array<{
    definition: string;
    example?: string;
  }>;
  className?: string;
}

export const DefinitionList: React.FC<DefinitionListProps> = ({ 
  definitions, 
  className = "" 
}) => {
  return (
    <ul className={cn("space-y-4", className)}>
      {definitions.map((def, index) => (
        <li key={index} className="flex ms-4">
          <span className="text-primary-light mr-4">•</span>
          <div>
            <p>{def.definition}</p>
            {def.example && (
              <Text variant="italic" color="muted" className="mt-1">
                &quot;{def.example}&quot;
              </Text>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
