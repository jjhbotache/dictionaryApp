/**
 * Interfaz para los datos de la respuesta de la API
 */
export interface DictionaryEntry {
  word: string;
  phonetic?: string;
  phonetics: Array<{
    text?: string;
    audio?: string;
  }>;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example?: string;
      synonyms: string[];
      antonyms: string[];
    }>;
    synonyms: string[];
    antonyms: string[];
  }>;
  sourceUrls: string[];
}

export const maxWordLength = 50;
/**
 * Error personalizado para la API
 */
export class DictionaryApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'DictionaryApiError';
  }
}

/**
 * API base URL
 */
export const API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

/**
 * Busca una palabra en el diccionario
 * @param word - La palabra a buscar
 * @returns Una promesa con las entradas del diccionario para la palabra
 */
export async function searchWord(word: string): Promise<DictionaryEntry[]> {
  // Validation for empty words or only spaces
  if (!word || !word.trim()) {
    throw new DictionaryApiError('Search word cannot be empty');
  }

  const trimmedWord = word.trim();
  
  
  // Length validation
  if (trimmedWord.length > maxWordLength) {
    throw new DictionaryApiError(`Word is too long (maximum ${maxWordLength} characters)`);
  }
  
  // Validation for alphabetic characters (allows letters, hyphens and apostrophes for compound words)
  const validWordPattern = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\-' ]+$/;
  if (!validWordPattern.test(trimmedWord)) {
    // Check if it contains emojis specifically
    const emojiPattern = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/u;
    if (emojiPattern.test(trimmedWord)) {
      throw new DictionaryApiError('Emojis are not allowed in the search');
    }
    
    throw new DictionaryApiError('Word contains disallowed characters. Use only letters, hyphens or apostrophes.');
  }
  
  try {
    
    const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(trimmedWord)}`);
    const data = await response.json();
    
    if(data.title) {
      
      throw new DictionaryApiError(data.title, response.status);
    }
    if (!response.ok) {
      if (response.status === 404) {
        throw new DictionaryApiError('Word not found in the dictionary', 404);
      }
      throw new DictionaryApiError(`Error searching for word: ${response.statusText}`, response.status);
    }

    return data as DictionaryEntry[];
  } catch (error) {
    if (error instanceof DictionaryApiError) {
      throw error;
    }
    throw new DictionaryApiError(`Request error: ${(error as Error).message}`);
  }
}
