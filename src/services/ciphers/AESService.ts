export class AESService {
    private static validateInput(text: string, key: string): void {
        if (!text) {
            throw new Error('Der Text darf nicht leer sein');
        }
        if (!key) {
            throw new Error('Der Schlüssel darf nicht leer sein');
        }
        // AES erfordert einen Schlüssel mit 16, 24 oder 32 Bytes (für AES-128, AES-192, AES-256)
        if (![16, 24, 32].includes(key.length)) {
            throw new Error('Der Schlüssel muss 16, 24 oder 32 Zeichen lang sein (für AES-128, AES-192 oder AES-256)');
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

    static encrypt(text: string, key: string): string {
        AESService.validateInput(text, key);
        
        // TODO: Implementiere echte AES-Verschlüsselung
        return btoa(text);
    }

    static decrypt(text: string, key: string): string {
        AESService.validateInput(text, key);
        
        try {
            return atob(text);
        } catch (error) {
            throw new Error('Entschlüsselung fehlgeschlagen. Überprüfen Sie den Schlüssel und den verschlüsselten Text.');
        }
    }
}
