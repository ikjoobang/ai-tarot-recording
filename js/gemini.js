/**
 * 🤖 Gemini AI 대화 모듈
 * Google Gemini API를 사용한 실시간 타로 상담 대화 생성
 */

const GeminiAI = {
    // API 설정
    apiKey: 'AIzaSyAyoQiVGNqviRfGqRmNhgH5XXlNkj0zGnI',
    apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
    
    // 대화 기록
    conversationHistory: [],
    
    // 현재 시나리오
    currentScenario: null,
    
    // 메시지 카운터
    messageCount: 0,

    /**
     * 초기화
     */
    init() {
        // API 키가 이미 설정되어 있으므로 별도 로드 불필요
        // 필요시 localStorage에서 오버라이드 가능
        this.loadApiKey();
    },

    /**
     * API 키 로드 (옵션)
     */
    loadApiKey() {
        try {
            const settings = JSON.parse(localStorage.getItem('tarotAppSettings') || '{}');
            // localStorage에 키가 있으면 그것을 사용, 없으면 기본 키 사용
            if (settings.geminiApiKey) {
                this.apiKey = settings.geminiApiKey;
            }
        } catch (error) {
            console.error('API 키 로드 오류:', error);
        }
    },

    /**
     * API 키 설정 여부 확인
     */
    hasApiKey() {
        return !!this.apiKey;
    },

    /**
     * 새 대화 시작
     */
    startNewConversation(scenarioId) {
        this.currentScenario = scenarioId;
        this.conversationHistory = [];
        this.messageCount = 0;
    },

    /**
     * 오프닝 메시지 생성
     */
    async generateOpening() {
        if (!this.hasApiKey()) {
            throw new Error('Gemini API 키가 설정되지 않았습니다.');
        }

        if (!this.currentScenario) {
            throw new Error('시나리오가 선택되지 않았습니다.');
        }

        const scenario = TarotScenarios.getScenario(this.currentScenario);
        if (!scenario) {
            throw new Error('유효하지 않은 시나리오입니다.');
        }

        // 간단한 오프닝은 미리 정의된 것 사용
        const opening = scenario.openingLines[0];
        
        this.conversationHistory.push({
            role: 'client',
            content: opening
        });
        
        this.messageCount++;
        
        return opening;
    },

    /**
     * AI 응답 생성
     */
    async generateResponse(teacherMessage) {
        if (!this.hasApiKey()) {
            throw new Error('Gemini API 키가 설정되지 않았습니다.');
        }

        // 강사 메시지 기록
        this.conversationHistory.push({
            role: 'teacher',
            content: teacherMessage
        });

        // 대화 단계 판단
        const stage = TarotScenarios.getConversationStage(this.messageCount);
        
        // 마무리 단계면 마무리 멘트 반환
        if (stage === 'closing' && this.messageCount >= 10) {
            const closing = TarotScenarios.getClosingLine(this.currentScenario);
            
            this.conversationHistory.push({
                role: 'client',
                content: closing
            });
            
            this.messageCount++;
            return closing;
        }

        // Gemini API 호출
        try {
            const response = await this.callGeminiAPI();
            
            this.conversationHistory.push({
                role: 'client',
                content: response
            });
            
            this.messageCount++;
            
            return response;
        } catch (error) {
            console.error('Gemini API 오류:', error);
            
            // 오류 시 시나리오의 랜덤 질문 사용
            const fallback = this.getFallbackResponse();
            
            this.conversationHistory.push({
                role: 'client',
                content: fallback
            });
            
            this.messageCount++;
            
            return fallback;
        }
    },

    /**
     * Gemini API 호출
     */
    async callGeminiAPI() {
        const context = TarotScenarios.buildConversationContext(
            this.currentScenario,
            this.conversationHistory
        );

        const requestBody = {
            contents: [{
                parts: [{
                    text: context
                }]
            }],
            generationConfig: {
                temperature: 0.9,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 200,
            },
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
        };

        const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API 오류: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates.length > 0) {
            const text = data.candidates[0].content.parts[0].text;
            return text.trim();
        }

        throw new Error('응답 생성 실패');
    },

    /**
     * 폴백 응답 (API 오류 시)
     */
    getFallbackResponse() {
        const stage = TarotScenarios.getConversationStage(this.messageCount);
        
        if (stage === 'opening') {
            return TarotScenarios.getRandomReaction(this.currentScenario);
        } else if (stage === 'middle') {
            return TarotScenarios.getRandomFollowUpQuestion(this.currentScenario);
        } else {
            return TarotScenarios.getClosingLine(this.currentScenario);
        }
    },

    /**
     * 대화 기록 가져오기
     */
    getConversationHistory() {
        return [...this.conversationHistory];
    },

    /**
     * 대화 기록 초기화
     */
    clearHistory() {
        this.conversationHistory = [];
        this.messageCount = 0;
    },

    /**
     * API 연결 테스트
     */
    async testConnection() {
        if (!this.hasApiKey()) {
            return { success: false, message: 'API 키가 없습니다.' };
        }

        try {
            const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: "Hello"
                        }]
                    }]
                })
            });

            if (response.ok) {
                return { success: true, message: '연결 성공!' };
            } else {
                return { success: false, message: `연결 실패: ${response.status}` };
            }
        } catch (error) {
            return { success: false, message: `오류: ${error.message}` };
        }
    }
};

// 초기화
GeminiAI.init();

// 전역으로 export
if (typeof window !== 'undefined') {
    window.GeminiAI = GeminiAI;
}
