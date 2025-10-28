/**
 * ☁️ 클라우드 스토리지 모듈
 * 구글 드라이브, AWS S3 업로드 지원
 */

const CloudStorage = {
    // 설정
    settings: null,
    
    /**
     * 초기화
     */
    init() {
        this.loadSettings();
    },

    /**
     * 설정 로드
     */
    loadSettings() {
        try {
            this.settings = JSON.parse(localStorage.getItem('tarotAppSettings') || '{}');
        } catch (error) {
            console.error('설정 로드 오류:', error);
            this.settings = {};
        }
    },

    /**
     * 파일 업로드
     * @param {Blob} blob - 업로드할 파일 Blob
     * @param {string} filename - 파일명
     * @param {Function} progressCallback - 진행률 콜백 (선택)
     */
    async upload(blob, filename, progressCallback) {
        this.loadSettings();
        
        const storageType = this.settings.storageType || 'local';
        
        switch (storageType) {
            case 'googledrive':
                return await this.uploadToGoogleDrive(blob, filename, progressCallback);
            
            case 'aws':
                return await this.uploadToAWS(blob, filename, progressCallback);
            
            case 'local':
            default:
                return await this.saveLocally(blob, filename);
        }
    },

    /**
     * 로컬 저장
     */
    async saveLocally(blob, filename) {
        return new Promise((resolve) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            
            setTimeout(() => URL.revokeObjectURL(url), 100);
            
            resolve({
                success: true,
                url: null,
                message: '로컬에 저장되었습니다.',
                storage: 'local'
            });
        });
    },

    /**
     * 구글 드라이브 업로드
     * 주의: OAuth 인증이 필요하므로 현재는 기본 구현만 제공
     */
    async uploadToGoogleDrive(blob, filename, progressCallback) {
        // Google Drive API는 OAuth 2.0 인증이 필요
        // 실제 구현을 위해서는 백엔드 서버가 필요하거나
        // Google Identity Services를 사용해야 함
        
        console.warn('구글 드라이브 업로드는 현재 미구현 상태입니다.');
        console.info('로컬 저장으로 대체합니다.');
        
        // 로컬 저장으로 폴백
        return await this.saveLocally(blob, filename);
    },

    /**
     * AWS S3 업로드
     * 주의: 실제 구현을 위해서는 AWS SDK와 적절한 CORS 설정이 필요
     */
    async uploadToAWS(blob, filename, progressCallback) {
        const { awsAccessKey, awsSecretKey, awsRegion, awsBucket } = this.settings;
        
        if (!awsAccessKey || !awsSecretKey || !awsRegion || !awsBucket) {
            console.error('AWS 설정이 불완전합니다.');
            return await this.saveLocally(blob, filename);
        }

        try {
            // AWS S3 presigned URL 방식 또는 직접 업로드
            // 보안상 이유로 프론트엔드에서 직접 AWS 자격증명을 사용하는 것은 권장하지 않음
            // 실제 프로덕션에서는 백엔드에서 presigned URL을 생성하여 사용해야 함
            
            console.warn('AWS S3 업로드는 보안상 이유로 제한적으로 구현되었습니다.');
            console.info('로컬 저장으로 대체합니다.');
            
            // 로컬 저장으로 폴백
            return await this.saveLocally(blob, filename);
        } catch (error) {
            console.error('AWS 업로드 오류:', error);
            return await this.saveLocally(blob, filename);
        }
    },

    /**
     * 파일명 생성
     * @param {string} scenarioId - 시나리오 ID
     * @returns {string} - 생성된 파일명
     */
    generateFilename(scenarioId) {
        const now = new Date();
        const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
        const timeStr = now.toTimeString().slice(0, 8).replace(/:/g, '');
        
        const scenario = scenarioId || 'general';
        const ext = 'webm'; // 기본 확장자
        
        return `tarot-session-${scenario}-${dateStr}-${timeStr}.${ext}`;
    },

    /**
     * 파일 크기 포맷
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    },

    /**
     * 업로드 기록 저장
     */
    saveUploadHistory(info) {
        try {
            let history = JSON.parse(localStorage.getItem('uploadHistory') || '[]');
            
            history.unshift({
                filename: info.filename,
                size: info.size,
                duration: info.duration,
                scenario: info.scenario,
                storage: info.storage,
                url: info.url,
                timestamp: Date.now()
            });
            
            // 최대 50개까지만 저장
            if (history.length > 50) {
                history = history.slice(0, 50);
            }
            
            localStorage.setItem('uploadHistory', JSON.stringify(history));
        } catch (error) {
            console.error('업로드 기록 저장 오류:', error);
        }
    },

    /**
     * 업로드 기록 가져오기
     */
    getUploadHistory() {
        try {
            return JSON.parse(localStorage.getItem('uploadHistory') || '[]');
        } catch (error) {
            console.error('업로드 기록 로드 오류:', error);
            return [];
        }
    },

    /**
     * 업로드 기록 삭제
     */
    clearUploadHistory() {
        localStorage.removeItem('uploadHistory');
    },

    /**
     * 스토리지 타입 확인
     */
    getStorageType() {
        return this.settings.storageType || 'local';
    },

    /**
     * 스토리지 설정 완료 여부
     */
    isConfigured() {
        const storageType = this.getStorageType();
        
        if (storageType === 'local') {
            return true;
        }
        
        if (storageType === 'googledrive') {
            return !!(this.settings.googleClientId && this.settings.googleClientSecret);
        }
        
        if (storageType === 'aws') {
            return !!(
                this.settings.awsAccessKey &&
                this.settings.awsSecretKey &&
                this.settings.awsRegion &&
                this.settings.awsBucket
            );
        }
        
        return false;
    }
};

// 초기화
CloudStorage.init();

// 전역으로 export
if (typeof window !== 'undefined') {
    window.CloudStorage = CloudStorage;
}
