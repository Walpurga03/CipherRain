import React from 'react';

interface CipherMenuProps {
  onSelect: (cipher: string) => void;
}

interface CipherOption {
  id: string;
  name: string;
  type: 'symmetric' | 'hash' | 'asymmetric';
  description: string;
}

const CipherMenu: React.FC<CipherMenuProps> = ({ onSelect }) => {
  const ciphers: CipherOption[] = [
    // Symmetrische Algorithmen
    { 
      id: 'caesar',
      name: 'Caesar Verschlüsselung',
      type: 'symmetric',
      description: 'Klassische Verschiebechiffre aus der Antike'
    },
    { 
      id: 'vigenere',
      name: 'Vigenère Chiffre',
      type: 'symmetric',
      description: 'Polyalphabetische Substitution mit Schlüsselwort'
    },
    { 
      id: 'blowfish',
      name: 'Blowfish',
      type: 'symmetric',
      description: 'Schneller symmetrischer Block-Algorithmus'
    },
    { 
      id: 'aes',
      name: 'AES',
      type: 'symmetric',
      description: 'Advanced Encryption Standard - Modernster Verschlüsselungsstandard'
    },
    { 
      id: 'xor',
      name: 'XOR',
      type: 'symmetric',
      description: 'Einfache aber effektive XOR-Verschlüsselung'
    },
    // Hash Funktionen
    { 
      id: 'ripemd160',
      name: 'RIPEMD-160',
      type: 'hash',
      description: 'Kryptographische Hash-Funktion mit 160 Bit'
    },
    { 
      id: 'sha256',
      name: 'SHA-256',
      type: 'hash',
      description: 'Secure Hash Algorithm mit 256 Bit'
    },
    // Asymmetrische Algorithmen
    { 
      id: 'rsa',
      name: 'RSA',
      type: 'asymmetric',
      description: 'Public-Key-Verschlüsselung für sichere Kommunikation'
    }
  ];

  return (
    <div className="cipher-menu">
      <div className="menu-content">
        <h2>Wähle eine Verschlüsselung</h2>
        <div className="cipher-categories">
          <div className="category">
            <h3>Symmetrische Verschlüsselung</h3>
            <div className="cipher-grid">
              {ciphers.filter(c => c.type === 'symmetric').map(cipher => (
                <button
                  key={cipher.id}
                  className="cipher-button"
                  onClick={() => onSelect(cipher.id)}
                >
                  <div className="cipher-button-content">
                    <span className="cipher-name">{cipher.name}</span>
                    <span className="cipher-description">{cipher.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="category">
            <h3>Hash-Funktionen</h3>
            <div className="cipher-grid">
              {ciphers.filter(c => c.type === 'hash').map(cipher => (
                <button
                  key={cipher.id}
                  className="cipher-button"
                  onClick={() => onSelect(cipher.id)}
                >
                  <div className="cipher-button-content">
                    <span className="cipher-name">{cipher.name}</span>
                    <span className="cipher-description">{cipher.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="category">
            <h3>Asymmetrische Verschlüsselung</h3>
            <div className="cipher-grid">
              {ciphers.filter(c => c.type === 'asymmetric').map(cipher => (
                <button
                  key={cipher.id}
                  className="cipher-button"
                  onClick={() => onSelect(cipher.id)}
                >
                  <div className="cipher-button-content">
                    <span className="cipher-name">{cipher.name}</span>
                    <span className="cipher-description">{cipher.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CipherMenu;
