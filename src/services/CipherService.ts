import { CaesarService } from './ciphers/CaesarService';
import { AESService } from './ciphers/AESService';
import { XORService } from './ciphers/XORService';
import { RIPEMD160Service } from './ciphers/RIPEMD160Service';

class CipherService {
    public caesar = {
        encrypt: CaesarService.encrypt,
        decrypt: CaesarService.decrypt
    };

    public aes = {
        encrypt: AESService.encrypt,
        decrypt: AESService.decrypt
    };

    public xor = {
        encrypt: XORService.encrypt,
        decrypt: XORService.decrypt
    };

    public ripemd160 = {
        hash: RIPEMD160Service.hash
    };
}

export default new CipherService();
