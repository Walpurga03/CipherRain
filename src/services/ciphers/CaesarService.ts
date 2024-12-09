export class CaesarService {
  /**
   * Verschlüsselt einen Text mit der Caesar-Verschlüsselung
   * @param text Der zu verschlüsselnde Text
   * @param shift Die Verschiebung (Standard: 3)
   * @returns Der verschlüsselte Text
   */
  public static encrypt(text: string, shift: number = 3): string {
    return text
      .split('')
      .map(char => {
        // Prüfe ob der Charakter ein Buchstabe ist
        if (char.match(/[a-z]/i)) {
          const charCode = char.charCodeAt(0);
          const isUpperCase = char === char.toUpperCase();
          const baseCode = isUpperCase ? 65 : 97; // ASCII: A=65, a=97
          
          // Berechne den verschobenen Code und stelle sicher, dass er im gültigen Bereich liegt
          const shiftedCode = ((charCode - baseCode + shift) % 26 + 26) % 26 + baseCode;
          return String.fromCharCode(shiftedCode);
        }
        // Wenn kein Buchstabe, dann unverändert zurückgeben
        return char;
      })
      .join('');
  }

  /**
   * Entschlüsselt einen Caesar-verschlüsselten Text
   * @param text Der zu entschlüsselnde Text
   * @param shift Die ursprüngliche Verschiebung (Standard: 3)
   * @returns Der entschlüsselte Text
   */
  public static decrypt(text: string, shift: number = 3): string {
    // Entschlüsselung ist eine Verschlüsselung mit negativer Verschiebung
    return this.encrypt(text, 26 - (shift % 26));
  }
}
