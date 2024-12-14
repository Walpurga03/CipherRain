import JSEncrypt from 'jsencrypt';

export class RSAService {
    private static defaultKeySize = 2048;

    static generateKeyPair(): { publicKey: string; privateKey: string } {
        const encrypt = new JSEncrypt({ default_key_size: this.defaultKeySize.toString() });
        const publicKey = encrypt.getPublicKey();
        const privateKey = encrypt.getPrivateKey();
        
        if (!publicKey || !privateKey) {
            throw new Error('Schlüsselgenerierung fehlgeschlagen');
        }
        
        return {
            publicKey,
            privateKey
        };
    }

    static encrypt(publicKey: string, plaintext: string): string {
        try {
            const encrypt = new JSEncrypt();
            encrypt.setPublicKey(publicKey);
            const encrypted = encrypt.encrypt(plaintext);
            if (!encrypted) {
                throw new Error('Verschlüsselung fehlgeschlagen');
            }
            return encrypted;
        } catch (error) {
            throw new Error('Fehler bei der Verschlüsselung');
        }
    }

    static decrypt(privateKey: string, ciphertext: string): string {
        try {
            const decrypt = new JSEncrypt();
            decrypt.setPrivateKey(privateKey);
            const decrypted = decrypt.decrypt(ciphertext);
            if (!decrypted) {
                throw new Error('Entschlüsselung fehlgeschlagen');
            }
            return decrypted;
        } catch (error) {
            throw new Error('Fehler bei der Entschlüsselung');
        }
    }
}