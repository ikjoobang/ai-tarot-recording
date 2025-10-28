/**
 * 🔮 AI 타로 상담 녹화 시스템 - 메인 애플리케이션
 * 모든 모듈을 통합하여 전체 애플리케이션 동작 관리
 */

class TarotApp {
    constructor() {
        // 상태
        this.state = {
            webcamActive: false,
            recording: false,
            selectedScenario: null,
            conversationActive: false,
            currentBlob: null
        };

        // DOM 요소
        this.elements = {};
        
        // 초기화
        this.init();
    }

    /**
     * 애플리케이션 초기화
     */
    async init() {
        // DOM 요소 참조
        this.cacheDOMElements();
        
        // 이벤트 리스너 설정
        this.setupEventListeners();
        
        // 설정 확인
        this.checkSetup();
        
        // 업로드 기록 로드
        this.loadHistory();
        
        // 권한 및 장치 정보 확인
        await this.checkMediaPermissions();
    }

    /**
     * DOM 요소 캐싱
     */
    cacheDOMElements() {
        // 비디오 관련
        this.elements.webcam = document.getElementById('webcam');
        this.elements.videoOverlay = document.getElementById('videoOverlay');
        this.elements.videoStatus = document.getElementById('videoStatus');
        this.elements.videoContainer = document.getElementById('videoContainer');
        this.elements.aiAvatarContainer = document.getElementById('aiAvatarContainer');
        this.elements.toggleWebcamView = document.getElementById('toggleWebcamView');
        this.elements.toggleWebcamText = document.getElementById('toggleWebcamText');
        this.elements.startWebcam = document.getElementById('startWebcam');
        this.elements.stopWebcam = document.getElementById('stopWebcam');
        this.state.webcamHidden = false;

        // 녹화 관련
        this.elements.recordingStatus = document.getElementById('recordingStatus');
        this.elements.recordingTime = document.getElementById('recordingTime');
        this.elements.startRecording = document.getElementById('startRecording');
        this.elements.pauseRecording = document.getElementById('pauseRecording');
        this.elements.stopRecording = document.getElementById('stopRecording');

        // AI 대화 관련
        this.elements.chatContainer = document.getElementById('chatContainer');
        this.elements.aiStatus = document.getElementById('aiStatus');
        this.elements.speakNext = document.getElementById('speakNext');
        this.elements.skipSpeech = document.getElementById('skipSpeech');

        // 시나리오 관련
        this.elements.scenarioGrid = document.getElementById('scenarioGrid');
        this.elements.selectedScenario = document.getElementById('selectedScenario');

        // 모달
        this.elements.uploadModal = document.getElementById('uploadModal');
        this.elements.successModal = document.getElementById('successModal');
        this.elements.uploadProgress = document.getElementById('uploadProgress');
        this.elements.uploadText = document.getElementById('uploadText');
        this.elements.downloadLink = document.getElementById('downloadLink');
        this.elements.cloudLink = document.getElementById('cloudLink');

        // 기타
        this.elements.setupAlert = document.getElementById('setupAlert');
        this.elements.historyContent = document.getElementById('historyContent');
    }

    /**
     * 이벤트 리스너 설정
     */
    setupEventListeners() {
        // 웹캠 버튼
        this.elements.startWebcam.addEventListener('click', () => this.handleStartWebcam());
        this.elements.stopWebcam.addEventListener('click', () => this.handleStopWebcam());
        
        // 웹캠 미리보기 토글
        if (this.elements.toggleWebcamView) {
            this.elements.toggleWebcamView.addEventListener('click', () => this.toggleWebcamVisibility());
        }

        // 녹화 버튼
        this.elements.startRecording.addEventListener('click', () => this.handleStartRecording());
        this.elements.pauseRecording.addEventListener('click', () => this.handlePauseRecording());
        this.elements.stopRecording.addEventListener('click', () => this.handleStopRecording());

        // AI 대화 버튼
        this.elements.speakNext.addEventListener('click', () => this.handleSpeakNext());
        this.elements.skipSpeech.addEventListener('click', () => this.handleSkipSpeech());

        // 시나리오 선택
        const scenarioCards = this.elements.scenarioGrid.querySelectorAll('.scenario-card');
        scenarioCards.forEach(card => {
            card.addEventListener('click', () => {
                const scenarioId = card.dataset.scenario;
                this.handleScenarioSelect(scenarioId);
            });
        });

        // 녹화 타이머 이벤트
        window.addEventListener('recordingtimer', (e) => {
            this.elements.recordingTime.textContent = e.detail.formatted;
        });
    }

    /**
     * 설정 확인
     */
    checkSetup() {
        // API 키가 코드에 내장되어 있으므로 항상 준비됨
        this.elements.setupAlert.style.display = 'none';
        
        // 모바일 감지
        this.checkMobileDevice();
    }
    
    /**
     * 모바일 장치 감지 및 경고 표시
     */
    checkMobileDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isSmallScreen = window.innerWidth < 768;
        
        if (isMobile || isSmallScreen) {
            const mobileAlert = document.getElementById('mobileAlert');
            if (mobileAlert) {
                mobileAlert.style.display = 'flex';
            }
        }
    }

    /**
     * 웹캠 시작
     */
    async handleStartWebcam() {
        try {
            this.updateVideoStatus('연결 중...', 'info');
            
            const settings = JSON.parse(localStorage.getItem('tarotAppSettings') || '{}');
            const quality = settings.videoQuality || 'medium';
            
            const result = await VideoRecorder.startWebcam(this.elements.webcam, { quality });
            
            if (result.success) {
                this.state.webcamActive = true;
                this.elements.videoOverlay.style.display = 'none';
                this.updateVideoStatus('연결됨', 'success');
                
                // 버튼 상태 변경
                this.elements.startWebcam.disabled = true;
                this.elements.stopWebcam.disabled = false;
                
                // 시나리오 선택 시 녹화 가능
                if (this.state.selectedScenario) {
                    this.elements.startRecording.disabled = false;
                }
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('웹캠 시작 오류:', error);
            this.updateVideoStatus('오류', 'error');
            alert(`웹캠 시작 실패: ${error.message}`);
        }
    }

    /**
     * 웹캠 종료
     */
    handleStopWebcam() {
        VideoRecorder.stopWebcam();
        this.state.webcamActive = false;
        
        this.elements.videoOverlay.style.display = 'flex';
        this.updateVideoStatus('대기 중', 'default');
        
        this.elements.startWebcam.disabled = false;
        this.elements.stopWebcam.disabled = true;
        this.elements.startRecording.disabled = true;
    }

    /**
     * 시나리오 선택
     */
    handleScenarioSelect(scenarioId) {
        // 이전 선택 해제
        const cards = this.elements.scenarioGrid.querySelectorAll('.scenario-card');
        cards.forEach(card => card.classList.remove('selected'));
        
        // 새 선택
        const selectedCard = this.elements.scenarioGrid.querySelector(`[data-scenario="${scenarioId}"]`);
        selectedCard.classList.add('selected');
        
        this.state.selectedScenario = scenarioId;
        
        // 선택된 시나리오 표시
        const scenario = TarotScenarios.getScenario(scenarioId);
        this.elements.selectedScenario.innerHTML = `
            <span style="font-size: 1.5rem;">${scenario.icon}</span>
            ${scenario.name}
        `;
        this.elements.selectedScenario.classList.add('active');
        
        // 웹캠이 활성화되어 있으면 녹화 가능
        if (this.state.webcamActive) {
            this.elements.startRecording.disabled = false;
        }
    }

    /**
     * 녹화 시작
     */
    async handleStartRecording() {
        try {
            // 녹화 시작
            await VideoRecorder.startRecording();
            this.state.recording = true;
            
            // UI 업데이트
            this.elements.recordingStatus.style.display = 'block';
            this.elements.startRecording.disabled = true;
            this.elements.pauseRecording.disabled = false;
            this.elements.stopRecording.disabled = false;
            
            // AI 대화 시작
            await this.startConversation();
            
        } catch (error) {
            console.error('녹화 시작 오류:', error);
            alert(`녹화 시작 실패: ${error.message}`);
        }
    }

    /**
     * 녹화 일시정지/재개
     */
    handlePauseRecording() {
        try {
            const result = VideoRecorder.pauseRecording();
            
            if (VideoRecorder.isPaused) {
                this.elements.pauseRecording.innerHTML = '<i class="fas fa-play"></i> 재개';
            } else {
                this.elements.pauseRecording.innerHTML = '<i class="fas fa-pause"></i> 일시정지';
            }
        } catch (error) {
            console.error('녹화 일시정지 오류:', error);
        }
    }

    /**
     * 녹화 종료
     */
    async handleStopRecording() {
        try {
            // 음성 중지
            TTS.stop();
            
            // 녹화 종료
            const result = await VideoRecorder.stopRecording();
            this.state.recording = false;
            this.state.conversationActive = false;
            this.state.currentBlob = result.blob;
            
            // UI 업데이트
            this.elements.recordingStatus.style.display = 'none';
            this.elements.startRecording.disabled = false;
            this.elements.pauseRecording.disabled = true;
            this.elements.stopRecording.disabled = true;
            this.elements.speakNext.disabled = true;
            this.elements.skipSpeech.disabled = true;
            
            this.updateAIStatus('대기 중', 'default');
            
            // 업로드
            await this.uploadRecording(result.blob, result.duration);
            
        } catch (error) {
            console.error('녹화 종료 오류:', error);
            alert(`녹화 종료 실패: ${error.message}`);
        }
    }

    /**
     * AI 대화 시작
     */
    async startConversation() {
        try {
            this.state.conversationActive = true;
            
            // 대화 초기화
            GeminiAI.startNewConversation(this.state.selectedScenario);
            
            // 채팅 컨테이너 초기화
            this.elements.chatContainer.innerHTML = '';
            
            // 오프닝 메시지 생성
            this.updateAIStatus('대화 생성 중...', 'info');
            const opening = await GeminiAI.generateOpening();
            
            // 메시지 표시
            this.addChatMessage(opening, 'ai');
            
            // 음성 재생
            this.updateAIStatus('말하는 중...', 'speaking');
            await TTS.speak(opening);
            
            // 다음 대화 버튼 활성화
            this.updateAIStatus('대기 중', 'active');
            this.elements.speakNext.disabled = false;
            this.elements.skipSpeech.disabled = false;
            
        } catch (error) {
            console.error('대화 시작 오류:', error);
            this.updateAIStatus('오류', 'error');
            alert(`AI 대화 시작 실패: ${error.message}`);
        }
    }

    /**
     * 다음 AI 대화
     */
    async handleSpeakNext() {
        if (!this.state.conversationActive) return;
        
        try {
            this.elements.speakNext.disabled = true;
            this.elements.skipSpeech.disabled = true;
            
            // 강사 응답 시뮬레이션 (실제로는 강사가 카메라 앞에서 말함)
            // 여기서는 간단히 다음 AI 메시지 생성
            
            this.updateAIStatus('응답 생성 중...', 'info');
            
            // 임시 강사 응답
            const teacherResponse = "카드를 보니 긍정적인 에너지가 느껴지네요.";
            
            // AI 응답 생성
            const aiResponse = await GeminiAI.generateResponse(teacherResponse);
            
            // 메시지 표시
            this.addChatMessage(aiResponse, 'ai');
            
            // 음성 재생
            this.updateAIStatus('말하는 중...', 'speaking');
            await TTS.speak(aiResponse);
            
            // 버튼 다시 활성화
            this.updateAIStatus('대기 중', 'active');
            this.elements.speakNext.disabled = false;
            this.elements.skipSpeech.disabled = false;
            
        } catch (error) {
            console.error('AI 응답 오류:', error);
            this.updateAIStatus('오류', 'error');
            this.elements.speakNext.disabled = false;
            this.elements.skipSpeech.disabled = false;
        }
    }

    /**
     * 음성 스킵
     */
    handleSkipSpeech() {
        TTS.stop();
        this.updateAIStatus('대기 중', 'active');
    }

    /**
     * 채팅 메시지 추가
     */
    addChatMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;
        
        if (type === 'ai') {
            messageDiv.innerHTML = `
                <div class="chat-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="chat-bubble">${text}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="chat-bubble">${text}</div>
            `;
        }
        
        this.elements.chatContainer.appendChild(messageDiv);
        
        // 스크롤 아래로
        this.elements.chatContainer.scrollTop = this.elements.chatContainer.scrollHeight;
    }

    /**
     * 비디오 상태 업데이트
     */
    updateVideoStatus(text, status) {
        this.elements.videoStatus.innerHTML = `
            <i class="fas fa-circle"></i> ${text}
        `;
        
        this.elements.videoStatus.className = 'video-status';
        if (status === 'success') {
            this.elements.videoStatus.style.color = 'var(--success-color)';
        } else if (status === 'error') {
            this.elements.videoStatus.style.color = 'var(--danger-color)';
        } else if (status === 'info') {
            this.elements.videoStatus.style.color = 'var(--info-color)';
        } else {
            this.elements.videoStatus.style.color = 'var(--text-muted)';
        }
    }

    /**
     * AI 상태 업데이트
     */
    updateAIStatus(text, status) {
        this.elements.aiStatus.innerHTML = `
            <i class="fas fa-circle"></i> ${text}
        `;
        
        this.elements.aiStatus.className = 'ai-status';
        if (status === 'active') {
            this.elements.aiStatus.style.color = 'var(--success-color)';
        } else if (status === 'speaking') {
            this.elements.aiStatus.style.color = 'var(--warning-color)';
        } else if (status === 'error') {
            this.elements.aiStatus.style.color = 'var(--danger-color)';
        } else if (status === 'info') {
            this.elements.aiStatus.style.color = 'var(--info-color)';
        } else {
            this.elements.aiStatus.style.color = 'var(--text-muted)';
        }
    }

    /**
     * 녹화 영상 업로드
     */
    async uploadRecording(blob, duration) {
        try {
            // 업로드 모달 표시
            this.elements.uploadModal.style.display = 'flex';
            this.elements.uploadProgress.style.width = '0%';
            this.elements.uploadText.textContent = '업로드 준비 중...';
            
            // 파일명 생성
            const filename = CloudStorage.generateFilename(this.state.selectedScenario);
            
            // 진행률 시뮬레이션
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 10;
                if (progress <= 90) {
                    this.elements.uploadProgress.style.width = progress + '%';
                    this.elements.uploadText.textContent = `업로드 중... ${progress}%`;
                }
            }, 200);
            
            // 업로드 (실제로는 로컬 저장)
            const result = await CloudStorage.upload(blob, filename);
            
            clearInterval(progressInterval);
            this.elements.uploadProgress.style.width = '100%';
            this.elements.uploadText.textContent = '업로드 완료!';
            
            // 업로드 기록 저장
            CloudStorage.saveUploadHistory({
                filename: filename,
                size: blob.size,
                duration: duration,
                scenario: this.state.selectedScenario,
                storage: result.storage,
                url: result.url
            });
            
            // 업로드 모달 숨기기
            setTimeout(() => {
                this.elements.uploadModal.style.display = 'none';
                this.showSuccessModal(blob, filename, result.url);
            }, 1000);
            
            // 기록 새로고침
            this.loadHistory();
            
        } catch (error) {
            console.error('업로드 오류:', error);
            this.elements.uploadModal.style.display = 'none';
            alert(`업로드 실패: ${error.message}`);
        }
    }

    /**
     * 성공 모달 표시
     */
    showSuccessModal(blob, filename, cloudUrl) {
        const url = URL.createObjectURL(blob);
        
        this.elements.downloadLink.href = url;
        this.elements.downloadLink.download = filename;
        
        if (cloudUrl) {
            this.elements.cloudLink.href = cloudUrl;
            this.elements.cloudLink.style.display = 'inline-flex';
        } else {
            this.elements.cloudLink.style.display = 'none';
        }
        
        this.elements.successModal.style.display = 'flex';
    }

    /**
     * 웹캠 미리보기 표시/숨김 토글
     */
    toggleWebcamVisibility() {
        this.state.webcamHidden = !this.state.webcamHidden;
        
        if (this.state.webcamHidden) {
            // 웹캠 숨기고 AI 아바타 표시
            this.elements.videoContainer.classList.add('hidden-webcam');
            this.elements.aiAvatarContainer.style.display = 'flex';
            this.elements.toggleWebcamText.textContent = '미리보기 보이기';
            this.elements.toggleWebcamView.querySelector('i').className = 'fas fa-eye-slash';
        } else {
            // AI 아바타 숨기고 웹캠 표시
            this.elements.videoContainer.classList.remove('hidden-webcam');
            this.elements.aiAvatarContainer.style.display = 'none';
            this.elements.toggleWebcamText.textContent = '미리보기 숨기기';
            this.elements.toggleWebcamView.querySelector('i').className = 'fas fa-eye';
        }
    }

    /**
     * 업로드 기록 로드
     */
    loadHistory() {
        const history = CloudStorage.getUploadHistory();
        
        if (history.length === 0) {
            this.elements.historyContent.innerHTML = `
                <div class="history-empty">
                    <i class="fas fa-folder-open"></i>
                    <p>아직 녹화 기록이 없습니다</p>
                </div>
            `;
            return;
        }
        
        this.elements.historyContent.innerHTML = history.map(item => {
            const scenario = TarotScenarios.getScenario(item.scenario);
            const date = new Date(item.timestamp);
            
            return `
                <div class="history-item">
                    <div class="history-icon">
                        ${scenario ? scenario.icon : '📹'}
                    </div>
                    <div class="history-info">
                        <div class="history-title">${item.filename}</div>
                        <div class="history-meta">
                            ${date.toLocaleDateString()} ${date.toLocaleTimeString()} · 
                            ${CloudStorage.formatFileSize(item.size)} · 
                            ${VideoRecorder.formatTime(item.duration)}
                        </div>
                    </div>
                    <div class="history-actions">
                        ${item.url ? `<a href="${item.url}" target="_blank" class="btn btn-ghost btn-sm">
                            <i class="fas fa-external-link-alt"></i>
                        </a>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }
}

// 애플리케이션 시작
let app;

    /**
     * 미디어 권한 및 장치 정보 확인
     */
    async checkMediaPermissions() {
        try {
            console.log('🔍 시스템 정보 확인 중...');
            
            // 권한 상태 확인
            const permissions = await VideoRecorder.checkPermissions();
            console.log('📋 현재 권한 상태:', permissions);
            
            // 장치 목록 확인
            const devices = await VideoRecorder.getDevices();
            if (devices) {
                console.log('✅ 발견된 카메라:', devices.video.length, '개');
                console.log('✅ 발견된 마이크:', devices.audio.length, '개');
                
                if (devices.video.length === 0) {
                    console.warn('⚠️ 카메라를 찾을 수 없습니다. 장치가 연결되어 있는지 확인하세요.');
                }
                if (devices.audio.length === 0) {
                    console.warn('⚠️ 마이크를 찾을 수 없습니다. 장치가 연결되어 있는지 확인하세요.');
                }
            }
            
            // 브라우저 정보 출력
            console.log('🌐 브라우저:', navigator.userAgent);
            console.log('🔒 보안 컨텍스트 (HTTPS):', window.isSecureContext);
            
        } catch (error) {
            console.error('❌ 미디어 정보 확인 실패:', error);
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    app = new TarotApp();
});

// 유틸리티 함수들
function closeAlert() {
    document.getElementById('setupAlert').style.display = 'none';
}

function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}

function clearHistory() {
    if (confirm('모든 녹화 기록을 삭제하시겠습니까?')) {
        CloudStorage.clearUploadHistory();
        app.loadHistory();
    }
}
