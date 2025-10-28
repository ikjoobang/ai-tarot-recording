/**
 * 🔮 타로 상담 시나리오 모듈
 * 다양한 상담 시나리오와 대화 플로우 관리
 */

const TarotScenarios = {
    // 시나리오 데이터
    scenarios: {
        love: {
            id: 'love',
            name: '연애운 상담',
            icon: '💕',
            description: '좋아하는 사람과의 미래, 연애 고민',
            systemPrompt: `당신은 타로 상담을 받으러 온 20-30대 여성 손님입니다. 
최근에 좋아하는 사람이 생겼고, 그 사람과의 미래가 궁금합니다.
자연스럽고 진지하게 고민을 털어놓으세요.
타로 강사의 해석에 공감하고 추가 질문을 하세요.`,
            openingLines: [
                "안녕하세요, 연애운을 봐주실 수 있을까요?",
                "최근에 좋아하는 사람이 생겼는데요, 그 사람과 잘 될 수 있을지 궁금해서요.",
                "제가 먼저 다가가야 할까요, 아니면 기다려야 할까요?"
            ],
            followUpQuestions: [
                "그렇다면 제가 어떤 행동을 취하면 좋을까요?",
                "이 관계가 발전할 가능성이 있을까요?",
                "제 마음을 표현하기에 좋은 시기는 언제일까요?",
                "상대방도 저에게 관심이 있을까요?",
                "조심해야 할 점이나 주의사항이 있을까요?"
            ],
            reactions: [
                "아, 그렇군요. 그게 맞는 것 같아요.",
                "정말요? 그건 생각 못했어요.",
                "네, 이해했습니다. 감사합니다.",
                "그 부분이 특히 와닿네요.",
                "제가 느꼈던 것과 비슷한데요?"
            ]
        },
        
        wealth: {
            id: 'wealth',
            name: '재물운 상담',
            icon: '💰',
            description: '사업, 투자, 재정 상태',
            systemPrompt: `당신은 타로 상담을 받으러 온 30-40대 사업가입니다.
새로운 사업을 시작하려고 하거나 투자 결정을 앞두고 있습니다.
재정적 안정과 성공 가능성에 대해 알고 싶어합니다.
현실적이면서도 진지한 태도로 상담에 임하세요.`,
            openingLines: [
                "안녕하세요, 재물운에 대해 상담받고 싶습니다.",
                "요즘 새로운 사업을 준비 중인데요, 잘 될지 궁금해서요.",
                "지금 투자 제안을 받았는데, 어떻게 해야 할지 모르겠어요."
            ],
            followUpQuestions: [
                "이 사업이 성공할 가능성은 어느 정도인가요?",
                "재정적으로 안정될 수 있을까요?",
                "지금 투자하는 게 맞을까요, 아니면 기다려야 할까요?",
                "주의해야 할 리스크가 있나요?",
                "언제쯤 결실을 볼 수 있을까요?"
            ],
            reactions: [
                "그 부분이 제일 걱정이었어요.",
                "아, 그렇게 해석될 수도 있군요.",
                "좀 더 신중하게 접근해야겠네요.",
                "그건 예상하지 못했는데요.",
                "구체적인 조언 감사합니다."
            ]
        },
        
        career: {
            id: 'career',
            name: '진로/취업 상담',
            icon: '💼',
            description: '직장, 이직, 진로 선택',
            systemPrompt: `당신은 타로 상담을 받으러 온 20-30대 직장인입니다.
현재 직장에서의 고민이 있거나 이직을 고려 중입니다.
새로운 도전과 안정 사이에서 고민하고 있습니다.
진로와 경력 발전에 대한 조언을 구하세요.`,
            openingLines: [
                "안녕하세요, 진로 고민이 있어서 왔습니다.",
                "지금 직장을 그만두고 새로운 곳으로 옮길까 고민 중이에요.",
                "이직 제안을 받았는데, 결정하기가 어렵네요."
            ],
            followUpQuestions: [
                "지금 회사에 계속 다니는 게 나을까요?",
                "새로운 도전이 저에게 맞을까요?",
                "이직 시기는 언제가 좋을까요?",
                "제 경력 발전에 도움이 될까요?",
                "어떤 분야로 가는 게 좋을지 조언해주실 수 있나요?"
            ],
            reactions: [
                "그런 관점에서는 생각 못해봤어요.",
                "네, 그 부분이 제일 중요하죠.",
                "현실적인 조언 감사합니다.",
                "그렇게 접근하면 좋을 것 같네요.",
                "용기가 생기는 것 같아요."
            ]
        },
        
        health: {
            id: 'health',
            name: '건강운 상담',
            icon: '🏥',
            description: '건강 상태, 주의사항',
            systemPrompt: `당신은 타로 상담을 받으러 온 중년의 손님입니다.
최근 건강에 대한 걱정이 있거나 주의해야 할 점을 알고 싶어합니다.
진지하고 조심스러운 태도로 건강 관련 조언을 구하세요.`,
            openingLines: [
                "안녕하세요, 건강운을 봐주실 수 있을까요?",
                "요즘 몸이 좀 안 좋은데, 특별히 조심해야 할 게 있을까요?",
                "건강 관련해서 궁금한 게 있어서요."
            ],
            followUpQuestions: [
                "특별히 주의해야 할 부분이 있나요?",
                "건강 검진을 받아야 할까요?",
                "생활 습관을 어떻게 바꾸면 좋을까요?",
                "스트레스 관리는 어떻게 해야 할까요?",
                "회복되는 데 시간이 얼마나 걸릴까요?"
            ],
            reactions: [
                "그 부분은 정말 조심해야겠네요.",
                "알려주셔서 감사합니다.",
                "그렇게 해보도록 하겠습니다.",
                "마음이 좀 놓이네요.",
                "구체적인 조언이 큰 도움이 됩니다."
            ]
        },
        
        general: {
            id: 'general',
            name: '종합 운세',
            icon: '🌟',
            description: '전반적인 운세와 조언',
            systemPrompt: `당신은 타로 상담을 받으러 온 일반 손님입니다.
요즘 전반적으로 궁금한 점이 많고, 앞으로의 운세가 궁금합니다.
열린 마음으로 다양한 조언을 듣고 싶어합니다.`,
            openingLines: [
                "안녕하세요, 전반적인 운세를 봐주실 수 있을까요?",
                "요즘 여러 가지로 마음이 복잡해서요.",
                "앞으로 어떻게 될지 궁금해서 왔습니다."
            ],
            followUpQuestions: [
                "가장 주의해야 할 점은 무엇인가요?",
                "좋은 기회가 올까요?",
                "제가 어떤 마음가짐을 가져야 할까요?",
                "특별히 신경 써야 할 분야가 있나요?",
                "긍정적인 변화가 있을까요?"
            ],
            reactions: [
                "그렇군요, 이해했습니다.",
                "생각해볼 점이 많네요.",
                "좋은 말씀 감사합니다.",
                "마음에 새기겠습니다.",
                "희망적으로 들리네요."
            ]
        }
    },

    /**
     * 시나리오 정보 가져오기
     */
    getScenario(scenarioId) {
        return this.scenarios[scenarioId] || null;
    },

    /**
     * 모든 시나리오 목록 가져오기
     */
    getAllScenarios() {
        return Object.values(this.scenarios);
    },

    /**
     * 시나리오의 오프닝 멘트 가져오기
     */
    getOpeningLine(scenarioId) {
        const scenario = this.getScenario(scenarioId);
        if (!scenario) return null;
        
        return scenario.openingLines[0];
    },

    /**
     * 랜덤 후속 질문 가져오기
     */
    getRandomFollowUpQuestion(scenarioId) {
        const scenario = this.getScenario(scenarioId);
        if (!scenario || !scenario.followUpQuestions.length) return null;
        
        const randomIndex = Math.floor(Math.random() * scenario.followUpQuestions.length);
        return scenario.followUpQuestions[randomIndex];
    },

    /**
     * 랜덤 반응 가져오기
     */
    getRandomReaction(scenarioId) {
        const scenario = this.getScenario(scenarioId);
        if (!scenario || !scenario.reactions.length) return null;
        
        const randomIndex = Math.floor(Math.random() * scenario.reactions.length);
        return scenario.reactions[randomIndex];
    },

    /**
     * 시나리오별 시스템 프롬프트 가져오기
     */
    getSystemPrompt(scenarioId) {
        const scenario = this.getScenario(scenarioId);
        if (!scenario) return '';
        
        return scenario.systemPrompt;
    },

    /**
     * 대화 컨텍스트 생성
     * @param {string} scenarioId - 시나리오 ID
     * @param {Array} conversationHistory - 이전 대화 기록
     * @returns {string} - Gemini API용 프롬프트
     */
    buildConversationContext(scenarioId, conversationHistory = []) {
        const scenario = this.getScenario(scenarioId);
        if (!scenario) return '';

        let context = scenario.systemPrompt + '\n\n';
        
        if (conversationHistory.length === 0) {
            context += '첫 인사로 상담을 시작하세요. 자연스럽고 간결하게 한두 문장으로 말하세요.';
        } else {
            context += '이전 대화:\n';
            conversationHistory.forEach((msg, index) => {
                const speaker = msg.role === 'client' ? '손님' : '강사';
                context += `${speaker}: ${msg.content}\n`;
            });
            context += '\n손님으로서 자연스럽게 반응하거나 다음 질문을 하세요. 한두 문장으로 간결하게 말하세요.';
        }

        return context;
    },

    /**
     * 대화 단계 판단
     * @param {number} messageCount - 현재까지 메시지 수
     * @returns {string} - 대화 단계 (opening, middle, closing)
     */
    getConversationStage(messageCount) {
        if (messageCount <= 2) return 'opening';
        if (messageCount <= 8) return 'middle';
        return 'closing';
    },

    /**
     * 마무리 멘트 생성
     */
    getClosingLine(scenarioId) {
        const closingLines = [
            "정말 감사합니다. 많은 도움이 됐어요.",
            "오늘 상담 덕분에 마음이 편해졌습니다. 감사합니다.",
            "좋은 조언 정말 감사드립니다.",
            "앞으로 어떻게 해야 할지 알게 됐어요. 감사합니다.",
            "큰 힘이 됐습니다. 정말 감사해요."
        ];
        
        const randomIndex = Math.floor(Math.random() * closingLines.length);
        return closingLines[randomIndex];
    }
};

// 전역으로 export
if (typeof window !== 'undefined') {
    window.TarotScenarios = TarotScenarios;
}
