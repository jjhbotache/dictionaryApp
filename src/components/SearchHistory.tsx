"use client"

import React from "react"
import { Clock, Trash2 } from "lucide-react"
import { Button } from "./ui/Button"
import * as SheetComponents from "./ui/sheet"
// Redux
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { searchWord, clearHistory } from '@/store/dictionarySlice'
import { Text } from "./ui/Text"

const {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetFooter
} = SheetComponents

interface SearchHistoryProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  triggerButton: React.ReactNode;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  isOpen,
  onOpenChange,
  triggerButton
}) => {
  const dispatch = useAppDispatch();
  const { searchHistory } = useAppSelector((state) => state.dictionary);
    const handleHistoryItemClick = (term: string) => {
    dispatch(searchWord(term));
    onOpenChange(false);
  }
  
  const handleClearHistory = () => {
    dispatch(clearHistory());
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {triggerButton}
      </SheetTrigger>
      <SheetContent className="h-full flex flex-col ">
        <SheetHeader>
          <SheetTitle>Historial de búsquedas</SheetTitle>
          <SheetDescription>
            Tus búsquedas recientes de palabras
          </SheetDescription>
        </SheetHeader>        <div className="mt-6 overflow-y-auto flex-1 pb-2">
          <div className="flex flex-col gap-4">
            {searchHistory.length > 0 ? (
              searchHistory.map((item, index) => {
                // Formatear la fecha para mostrarla
                const date = new Date(item.timestamp);
                const formattedDate = date.toLocaleDateString();
                const formattedTime = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
                
                return (
                  <div 
                    key={index}
                    className="flex flex-col p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer shadow-sm"
                    onClick={() => handleHistoryItemClick(item.word)}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{item.word}</span>
                    </div>
                    <div className="text-[.65em] text-gray-500 pl-6">
                      {formattedDate} - {formattedTime}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500">
                There are no search history items.
              </p>
            )}
          </div>
        </div>
        <SheetFooter className="mt-6">
          <div className="flex w-full justify-between">
            <Button variant="secondary" onClick={() => handleClearHistory()} disabled={searchHistory.length === 0} className="flex items-center gap-1">
              <Trash2 size={14}/>
              <Text variant="subtitle">Delete history</Text>
            </Button>
            <SheetClose asChild>
              <Button>Close</Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default SearchHistory
