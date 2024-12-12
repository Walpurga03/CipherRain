import { RIPEMD160 } from 'crypto-js';

export class RIPEMD160Service {
    private static validateInput(text: string): void {
        if (!text) {
            throw new Error('Der Text darf nicht leer sein');
        }
    }

    static hash(text: string): string {
        RIPEMD160Service.validateInput(text);
        return RIPEMD160(text).toString();
    }
}
