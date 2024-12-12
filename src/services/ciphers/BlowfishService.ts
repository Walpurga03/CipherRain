export class BlowfishService {
    private static validateInput(text: string, key: string): void {
        if (!text) {
            throw new Error('Der Text darf nicht leer sein');
        }
        if (!key) {
            throw new Error('Der Schlüssel darf nicht leer sein');
        }
        if (key.length < 4 || key.length > 56) {
            throw new Error('Der Schlüssel muss zwischen 4 und 56 Zeichen lang sein');
        }
    }

    static encrypt(text: string, key: string): string {
        this.validateInput(text, key);
        
        // TODO: Implementiere echte Blowfish-Verschlüsselung
        // Dies ist nur ein Platzhalter für die Demo
        return btoa(text);
    }

    static decrypt(text: string, key: string): string {
        this.validateInput(text, key);
        
        try {
            return atob(text);
        } catch (error) {
            throw new Error('Entschlüsselung fehlgeschlagen. Überprüfen Sie den Schlüssel und den verschlüsselten Text.');
        }
    }
}
