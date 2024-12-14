# CipherRain Projektstruktur

## Verzeichnisstruktur
```
src
├── App.scss
├── App.tsx
├── components
│   ├── ciphers
│   │   ├── aes
│   │   │   ├── AESCipher.scss
│   │   │   └── AESCipher.tsx
│   │   ├── blowfish
│   │   │   ├── BlowfishCipher.scss
│   │   │   └── BlowfishCipher.tsx
│   │   ├── caesar
│   │   │   ├── CaesarCipher.scss
│   │   │   └── CaesarCipher.tsx
│   │   ├── menu
│   │   │   ├── CipherMenu.scss
│   │   │   └── CipherMenu.tsx
│   │   ├── pages
│   │   │   └── CipherPage.tsx
│   │   ├── ripemd160
│   │   │   ├── RIPEMD160Hash.scss
│   │   │   └── RIPEMD160Hash.tsx
│   │   ├── rsa
│   │   │   ├── RSACipher.scss
│   │   │   └── RSACipher.tsx
│   │   ├── sha256
│   │   │   ├── SHA256Hash.scss
│   │   │   └── SHA256Hash.tsx
│   │   ├── vigenere
│   │   │   ├── VigenereCipher.scss
│   │   │   └── VigenereCipher.tsx
│   │   └── xor
│   │       ├── XORCipher.scss
│   │       └── XORCipher.tsx
│   └── common
│       ├── buttons
│       │   ├── MatrixButton.scss
│       │   ├── MatrixButton.tsx
│       │   ├── SoundButton.scss
│       │   └── SoundButton.tsx
│       ├── rain
│       │   ├── MatrixRain.scss
│       │   └── MatrixRain.tsx
│       └── terminal
│           ├── MatrixTerminal.scss
│           └── MatrixTerminal.tsx
├── main.tsx
├── services
│   ├── AudioService.ts
│   ├── CipherService.ts
│   └── ciphers
│       ├── AESService.ts
│       ├── BlowfishService.ts
│       ├── CaesarService.ts
│       ├── RIPEMD160Service.ts
│       ├── RSAService.ts
│       ├── SHA256Service.ts
│       ├── VigenereService.ts
│       └── XORService.ts
├── styles
│   ├── _index.scss
│   ├── _mixins.scss
│   ├── _variables.scss
│   └── main.scss
├── types
│   └── jsencrypt.d.ts
└── vite-env.d.ts
```

## Komponentenbeschreibung
- **AESCipher**: Implementiert den AES-Verschlüsselungsalgorithmus.
- **BlowfishCipher**: Implementiert den Blowfish-Verschlüsselungsalgorithmus.
- **CaesarCipher**: Implementiert den Caesar-Verschlüsselungsalgorithmus.
- **CipherMenu**: Bietet eine Übersicht und Auswahl der verfügbaren Verschlüsselungsalgorithmen.
- **CipherPage**: Hauptseite für die Darstellung der Verschlüsselungsfunktionen.
- **RIPEMD160Hash**: Implementiert den RIPEMD-160 Hash-Algorithmus.
- **RSACipher**: Implementiert den RSA-Verschlüsselungsalgorithmus.
- **SHA256Hash**: Implementiert den SHA-256 Hash-Algorithmus.
- **VigenereCipher**: Implementiert den Vigenere-Verschlüsselungsalgorithmus.
- **XORCipher**: Implementiert den XOR-Verschlüsselungsalgorithmus.

## Services
- **AudioService**: Verarbeitet Audiofunktionen und -effekte.
- **CipherService**: Basisklasse für Verschlüsselungsdienste.
- **Ciphers**: Enthält spezifische Services für jeden Algorithmus.

## Styles
- **_index.scss**: Hauptindex für SCSS-Dateien.
- **_mixins.scss**: Enthält SCSS-Mixins für wiederverwendbare Stile.
- **_variables.scss**: Definiert SCSS-Variablen für Farben, Abstände und mehr.
- **main.scss**: Hauptstylesheet der Anwendung.

## Best Practices

1. **Komponenten-Organisation**:
   - Logische Gruppierung in Ordnern
   - Zusammengehörige Dateien bleiben zusammen

2. **Styling**:
   - Komponenten-spezifische Styles direkt bei der Komponente
   - Globale Styles und Variablen zentral verwaltet
   - BEM-Methodologie für CSS-Klassen

3. **Services**:
   - Trennung von Geschäftslogik und UI
   - Modulare und wiederverwendbare Dienste
