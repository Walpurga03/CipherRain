class AudioService {
    private static instance: AudioService;
    private sounds: Map<string, HTMLAudioElement>;

    private constructor() {
        this.sounds = new Map();
        this.initializeSounds();
    }

    public static getInstance(): AudioService {
        if (!AudioService.instance) {
            AudioService.instance = new AudioService();
        }
        return AudioService.instance;
    }

    private initializeSounds(): void {
        // Matrix Enter Sound
        const enterSound = new Audio('https://raw.githubusercontent.com/Walpurga03/MatrixCipher/main/public/audio/matrix-sound.mp3');
        enterSound.preload = 'auto';
        this.sounds.set('matrix-enter', enterSound);
    }

    public play(soundName: string): void {
        const sound = this.sounds.get(soundName);
        if (sound) {
            sound.currentTime = 0; // Reset to start
            sound.play().catch(error => console.warn('Audio playback failed:', error));
        }
    }
}

export default AudioService.getInstance();
