declare module 'jsencrypt' {
    export interface JSEncryptOptions {
        default_key_size?: string;
        default_public_exponent?: string;
        log?: boolean;
    }

    export default class JSEncrypt {
        constructor(options?: JSEncryptOptions);
        decrypt(str: string): string | false;
        encrypt(str: string): string | false;
        getPrivateKey(): string;
        getPublicKey(): string;
        setPrivateKey(key: string): void;
        setPublicKey(key: string): void;
    }
}
