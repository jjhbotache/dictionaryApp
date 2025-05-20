import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DictionaryEntry, searchWord as apiSearchWord } from '@/utils/freeDictionaryApi';

// Definición de tipos
interface HistoryItem {
  word: string;
  timestamp: string;
}

interface DictionaryState {
  entries: DictionaryEntry[] | null;
  searchHistory: HistoryItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentWord: string;
}

// Estado inicial
const initialState: DictionaryState = {
  entries: null,
  searchHistory: [],
  status: 'idle',
  error: null,
  currentWord: '',
};

// Carga el historial desde sessionStorage al iniciar
const loadHistoryFromStorage = (): HistoryItem[] => {
  if (typeof window !== 'undefined') {
    const savedHistory = sessionStorage.getItem('searchHistory');
    
    // Si hay un historial guardado
    if (savedHistory) {      try {
        const parsed = JSON.parse(savedHistory);
        
        // Migración: si el historial antiguo es un array de strings, convertirlo al nuevo formato
        if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'string') {
          return parsed.map(word => ({
            word,
            timestamp: new Date().toISOString()
          }));
        }
        
        return parsed;
      } catch {
        return [];
      }
    }
  }
  return [];
};

// Guarda el historial en sessionStorage
const saveHistoryToStorage = (history: HistoryItem[]) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('searchHistory', JSON.stringify(history));
  }
};

// Thunk para buscar una palabra
export const searchWord = createAsyncThunk(
  'dictionary/searchWord',
  async (word: string, { rejectWithValue }) => {
    try {
      const data = await apiSearchWord(word);
      return data;
    } catch (error) {
      console.log(error);
      
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Crear el slice
const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState: {
    ...initialState,
    searchHistory: loadHistoryFromStorage(),
  },
  reducers: {
    clearEntries: (state) => {
      state.entries = null;
      state.status = 'idle';
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentWord: (state, action: PayloadAction<string>) => {
      state.currentWord = action.payload;
    },
    clearHistory: (state) => {
      state.searchHistory = [];
      saveHistoryToStorage([]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchWord.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.currentWord = action.meta.arg;
      })      .addCase(searchWord.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload;
        
        // Añadir la palabra al historial si no está ya
        const searchedWord = action.meta.arg.toLowerCase();
        const wordExists = state.searchHistory.some(item => item.word === searchedWord);
        
        if (!wordExists) {
          // Crear nuevo item para el historial con timestamp
          const newHistoryItem = {
            word: searchedWord,
            timestamp: new Date().toISOString()
          };
          
          // Mantener un máximo de 10 palabras en el historial
          state.searchHistory = [newHistoryItem, ...state.searchHistory].slice(0, 10);
          saveHistoryToStorage(state.searchHistory);
        }
      })
      .addCase(searchWord.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearEntries, clearError, setCurrentWord, clearHistory } = dictionarySlice.actions;
export default dictionarySlice.reducer;
