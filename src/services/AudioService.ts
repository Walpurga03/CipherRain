class AudioService {
    private static instance: AudioService;
    private sounds: Map<string, HTMLAudioElement>;
    private currentSound: HTMLAudioElement | null = null;

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
        const enterSound = new Audio('https://raw.githubusercontent.com/Walpurga03/CipherRain/main/public/audio/matrix-sound.mp3');
        enterSound.preload = 'auto';
        this.sounds.set('matrix-enter', enterSound);
    }

    public async playSound(soundName: string): Promise<void> {
        const sound = this.sounds.get(soundName);
        if (!sound) return;

        try {
            // Stoppe vorherigen Sound, falls vorhanden
            await this.stopSound();
            
            // Setze den neuen Sound
            this.currentSound = sound;
            sound.currentTime = 0;
            await sound.play();
        } catch (error) {
            console.warn('Audio playback failed:', error);
        }
    }

    public async stopSound(): Promise<void> {
        if (!this.currentSound) return;

        try {
            await this.currentSound.pause();
            this.currentSound.currentTime = 0;
            this.currentSound = null;
        } catch (error) {
            console.warn('Audio stop failed:', error);
        }
    }
}

export default AudioService;
