"use client"

import React from "react"
import { Text } from "./ui/Text"
import { DefinitionList } from "./ui/List"
import { Card, CardContent, CardFooter } from "./ui/Card"
import { Button } from "./ui/Button"
import { ExternalLinkIcon } from "lucide-react"

export interface WordMeaning {
  partOfSpeech: string
  definitions: {
    definition: string
    example?: string
  }[]
  synonyms?: string[]
  antonyms?: string[]
}

export interface WordData {
  word: string
  phonetic?: string
  audioUrl?: string
  meanings: WordMeaning[]
  sourceUrl?: string
}

interface WordDefinitionProps {
  data: WordData
  onPlayAudio?: () => void
}

export const WordDefinition: React.FC<WordDefinitionProps> = ({ 
  data, 
  onPlayAudio 
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Text variant="h1" className="mb-1">{data.word}</Text>        {data.audioUrl && (
            <Button 
              onClick={onPlayAudio}
              variant="icon"
              size="icon"
              aria-label="Play pronunciation"
              className="w-14 h-14 bg-secondary-light dark:bg-primary-light hover:bg-primary-light hover:dark:bg-purple-700 group"
            >
              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-primary-light dark:border-l-secondary-light border-b-8 border-b-transparent ml-1 transition-colors duration-300 hover:border-l-white group-hover:border-l-white"></div>
            </Button>
        )}
      </div>

      {data.phonetic && (
        <Text color="primary" className="mb-6">{data.phonetic}</Text>
      )}

      {data.meanings.map((meaning, index) => (
        <Card key={index} variant="default" className="bg-transparent mb-8">
          <CardContent>
            <div className="flex items-center gap-5 mb-5">
              <Text variant="h3" className="font-extrabold " >{meaning.partOfSpeech}</Text>
              <hr className="flex-grow border-t border-gray-300 dark:border-gray-700" />
            </div>
            
            <Text variant="h4" className="mb-2 " color="muted">Meaning</Text>
            
            <DefinitionList 
              definitions={meaning.definitions}
              className="mb-4"
            />
            
            {meaning.synonyms && meaning.synonyms.length > 0 && (
              <div className="flex mb-4 flex-wrap">
                <Text className="mr-4" color="muted">Synonyms</Text>
                {meaning.synonyms.map((synonym, i) => (
                  <Text key={i} color="primary" className="mr-2 font-bold" >
                    {synonym}{i < meaning.synonyms!.length - 1 ? "," : ""}
                  </Text>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {data.sourceUrl && (
        <CardFooter className="pt-4 border-t border-gray-300 dark:border-gray-700 break-words">
          <Text variant="subtitle" color="muted" className="">
            Source
            <a
              href={data.sourceUrl}
              className="ml-4 text-gray-800 dark:text-gray-200 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.sourceUrl}
              <ExternalLinkIcon className="inline ml-1" size={14} />
            </a>
          </Text>
        </CardFooter>
      )}
    </div>
  )
}
