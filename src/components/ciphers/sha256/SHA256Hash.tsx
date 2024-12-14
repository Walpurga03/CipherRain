import React, { useState } from 'react';
import { SHA256Service } from '../../../services/ciphers/SHA256Service';
import './SHA256Hash.scss';

interface SHA256Props {
    onBack: () => void;
}

const SHA256Hash: React.FC<SHA256Props> = ({ onBack }) => {
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showInfo, setShowInfo] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInput(value);
        setError('');
        
        try {
            if (value.trim()) {
                const hashedText = SHA256Service.hash(value);
                setOutput(hashedText);
            } else {
                setOutput('');
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(output);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

    const toggleInfo = () => {
        setShowInfo(!showInfo);
    };

    return (
        <div className="sha256-container">
            <div className="sha256-header">
                <div className="sha256-nav">
                    <button onClick={onBack} className="sha256-back-btn">
                        <span className="sha256-back-icon">←</span>
                        <span>Zurück</span>
                    </button>
                    <button onClick={toggleInfo} className="sha256-info-btn">
                        {showInfo ? 'Info ausblenden' : 'Info anzeigen'}
                    </button>
                </div>
                <h2 className="sha256-title">SHA-256 Hash</h2>
            </div>

            {showInfo && (
                <div className="sha256-info">
                    <h3>Über SHA-256</h3>
                    <p>
                        SHA-256 ist eine kryptographische Hash-Funktion, die zur SHA-2 Familie gehört und einen 256-Bit Hash-Wert erzeugt. 
                        Sie wird häufig in Sicherheitsanwendungen und Protokollen wie TLS und SSL verwendet.
                    </p>
                    <p>
                        Eigenschaften von SHA-256:
                    </p>
                    <ul>
                        <li>Erzeugt einen 256-Bit (64 Zeichen in Hexadezimal) Hash-Wert</li>
                        <li>Kollisionsresistent: Es ist praktisch unmöglich, zwei verschiedene Eingaben zu finden, die den gleichen Hash ergeben</li>
                        <li>Deterministisch: Die gleiche Eingabe erzeugt immer den gleichen Hash-Wert</li>
                        <li>Lawineneffekt: Kleine Änderungen in der Eingabe führen zu völlig anderen Hash-Werten</li>
                    </ul>
                </div>
            )}

            <div className="sha256-content">
                <div className="sha256-input-section">
                    <label htmlFor="input-text" className="sha256-label">Text zum Hashen:</label>
                    <textarea
                        id="input-text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Geben Sie den Text ein..."
                        className="sha256-textarea"
                        autoComplete="off"
                        spellCheck="false"
                    />
                    {error && <div className="sha256-error">{error}</div>}
                </div>

                <div className="sha256-output-section">
                    <label htmlFor="output-text" className="sha256-label">Hash-Ausgabe:</label>
                    <div className="sha256-output-container">
                        <input
                            id="output-text"
                            type="text"
                            value={output}
                            readOnly
                            className="sha256-output"
                            placeholder="Hash wird hier angezeigt..."
                        />
                        {output && (
                            <button onClick={handleCopyClick} className="sha256-copy-btn">
                                Kopieren
                            </button>
                        )}
                    </div>
                </div>

                <div className="sha256-wiki">
                    <a href="https://de.wikipedia.org/wiki/SHA-2" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="sha256-wiki-link">
                        Mehr auf Wikipedia
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SHA256Hash;
