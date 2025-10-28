/**
 * 🎥 웹캠 녹화 모듈
 * WebRTC MediaRecorder API를 사용한 비디오 녹화
 */

const VideoRecorder = {
    // 미디어 스트림
    stream: null,
    
    // 미디어 레코더
    mediaRecorder: null,
    
    // 녹화 데이터
    recordedChunks: [],
    
    // 녹화 상태
    isRecording: false,
    isPaused: false,
    
    // 녹화 시작 시간
    startTime: null,
    
    // 타이머 인터벌
    timerInterval: null,

    /**
     * 웹캠 시작
     */
    async startWebcam(videoElement, options = {}) {
        try {
            console.log('🎥 웹캠 시작 시도...');
            
            // 브라우저 지원 확인
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('이 브라우저는 웹캠을 지원하지 않습니다.');
            }
            
            // 비디오 품질 설정
            const quality = this.getQualitySettings(options.quality || 'medium');
            console.log('📹 비디오 품질 설정:', quality);
            
            // 비디오 제약 조건 생성
            const videoConstraints = {
                width: quality.width,
                height: quality.height,
                frameRate: quality.frameRate
            };
            
            // 특정 카메라 ID가 지정된 경우
            if (options.deviceId) {
                videoConstraints.deviceId = { exact: options.deviceId };
                console.log('📹 선택된 카메라 ID:', options.deviceId);
            }
            
            // 미디어 스트림 요청
            console.log('🔑 카메라 권한 요청 중...');
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: videoConstraints,
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            });

            console.log('✅ 카메라 접근 성공!');
            console.log('📊 스트림 정보:', {
                video: this.stream.getVideoTracks()[0].label,
                audio: this.stream.getAudioTracks()[0].label
            });

            // 비디오 요소에 스트림 연결
            if (videoElement) {
                videoElement.srcObject = this.stream;
                videoElement.muted = true; // 에코 방지
            }

            return { success: true, message: '웹캠이 시작되었습니다.' };
        } catch (error) {
            console.error('❌ 웹캠 시작 오류:', error);
            console.error('오류 상세:', {
                name: error.name,
                message: error.message,
                constraint: error.constraint
            });
            
            // 오류 유형별 상세 메시지
            let errorMessage = '웹캠 시작 실패: ';
            if (error.name === 'NotAllowedError') {
                errorMessage += '카메라 권한이 거부되었습니다. 브라우저 주소창 왼쪽의 자물쇠 아이콘을 클릭하여 카메라 권한을 허용해주세요.';
            } else if (error.name === 'NotFoundError') {
                errorMessage += '카메라를 찾을 수 없습니다. 웹캠이 연결되어 있는지 확인해주세요.';
            } else if (error.name === 'NotReadableError') {
                errorMessage += '카메라가 다른 프로그램에서 사용 중입니다. 다른 앱을 종료하고 다시 시도해주세요.';
            } else if (error.name === 'OverconstrainedError') {
                errorMessage += '요청한 카메라 설정을 지원하지 않습니다. 다른 품질 설정을 시도해주세요.';
            } else if (error.name === 'SecurityError') {
                errorMessage += '보안 오류가 발생했습니다. HTTPS 연결을 사용하고 있는지 확인해주세요.';
            } else {
                errorMessage += error.message;
            }
            
            return { 
                success: false, 
                message: errorMessage,
                errorDetails: {
                    name: error.name,
                    message: error.message
                }
            };
        }
    },

    /**
     * 웹캠 종료
     */
    stopWebcam() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
    },

    /**
     * 녹화 시작
     */
    async startRecording(options = {}) {
        if (!this.stream) {
            throw new Error('웹캠이 시작되지 않았습니다.');
        }

        if (this.isRecording) {
            throw new Error('이미 녹화 중입니다.');
        }

        try {
            // 녹화 데이터 초기화
            this.recordedChunks = [];
            
            // MediaRecorder 생성
            const mimeType = this.getSupportedMimeType();
            this.mediaRecorder = new MediaRecorder(this.stream, {
                mimeType: mimeType,
                videoBitsPerSecond: options.videoBitrate || 2500000 // 2.5 Mbps
            });

            // 데이터 이벤트 핸들러
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                    this.recordedChunks.push(event.data);
                }
            };

            // 녹화 종료 이벤트 핸들러
            this.mediaRecorder.onstop = () => {
                this.isRecording = false;
                this.stopTimer();
            };

            // 오류 이벤트 핸들러
            this.mediaRecorder.onerror = (event) => {
                console.error('녹화 오류:', event.error);
                this.isRecording = false;
                this.stopTimer();
            };

            // 녹화 시작
            this.mediaRecorder.start(100); // 100ms마다 데이터 수집
            this.isRecording = true;
            this.isPaused = false;
            this.startTime = Date.now();
            
            // 타이머 시작
            this.startTimer();

            return { success: true, message: '녹화가 시작되었습니다.' };
        } catch (error) {
            console.error('녹화 시작 오류:', error);
            throw error;
        }
    },

    /**
     * 녹화 일시정지
     */
    pauseRecording() {
        if (!this.isRecording) {
            throw new Error('녹화 중이 아닙니다.');
        }

        if (this.isPaused) {
            // 재개
            this.mediaRecorder.resume();
            this.isPaused = false;
            this.startTimer();
            return { success: true, message: '녹화가 재개되었습니다.' };
        } else {
            // 일시정지
            this.mediaRecorder.pause();
            this.isPaused = true;
            this.stopTimer();
            return { success: true, message: '녹화가 일시정지되었습니다.' };
        }
    },

    /**
     * 녹화 종료
     */
    async stopRecording() {
        if (!this.isRecording) {
            throw new Error('녹화 중이 아닙니다.');
        }

        return new Promise((resolve, reject) => {
            this.mediaRecorder.onstop = () => {
                this.isRecording = false;
                this.isPaused = false;
                this.stopTimer();

                // Blob 생성
                const blob = new Blob(this.recordedChunks, {
                    type: this.mediaRecorder.mimeType
                });

                resolve({
                    success: true,
                    blob: blob,
                    duration: this.getRecordingDuration(),
                    size: blob.size
                });
            };

            this.mediaRecorder.onerror = (event) => {
                reject(event.error);
            };

            // 녹화 중지
            this.mediaRecorder.stop();
        });
    },

    /**
     * 타이머 시작
     */
    startTimer() {
        this.timerInterval = setInterval(() => {
            const elapsed = this.getRecordingDuration();
            const formatted = this.formatTime(elapsed);
            
            // 타이머 업데이트 이벤트 발생
            const event = new CustomEvent('recordingtimer', {
                detail: { elapsed, formatted }
            });
            window.dispatchEvent(event);
        }, 1000);
    },

    /**
     * 타이머 종료
     */
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    },

    /**
     * 녹화 시간 계산 (초)
     */
    getRecordingDuration() {
        if (!this.startTime) return 0;
        return Math.floor((Date.now() - this.startTime) / 1000);
    },

    /**
     * 시간 포맷 (MM:SS)
     */
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    /**
     * 지원되는 MIME 타입 가져오기
     */
    getSupportedMimeType() {
        const types = [
            'video/webm;codecs=vp9',
            'video/webm;codecs=vp8',
            'video/webm',
            'video/mp4'
        ];

        for (const type of types) {
            if (MediaRecorder.isTypeSupported(type)) {
                return type;
            }
        }

        return 'video/webm'; // 기본값
    },

    /**
     * 비디오 품질 설정
     */
    getQualitySettings(quality) {
        const settings = {
            low: {
                width: { ideal: 640 },
                height: { ideal: 360 },
                frameRate: { ideal: 24 }
            },
            medium: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                frameRate: { ideal: 30 }
            },
            high: {
                width: { ideal: 1920 },
                height: { ideal: 1080 },
                frameRate: { ideal: 30 }
            }
        };

        return settings[quality] || settings.medium;
    },

    /**
     * 녹화 데이터를 파일로 저장
     */
    downloadRecording(blob, filename) {
        try {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            
            // DOM에 추가 (모바일 호환성)
            document.body.appendChild(a);
            
            // 클릭 이벤트 트리거
            a.click();
            
            // DOM에서 제거
            document.body.removeChild(a);
            
            // 메모리 해제
            setTimeout(() => URL.revokeObjectURL(url), 1000);
            
            // 모바일에서는 새 탭에서 열기도 시도
            if (/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                // iOS Safari에서는 다른 방식 필요
                const reader = new FileReader();
                reader.onload = function() {
                    const dataUrl = reader.result;
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = filename;
                    link.click();
                };
                reader.readAsDataURL(blob);
            }
            
            return true;
        } catch (error) {
            console.error('다운로드 오류:', error);
            // 대체 방법: 새 탭에서 열기
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            return false;
        }
    },

    /**
     * 녹화 상태 확인
     */
    getStatus() {
        return {
            isRecording: this.isRecording,
            isPaused: this.isPaused,
            duration: this.getRecordingDuration()
        };
    },

    /**
     * 미디어 장치 권한 확인
     */
    async checkPermissions() {
        try {
            console.log('🔍 권한 상태 확인 중...');
            
            // 카메라 권한 확인
            const cameraPermission = await navigator.permissions.query({ name: 'camera' });
            console.log('📹 카메라 권한:', cameraPermission.state);
            
            // 마이크 권한 확인
            const micPermission = await navigator.permissions.query({ name: 'microphone' });
            console.log('🎤 마이크 권한:', micPermission.state);
            
            return {
                camera: cameraPermission.state,
                microphone: micPermission.state
            };
        } catch (error) {
            console.warn('⚠️ 권한 확인 실패 (일부 브라우저에서는 지원하지 않음):', error);
            return 'unknown';
        }
    },
    
    /**
     * 미디어 장치 목록 가져오기
     */
    async getDevices() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            const audioDevices = devices.filter(device => device.kind === 'audioinput');
            
            console.log('📹 비디오 장치:', videoDevices);
            console.log('🎤 오디오 장치:', audioDevices);
            
            return {
                video: videoDevices,
                audio: audioDevices
            };
        } catch (error) {
            console.error('❌ 장치 목록 가져오기 실패:', error);
            return null;
        }
    }
};

// 전역으로 export
if (typeof window !== 'undefined') {
    window.VideoRecorder = VideoRecorder;
}
