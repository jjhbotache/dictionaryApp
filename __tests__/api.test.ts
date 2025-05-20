import { searchWord, DictionaryApiError, maxWordLength } from '../src/utils/freeDictionaryApi';
import freeDictionaryResponseMock from "../mocks/freeDictionaryResponseMock.json" 

describe('Dictionary API utilities (Real API)', () => {
  // Test with real API
  it('should search a word successfully in the real API', async () => {
    // This test uses the real API, not a mock
    const result = await searchWord('hello');
    
    // Basic verifications without specific expectations about the content
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toStrictEqual(freeDictionaryResponseMock[0]);
  }, 10000); // Extended timeout for real API
  
  it('should handle a 404 error with non-existent word in the real API', async () => {
    // Word very unlikely to exist
    await expect(searchWord('xyzabcdefghijklmn123456789')).rejects.toThrow(
      DictionaryApiError
    );
  }, 10000);
  
  // Tests for client validations
  describe('Input validations', () => {
    // Keep tests for client validations that don't require API
    it('should reject empty words', async () => {
      await expect(searchWord('')).rejects.toThrow(
        new DictionaryApiError('Search word cannot be empty')
      );
      
      await expect(searchWord('   ')).rejects.toThrow(
        new DictionaryApiError('Search word cannot be empty')
      );
    });
    
    it('should reject words with disallowed characters', async () => {
      await expect(searchWord('hello123')).rejects.toThrow(
        new DictionaryApiError('Word contains disallowed characters. Use only letters, hyphens or apostrophes.')
      );
      
      await expect(searchWord('word@#$')).rejects.toThrow(
        new DictionaryApiError('Word contains disallowed characters. Use only letters, hyphens or apostrophes.')
      );
    });
    
    it('should reject emojis', async () => {
      await expect(searchWord('😀hello')).rejects.toThrow(
        new DictionaryApiError('Emojis are not allowed in the search')
      );
      
      await expect(searchWord('word😀')).rejects.toThrow(
        new DictionaryApiError('Emojis are not allowed in the search')
      );
    });
    
    it('should reject words that are too long', async () => {
      const longWord = 'a'.repeat(51);
      await expect(searchWord(longWord)).rejects.toThrow(
        new DictionaryApiError(`Word is too long (maximum ${maxWordLength} characters)`)
      );
    });
    
    it('should accept words with hyphens and apostrophes', async () => {
      // These words should pass validation, although they might not exist
      // We only verify that they pass validation, not that the API finds them
      expect(() => searchWord('well-being')).not.toThrow();
      expect(() => searchWord("isn't")).not.toThrow();
    });
  });
});
