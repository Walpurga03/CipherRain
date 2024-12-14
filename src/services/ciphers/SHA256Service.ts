import CryptoJS from 'crypto-js';

export class SHA256Service {
    static hash(input: string): string {
        try {
            const hash = CryptoJS.SHA256(input);
            return hash.toString(CryptoJS.enc.Hex);
        } catch (error) {
            throw new Error('Fehler beim Berechnen des SHA-256 Hashes');
        }
    }
}
