# CipherRain Projektstruktur

## Übersicht

CipherRain ist eine React-Anwendung mit TypeScript, die verschiedene Verschlüsselungsmethoden in einem Matrix-inspirierten Design präsentiert.

## Ordnerstruktur

```
src/
├── components/               # React-Komponenten
│   ├── ciphers/            # Verschlüsselungs-bezogene Komponenten
│   │   ├── caesar/         # Caesar-Verschlüsselung
│   │   │   ├── CaesarCipher.tsx
│   │   │   └── CaesarCipher.scss
│   │   ├── menu/          # Cipher-Auswahlmenü
│   │   │   ├── CipherMenu.tsx
│   │   │   └── CipherMenu.scss
│   │   └── pages/         # Seiten für Verschlüsselungen
│   │       └── CipherPage.tsx
│   └── common/            # Wiederverwendbare Komponenten
│       ├── buttons/       # Button-Komponenten
│       │   ├── MatrixButton.tsx
│       │   ├── MatrixButton.scss
│       │   ├── SoundButton.tsx
│       │   └── SoundButton.scss
│       ├── popups/        # Popup-Komponenten
│       │   ├── InfoPopup.tsx
│       │   └── InfoPopup.scss
│       ├── rain/          # Matrix-Regen-Animation
│       │   ├── MatrixRain.tsx
│       │   └── MatrixRain.scss
│       └── terminal/      # Terminal-Komponente
│           ├── MatrixTerminal.tsx
│           └── MatrixTerminal.scss
├── services/               # Dienste und Logik
│   ├── AudioService.ts    # Audio-Verwaltung
│   ├── CipherService.ts   # Basis-Verschlüsselungsdienst
│   └── ciphers/          # Spezifische Verschlüsselungsdienste
│       └── CaesarService.ts
├── styles/                # Globale Styles
│   ├── _variables.scss   # SCSS-Variablen
│   ├── _index.scss      # Style-Forwarding
│   └── main.scss        # Globale Styles
├── App.tsx               # Haupt-App-Komponente
├── main.tsx             # App-Einstiegspunkt
└── vite-env.d.ts        # Vite Umgebungstypdeklarationen
```

## Komponenten-Organisation

- **Cipher-Komponenten**: Jede Verschlüsselungsmethode hat ihren eigenen Ordner mit zugehörigen Komponenten und Styles
- **Common-Komponenten**: Wiederverwendbare UI-Elemente, jeweils mit eigenen Style-Dateien
- **Services**: Geschäftslogik und Funktionalität, getrennt von der UI

## Styling-Struktur

- **Globale Styles**: In `/styles`
  - `_variables.scss`: Gemeinsame Variablen (Farben, Schriften, etc.)
  - `main.scss`: Globale Styles und Reset
- **Komponenten-Styles**: Direkt neben den zugehörigen Komponenten
  - Verbesserte Modularität
  - Einfachere Wartung
  - Klare Zuordnung von Styles zu Komponenten

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
