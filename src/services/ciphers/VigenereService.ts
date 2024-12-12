export class VigenereService {
  /**
   * Verschlüsselt einen Text mit der Vigenère-Verschlüsselung
   * @param text Der zu verschlüsselnde Text
   * @param key Der Schlüssel für die Verschlüsselung
   * @returns Der verschlüsselte Text
   */
  public static encrypt(text: string, key: string): string {
    if (!key) return text;
    
    const normalizedKey = this.normalizeKey(key);
    let result = '';
    let j = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[a-z]/i)) {
        const isUpperCase = char === char.toUpperCase();
        const baseCode = isUpperCase ? 65 : 97; // ASCII: A=65, a=97
        const charCode = char.charCodeAt(0);
        const keyChar = normalizedKey[j % normalizedKey.length].toUpperCase();
        const shift = keyChar.charCodeAt(0) - 65;

        // Berechne verschobenen Code und stelle sicher, dass er im gültigen Bereich liegt
        const shiftedCode = ((charCode - baseCode + shift) % 26 + 26) % 26 + baseCode;
        result += String.fromCharCode(shiftedCode);
        j++;
      } else {
        result += char;
      }
    }

    return result;
  }

  /**
   * Entschlüsselt einen Vigenère-verschlüsselten Text
   * @param text Der zu entschlüsselnde Text
   * @param key Der Schlüssel für die Entschlüsselung
   * @returns Der entschlüsselte Text
   */
  public static decrypt(text: string, key: string): string {
    if (!key) return text;
    
    const normalizedKey = this.normalizeKey(key);
    let result = '';
    let j = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[a-z]/i)) {
        const isUpperCase = char === char.toUpperCase();
        const baseCode = isUpperCase ? 65 : 97;
        const charCode = char.charCodeAt(0);
        const keyChar = normalizedKey[j % normalizedKey.length].toUpperCase();
        const shift = keyChar.charCodeAt(0) - 65;

        // Für Entschlüsselung ziehen wir die Verschiebung ab statt sie zu addieren
        const shiftedCode = ((charCode - baseCode - shift) % 26 + 26) % 26 + baseCode;
        result += String.fromCharCode(shiftedCode);
        j++;
      } else {
        result += char;
      }
    }

    return result;
  }

  /**
   * Normalisiert den Schlüssel: Entfernt alle Nicht-Buchstaben und konvertiert zu Großbuchstaben
   */
  private static normalizeKey(key: string): string {
    return key.replace(/[^a-z]/gi, '').toUpperCase();
  }
}
