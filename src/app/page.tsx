"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button, Header, Input, WordDefinition, WordDefinitionSkeleton } from "@/components";
import { useTheme } from "@/utils/useTheme";
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { searchWord as searchWordAction } from '@/store/dictionarySlice';
import type { DictionaryEntry } from "@/utils/freeDictionaryApi";

export default function DictionaryPage() {
  const { currentFont, toggleDarkMode, changeFont, getFontClass } = useTheme();
  const dispatch = useAppDispatch();
  const { entries, status, error } = useAppSelector((state) => state.dictionary);
  const [inputValue, setInputValue] = useState("");


  const handleSearch = () => {
    dispatch(searchWordAction(inputValue.trim()));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Función para reproducir el audio de la palabra
  const handlePlayAudio = () => {
    if (entries && entries[0].phonetics) {
      const audioUrl = entries[0].phonetics.find((p: { audio?: string }) => p.audio)?.audio;
      if (audioUrl) {
        new Audio(audioUrl).play();
      }
    }
  };
  // Convertir de DictionaryEntry a WordData para el componente WordDefinition
  const mapEntryToWordData = (entry: DictionaryEntry) => {
    return {
      word: entry.word,
      phonetic: entry.phonetic || "",
      audioUrl: entry.phonetics.find((p: { audio?: string }) => p.audio)?.audio,
      meanings: entry.meanings.map((m) => ({
        partOfSpeech: m.partOfSpeech,
        definitions: m.definitions.map((d) => ({
          definition: d.definition,
          example: d.example
        })),
        synonyms: m.synonyms
      })),
      sourceUrl: entry.sourceUrls[0]
    };
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${getFontClass()} dark:bg-gray-900 dark:text-gray-100 bg-gray-50 text-gray-900`}
    >
      <div className="max-w-2xl mx-auto px-6 py-6">
        {/* Header */}
        <Header
          currentFont={currentFont}
          onToggleDarkMode={toggleDarkMode}
          onChangeFont={changeFont}
        />

        {/* Search bar */}
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search a word..."
          variant="search"
          rightIcon={
            <Button onClick={handleSearch} variant="icon" >
              <Search className="text-primary-light cursor-pointer" size={14} />
            </Button>
          }
          containerClassName="mb-8"
        />


        {/* Estado de carga y errores */}
        {status === 'idle' && <p className="text-center py-4">Search a word to get started</p>}
        {status === 'loading' && <WordDefinitionSkeleton />}
        {status === 'failed' && <p className="text-center py-4 text-error">{error}</p>}

        {/* Word content */}
        {entries && status === 'succeeded' && (
          <WordDefinition data={mapEntryToWordData(entries[0])} onPlayAudio={handlePlayAudio} />
        )}
      </div>
    </div>
  );
}
