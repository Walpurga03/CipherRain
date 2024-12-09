import { CaesarService } from './ciphers/CaesarService';

class CipherService {
  static caesar = {
    encrypt: CaesarService.encrypt,
    decrypt: CaesarService.decrypt
  };

  static xor = {
    encrypt: (text: string, key: string): string => {
      return text
        .split('')
        .map((char, i) => {
          const keyChar = key[i % key.length];
          return String.fromCharCode(char.charCodeAt(0) ^ keyChar.charCodeAt(0));
        })
        .join('');
    },
    decrypt: (text: string, key: string): string => {
      return CipherService.xor.encrypt(text, key); // XOR ist symmetrisch
    }
  };

  static sha256 = {
    hash: async (text: string): Promise<string> => {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
  };
}

export default CipherService;
