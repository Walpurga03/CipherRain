export class XORService {
    private static validateInput(text: string, key: string): void {
        if (!text) {
            throw new Error('Der Text darf nicht leer sein');
        }
        if (!key) {
            throw new Error('Der Schlüssel darf nicht leer sein');
        }

        // Prüfe auf gültige ASCII-Zeichen (32-126 sind druckbare ASCII-Zeichen)
        const invalidChars = key.split('').filter(char => {
            const code = char.charCodeAt(0);
            return code < 32 || code > 126;
        });

        if (invalidChars.length > 0) {
            throw new Error('Der Schlüssel darf nur ASCII-Zeichen enthalten (Buchstaben, Zahlen und Sonderzeichen)');
        }
    }

    private static xorStrings(text: string, key: string): string {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            // XOR operation auf den ASCII-Codes
            const textChar = text.charCodeAt(i);
            const keyChar = key.charCodeAt(i % key.length);
            result += String.fromCharCode(textChar ^ keyChar);
        }
        return result;
    }

    static encrypt(text: string, key: string): string {
        XORService.validateInput(text, key);
        const xored = XORService.xorStrings(text, key);
        return btoa(xored); // Base64-Kodierung für sichere Übertragung
    }

    static decrypt(text: string, key: string): string {
        XORService.validateInput(text, key);
        try {
            const decoded = atob(text); // Base64-Dekodierung
            return XORService.xorStrings(decoded, key); // XOR ist seine eigene Inverse
        } catch (error) {
            throw new Error('Entschlüsselung fehlgeschlagen. Überprüfen Sie den Schlüssel und den verschlüsselten Text.');
        }
    }
}
