import React from 'react';
import './CipherMenu.scss';

interface CipherOption {
  id: string;
  name: string;
  type: 'symmetric' | 'hash' | 'asymmetric';
  description: string;
}

interface CipherMenuProps {
  onSelect: (cipherId: string) => void;
}

const CipherMenu: React.FC<CipherMenuProps> = ({ onSelect }) => {
  const ciphers: CipherOption[] = [
    // Symmetrische Algorithmen
    { 
      id: 'caesar',
      name: 'Caesar',
      type: 'symmetric',
      description: 'Klassische Verschiebechiffre aus der Antike'
    },
    { 
      id: 'vigenere',
      name: 'Vigenère',
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
      description: 'Kryptographische Hash-Funktion mit 160-Bit Ausgabe'
    },
    { 
      id: 'sha256',
      name: 'SHA-256',
      type: 'hash',
      description: 'Sicherer Hash-Algorithmus der SHA-2 Familie'
    },
    // Asymmetrischer Algorithmus
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
        <h2 data-text="Wähle eine Verschlüsselungsmethode">
          Wähle eine Verschlüsselungsmethode
        </h2>
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
