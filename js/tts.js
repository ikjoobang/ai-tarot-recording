/**
 * 🗣️ 음성 합성 모듈 (TTS - Text To Speech)
 * Web Speech API를 사용한 한국어 음성 합성
 */

const TTS = {
    // 음성 합성 객체
    synthesis: window.speechSynthesis,
    
    // 현재 발화 객체
    currentUtterance: null,
    
    // 음성 목록
    voices: [],
    
    // 설정
    settings: {
        voice: null,
        rate: 1.0,    // 속도
        pitch: 1.0,   // 음높이
        volume: 1.0   // 볼륨
    },

    /**
     * 초기화
     */
    init() {
        // Web Speech API 지원 확인
        if (!this.synthesis) {
            console.warn('이 브라우저는 음성 합성을 지원하지 않습니다.');
            return;
        }

        // 음성 목록 로드
        this.loadVoices();
        
        // 음성 변경 이벤트 리스너
        if (this.synthesis.onvoiceschanged !== undefined) {
            this.synthesis.onvoiceschanged = () => this.loadVoices();
        }

        // 저장된 설정 불러오기
        this.loadSettings();
    },

    /**
     * 사용 가능한 음성 목록 로드
     */
    loadVoices() {
        if (!this.synthesis) return;
        
        this.voices = this.synthesis.getVoices();
        
        console.log('사용 가능한 음성:', this.voices.length + '개');
        
        // 한국어 음성만 필터링
        const koreanVoices = this.voices.filter(voice => 
            voice.lang.startsWith('ko')
        );
        
        console.log('한국어 음성:', koreanVoices.length + '개', koreanVoices.map(v => v.name));
        
        // 기본 한국어 음성 설정
        if (koreanVoices.length > 0 && !this.settings.voice) {
            this.settings.voice = koreanVoices[0];
            console.log('선택된 음성:', koreanVoices[0].name);
        } else if (this.voices.length > 0 && !this.settings.voice) {
            // 한국어 음성이 없으면 첫 번째 음성 사용
            this.settings.voice = this.voices[0];
            console.log('기본 음성 사용:', this.voices[0].name);
        }
    },

    /**
     * 저장된 설정 불러오기
     */
    loadSettings() {
        try {
            const settings = JSON.parse(localStorage.getItem('tarotAppSettings') || '{}');
            
            if (settings.ttsVoice) {
                const voice = this.voices.find(v => v.name === settings.ttsVoice);
                if (voice) this.settings.voice = voice;
            }
            
            if (settings.ttsSpeed) {
                this.settings.rate = parseFloat(settings.ttsSpeed);
            }
            
            if (settings.ttsPitch) {
                this.settings.pitch = parseFloat(settings.ttsPitch);
            }
        } catch (error) {
            console.error('TTS 설정 로드 오류:', error);
        }
    },

    /**
     * 텍스트를 음성으로 변환
     * @param {string} text - 읽을 텍스트
     * @param {Object} options - 추가 옵션
     * @returns {Promise} - 발화 완료 시 resolve
     */
    speak(text, options = {}) {
        return new Promise((resolve, reject) => {
            // Web Speech API 지원 확인
            if (!this.synthesis) {
                console.warn('음성 합성을 사용할 수 없습니다.');
                resolve();
                return;
            }

            // 현재 발화 중지
            this.stop();

            // 텍스트가 비어있으면 종료
            if (!text || text.trim().length === 0) {
                resolve();
                return;
            }

            // 발화 객체 생성
            const utterance = new SpeechSynthesisUtterance(text);
            
            // 음성 설정
            utterance.lang = 'ko-KR';
            utterance.rate = options.rate || this.settings.rate;
            utterance.pitch = options.pitch || this.settings.pitch;
            utterance.volume = options.volume || this.settings.volume;
            
            // 선택된 음성 적용
            if (this.settings.voice) {
                utterance.voice = this.settings.voice;
            }

            // 이벤트 핸들러
            utterance.onend = () => {
                this.currentUtterance = null;
                resolve();
            };

            utterance.onerror = (event) => {
                console.error('TTS 오류:', event);
                this.currentUtterance = null;
                reject(event);
            };

            // 발화 시작
            this.currentUtterance = utterance;
            
            console.log('TTS 발화 시작:', text.substring(0, 50) + '...');
            console.log('사용 음성:', utterance.voice ? utterance.voice.name : '기본 음성');
            
            this.synthesis.speak(utterance);
        });
    },

    /**
     * 현재 발화 중지
     */
    stop() {
        if (this.synthesis && this.synthesis.speaking) {
            this.synthesis.cancel();
        }
        this.currentUtterance = null;
    },

    /**
     * 일시정지
     */
    pause() {
        if (this.synthesis && this.synthesis.speaking && !this.synthesis.paused) {
            this.synthesis.pause();
        }
    },

    /**
     * 재개
     */
    resume() {
        if (this.synthesis && this.synthesis.paused) {
            this.synthesis.resume();
        }
    },

    /**
     * 발화 중인지 확인
     */
    isSpeaking() {
        return this.synthesis && this.synthesis.speaking;
    },

    /**
     * 일시정지 중인지 확인
     */
    isPaused() {
        return this.synthesis && this.synthesis.paused;
    },

    /**
     * 한국어 음성 목록 가져오기
     */
    getKoreanVoices() {
        return this.voices.filter(voice => voice.lang.startsWith('ko'));
    },

    /**
     * 음성 설정 변경
     */
    updateSettings(newSettings) {
        if (newSettings.voice) {
            const voice = this.voices.find(v => v.name === newSettings.voice);
            if (voice) this.settings.voice = voice;
        }
        
        if (newSettings.rate !== undefined) {
            this.settings.rate = newSettings.rate;
        }
        
        if (newSettings.pitch !== undefined) {
            this.settings.pitch = newSettings.pitch;
        }
        
        if (newSettings.volume !== undefined) {
            this.settings.volume = newSettings.volume;
        }
    },

    /**
     * 테스트 음성 재생
     */
    async test(text = '안녕하세요, 타로 상담을 시작하겠습니다.') {
        try {
            await this.speak(text);
            return true;
        } catch (error) {
            console.error('TTS 테스트 실패:', error);
            return false;
        }
    }
};

// 페이지 로드 시 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        TTS.init();
    });
} else {
    TTS.init();
}

// 전역으로 export
if (typeof window !== 'undefined') {
    window.TTS = TTS;
}
