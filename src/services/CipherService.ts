export class CipherService {
  static caesar = {
    encrypt: (text: string, shift: number): string => {
      return text
        .split('')
        .map(char => {
          if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const isUpperCase = char === char.toUpperCase();
            const base = isUpperCase ? 65 : 97;
            return String.fromCharCode(((code - base + shift) % 26 + 26) % 26 + base);
          }
          return char;
        })
        .join('');
    },
    decrypt: (text: string, shift: number): string => {
      return this.caesar.encrypt(text, 26 - (shift % 26));
    }
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
      return this.xor.encrypt(text, key); // XOR ist symmetrisch
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
