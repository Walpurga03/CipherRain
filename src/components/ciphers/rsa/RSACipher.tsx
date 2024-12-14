import React, { useState } from 'react';
import { RSAService } from '../../../services/ciphers/RSAService';
import { FaArrowLeft, FaInfoCircle } from 'react-icons/fa';
import './RSACipher.scss';

interface RSACipherProps {
    onBack: () => void;
}

const RSACipher: React.FC<RSACipherProps> = ({ onBack }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [input, setInput] = useState('');
    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');
    const [error, setError] = useState('');
    const [useCustomKeys, setUseCustomKeys] = useState(false);
    const [customPublicKey, setCustomPublicKey] = useState('');
    const [customPrivateKey, setCustomPrivateKey] = useState('');

    const generateKeys = () => {
        try {
            const { publicKey: pubKey, privateKey: privKey } = RSAService.generateKeyPair();
            setPublicKey(pubKey);
            setPrivateKey(privKey);
            setError('');
        } catch (err) {
            setError('Fehler bei der Schlüsselgenerierung');
        }
    };

    const handleEncrypt = () => {
        try {
            const keyToUse = useCustomKeys ? customPublicKey : publicKey;
            if (!keyToUse.trim() || !input.trim()) {
                throw new Error('Bitte geben Sie einen Text ein und wählen Sie einen öffentlichen Schlüssel');
            }
            const encrypted = RSAService.encrypt(keyToUse, input);
            setEncryptedText(encrypted);
            setError('');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    const handleDecrypt = () => {
        try {
            const keyToUse = useCustomKeys ? customPrivateKey : privateKey;
            if (!keyToUse.trim() || !encryptedText.trim()) {
                throw new Error('Bitte geben Sie einen verschlüsselten Text ein und wählen Sie einen privaten Schlüssel');
            }
            const decrypted = RSAService.decrypt(keyToUse, encryptedText);
            setDecryptedText(decrypted);
            setError('');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    const handleCopyPublicKey = async () => {
        try {
            await navigator.clipboard.writeText(publicKey);
        } catch (err) {
            console.error('Failed to copy public key:', err);
        }
    };

    const handleCopyPrivateKey = async () => {
        try {
            await navigator.clipboard.writeText(privateKey);
        } catch (err) {
            console.error('Failed to copy private key:', err);
        }
    };

    return (
        <div className="rsa-container">
            <button className="back-button" onClick={onBack}>
                <FaArrowLeft /> Zurück
            </button>
            <button className="info-button" onClick={() => setShowInfo(!showInfo)}>
                <FaInfoCircle /> Info
            </button>
            <div className="rsa-header">
                <h2 className="rsa-title">RSA Verschlüsselung</h2>
            </div>

            {showInfo && (
                <div className="rsa-info">
                    <h3>Über RSA</h3>
                    <p>
                        RSA ist ein asymmetrisches Kryptosystem, das 1977 von Ronald L. Rivest, Adi Shamir und Leonard Adleman 
                        entwickelt wurde. Es verwendet ein Schlüsselpaar: einen öffentlichen Schlüssel zum Verschlüsseln und 
                        einen privaten Schlüssel zum Entschlüsseln.
                    </p>
                    <ul>
                        <li>Der öffentliche Schlüssel kann frei verteilt werden</li>
                        <li>Der private Schlüssel muss geheim bleiben</li>
                        <li>Nachrichten werden mit dem öffentlichen Schlüssel verschlüsselt</li>
                        <li>Nur der Besitzer des privaten Schlüssels kann die Nachricht entschlüsseln</li>
                    </ul>
                </div>
            )}

            <div className="rsa-keys-section">
                <div className="rsa-keys-header">
                    <h3 className="rsa-section-title">Schlüssel</h3>
                    <div className="rsa-key-options">
                        <button onClick={() => setUseCustomKeys(false)} className={`rsa-key-option ${!useCustomKeys ? 'active' : ''}`}>
                            Generierte Schlüssel
                        </button>
                        <button onClick={() => setUseCustomKeys(true)} className={`rsa-key-option ${useCustomKeys ? 'active' : ''}`}>
                            Eigene Schlüssel
                        </button>
                    </div>
                </div>

                {!useCustomKeys ? (
                    <>
                        <button onClick={generateKeys} className="rsa-generate-btn">
                            Schlüssel generieren
                        </button>
                        <div className="rsa-key-container">
                            <div className="rsa-key-group">
                                <label className="rsa-label">Öffentlicher Schlüssel:</label>
                                <div className="rsa-key-input-container">
                                    <textarea
                                        className="rsa-key-textarea"
                                        value={publicKey}
                                        readOnly
                                        placeholder="Generierter öffentlicher Schlüssel"
                                    />
                                    <button onClick={handleCopyPublicKey} className="rsa-copy-btn">
                                        Kopieren
                                    </button>
                                </div>
                            </div>
                            <div className="rsa-key-group">
                                <label className="rsa-label">Privater Schlüssel:</label>
                                <div className="rsa-key-input-container">
                                    <textarea
                                        className="rsa-key-textarea"
                                        value={privateKey}
                                        readOnly
                                        placeholder="Generierter privater Schlüssel"
                                    />
                                    <button onClick={handleCopyPrivateKey} className="rsa-copy-btn">
                                        Kopieren
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="rsa-key-container">
                        <div className="rsa-key-group">
                            <label className="rsa-label">Öffentlicher Schlüssel eingeben:</label>
                            <textarea
                                className="rsa-key-textarea"
                                value={customPublicKey}
                                onChange={(e) => setCustomPublicKey(e.target.value)}
                                placeholder="Fügen Sie hier Ihren öffentlichen Schlüssel ein"
                            />
                        </div>
                        <div className="rsa-key-group">
                            <label className="rsa-label">Privater Schlüssel eingeben:</label>
                            <textarea
                                className="rsa-key-textarea"
                                value={customPrivateKey}
                                onChange={(e) => setCustomPrivateKey(e.target.value)}
                                placeholder="Fügen Sie hier Ihren privaten Schlüssel ein"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="rsa-operation-section">
                <div className="rsa-encrypt-section">
                    <h3 className="rsa-section-title">Verschlüsseln</h3>
                    <div className="rsa-input-group">
                        <label className="rsa-label">Text zum Verschlüsseln:</label>
                        <textarea
                            className="rsa-textarea"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Geben Sie hier den zu verschlüsselnden Text ein"
                        />
                    </div>
                    <button onClick={handleEncrypt} className="rsa-action-btn">
                        Verschlüsseln
                    </button>
                    <div className="rsa-output-group">
                        <label className="rsa-label">Verschlüsselter Text:</label>
                        <textarea
                            className="rsa-textarea"
                            value={encryptedText}
                            readOnly
                            placeholder="Verschlüsselter Text erscheint hier"
                        />
                    </div>
                </div>

                <div className="rsa-decrypt-section">
                    <h3 className="rsa-section-title">Entschlüsseln</h3>
                    <div className="rsa-input-group">
                        <label className="rsa-label">Text zum Entschlüsseln:</label>
                        <textarea
                            className="rsa-textarea"
                            value={encryptedText}
                            onChange={(e) => setEncryptedText(e.target.value)}
                            placeholder="Geben Sie hier den verschlüsselten Text ein"
                        />
                    </div>
                    <button onClick={handleDecrypt} className="rsa-action-btn">
                        Entschlüsseln
                    </button>
                    <div className="rsa-output-group">
                        <label className="rsa-label">Entschlüsselter Text:</label>
                        <textarea
                            className="rsa-textarea"
                            value={decryptedText}
                            readOnly
                            placeholder="Entschlüsselter Text erscheint hier"
                        />
                    </div>
                </div>
            </div>

            {error && <div className="rsa-error">{error}</div>}
        </div>
    );
};

export default RSACipher;
