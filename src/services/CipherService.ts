import { CaesarService } from './ciphers/CaesarService';

class CipherService {
    public caesar = {
        encrypt: CaesarService.encrypt,
        decrypt: CaesarService.decrypt
    };
}

export default new CipherService();
