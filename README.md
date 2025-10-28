# 🔮 AI 타로 상담 녹화 시스템

혼자서도 자연스러운 타로 상담 영상을 촬영할 수 있는 웹 기반 시스템입니다.  
AI가 손님 역할을 하며 실시간으로 질문하고, 웹캠으로 상담 장면을 녹화할 수 있습니다.

---

## 🎯 프로젝트 목표

YouTube 타로 상담 영상 제작을 위한 1인 제작 시스템:
- **AI 손님**: Google Gemini AI가 자연스러운 한국어로 질문
- **음성 출력**: Web Speech API로 실시간 한국어 음성 합성
- **웹캠 녹화**: 고품질 비디오 녹화 및 자동 저장
- **다양한 시나리오**: 5가지 상담 주제 지원

---

## ✨ 주요 기능

### ✅ 현재 구현된 기능

1. **🎥 웹캠 녹화**
   - MediaRecorder API를 통한 실시간 녹화
   - 3가지 화질 옵션 (저/중/고화질)
   - 자동 다운로드 기능
   - 녹화 시간 표시

2. **🤖 AI 대화 시스템**
   - Google Gemini 2.5 Flash 모델 사용
   - 자연스러운 한국어 대화 생성
   - 컨텍스트 기반 후속 질문
   - 실시간 응답 생성

3. **🗣️ 한국어 음성 합성 (TTS)**
   - Web Speech API 활용
   - 자연스러운 한국어 발음
   - 속도/음높이 조절 가능
   - 브라우저 내장 기능 사용 (추가 설치 불필요)

4. **💕 5가지 상담 시나리오**
   - 연애운 상담 (이별/재회)
   - 재물운 상담 (투자/사업)
   - 진로 상담 (이직/취업)
   - 건강운 상담 (건강/회복)
   - 종합운세 (전반적 운세)

5. **⚙️ 설정 관리**
   - Gemini API 키 설정
   - 음성 속도/음높이 조절
   - 녹화 화질 선택
   - 저장 위치 설정
   - LocalStorage 자동 저장

---

## 🌐 공개 URL

### 📍 배포된 사이트
```
https://genspark.ai/app/page_private?id=bHyumk
```

### 📂 주요 페이지
- **시작 페이지**: `/start.html` - 시스템 소개 및 기능 안내
- **메인 페이지**: `/index.html` - 녹화 및 상담 진행
- **설정 페이지**: `/settings.html` - API 키 및 옵션 설정

---

## 🚀 사용 방법

### 1️⃣ 초기 설정 (최초 1회)

1. **설정 페이지 접속**
   - 우측 상단 "⚙️ 설정" 클릭

2. **Gemini API 키 입력**
   - 기본 제공된 API 키 사용 가능
   - 또는 개인 API 키 발급: https://aistudio.google.com/apikey

3. **음성/녹화 설정 (선택)**
   - 음성 속도: 0.8 ~ 1.5 (기본 1.0)
   - 음성 음높이: 0.8 ~ 1.2 (기본 1.0)
   - 녹화 화질: 저/중/고 (기본 중화질)

4. **저장**
   - "💾 설정 저장" 클릭

### 2️⃣ 상담 녹화 진행

1. **시나리오 선택**
   - 💕 연애운 / 💰 재물운 / 🎯 진로 / 💚 건강운 / ✨ 종합운세

2. **웹캠 권한 허용**
   - 브라우저 권한 요청 시 "허용" 클릭
   - 카메라 화면 확인

3. **대화 시작**
   - "🎬 대화 시작" 버튼 클릭
   - AI 손님이 자동으로 질문 시작

4. **녹화 시작**
   - "🔴 녹화 시작" 버튼 클릭
   - 상담 진행

5. **녹화 종료**
   - "⏹️ 녹화 중지" 버튼 클릭
   - 비디오 파일 자동 다운로드

### 3️⃣ 파일 저장 (Google Drive 연동)

현재는 **로컬 다운로드** 방식으로 작동합니다.

**Google Drive 자동 업로드 설정 방법:**

1. **Google Drive Desktop 앱 설치**
   - Windows/Mac용 앱 다운로드
   - https://www.google.com/drive/download/

2. **폴더 공유 설정**
   - 타로쌤이 폴더 공유 (편집자 권한)
   - 공유 폴더 ID: `115-ncEqjbySmYB7Zs8yoSlq8IBZxtymc`

3. **브라우저 다운로드 경로 변경**
   - 브라우저 설정 → 다운로드 → 위치
   - Google Drive 동기화 폴더로 설정
   - 예: `C:\Users\사용자명\Google Drive\타로상담녹화`

4. **자동 동기화**
   - 녹화 파일이 자동으로 Google Drive에 업로드됨

---

## 📊 데이터 모델

### LocalStorage 저장 데이터

```javascript
{
  "tarot_gemini_api_key": "AIzaSy...",  // Gemini API 키
  "tarot_tts_rate": 1.0,                 // 음성 속도
  "tarot_tts_pitch": 1.0,                // 음성 음높이
  "tarot_recording_quality": "medium",   // 녹화 화질
  "tarot_storage_type": "local"          // 저장 방식
}
```

### 시나리오 데이터 구조

```javascript
{
  id: "love",
  name: "연애운 상담",
  icon: "💕",
  systemPrompt: "...",    // AI 역할 지정
  openingLine: "...",     // 첫 인사말
  questions: [...],       // 질문 목록
  reactions: [...]        // 반응 패턴
}
```

---

## 🛠️ 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업
- **CSS3**: 타로 테마 커스텀 디자인
  - CSS Variables (색상 변수)
  - Flexbox/Grid 레이아웃
  - 애니메이션/전환 효과
- **Vanilla JavaScript**: 순수 자바스크립트 (프레임워크 없음)

### APIs & Services
- **Google Gemini AI API**: 
  - 모델: `gemini-2.5-flash`
  - Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`
- **Web Speech API (TTS)**: 브라우저 내장 음성 합성
- **MediaRecorder API**: WebRTC 기반 비디오 녹화
- **LocalStorage**: 설정 데이터 저장

### 브라우저 호환성
- ✅ Chrome/Edge (권장)
- ✅ Safari (일부 제한)
- ⚠️ Firefox (TTS 품질 낮음)

---

## 📁 프로젝트 구조

```
/
├── index.html              # 메인 녹화 페이지
├── start.html              # 시작/소개 페이지
├── settings.html           # 설정 페이지
├── test-gemini-simple.html # Gemini API 테스트 페이지
├── check-models.html       # Gemini 모델 확인 페이지
├── css/
│   └── styles.css          # 통합 스타일시트
├── js/
│   ├── app.js              # 메인 애플리케이션 컨트롤러
│   ├── gemini.js           # Gemini AI 통합
│   ├── recorder.js         # 웹캠 녹화 기능
│   ├── tts.js              # 음성 합성 (TTS)
│   ├── scenarios.js        # 상담 시나리오 정의
│   └── storage.js          # 파일 저장 관리
└── README.md               # 프로젝트 문서 (이 파일)
```

---

## 🔐 보안 & API 관리

### API 키 관리

⚠️ **중요**: 현재 코드에 하드코딩된 API 키는 **테스트용**입니다.

**프로덕션 사용 시 필수 조치:**

1. **API 키 재발급**
   - Google AI Studio에서 새 키 생성
   - https://aistudio.google.com/apikey

2. **사용량 제한 설정**
   - API 키 설정에서 일일 한도 지정
   - 예: 100회/일

3. **리퍼러 제한 (선택)**
   - 특정 도메인에서만 사용 가능하도록 설정
   - 예: `genspark.ai`, `yourdomain.com`

4. **API 키 주기적 갱신**
   - 3~6개월마다 새 키로 교체 권장

---

## ⚠️ 알려진 제한사항

### 1. Google Drive 직접 업로드 불가
- **원인**: OAuth 2.0 인증 필요 (정적 사이트에서 구현 복잡)
- **해결책**: Google Drive Desktop 앱 + 다운로드 폴더 동기화

### 2. TTS 음성 품질
- **원인**: 브라우저별 TTS 엔진 차이
- **권장**: Chrome/Edge 사용 (최상의 한국어 품질)

### 3. 파일 크기 제한
- **고화질 녹화**: 1시간당 약 2~3GB
- **권장**: 10~15분 단위로 분할 녹화

### 4. 브라우저 권한
- **필수**: 카메라, 마이크 권한 허용
- **HTTPS 필수**: 로컬 환경에서는 `localhost` 사용

---

## 🔄 향후 개발 계획

### 미구현 기능

1. **🎨 카드 선택 시각화**
   - 타로 카드 이미지 표시
   - 카드 뽑기 애니메이션
   - 카드 해석 텍스트 오버레이

2. **📝 상담 기록 저장**
   - 대화 내용 텍스트 저장
   - JSON/TXT 파일 다운로드
   - 상담 히스토리 목록

3. **🎬 자막 오버레이**
   - AI 질문 자막 실시간 표시
   - 편집용 SRT 파일 생성

4. **☁️ 클라우드 스토리지 직접 연동**
   - Google Drive API OAuth 구현
   - AWS S3 직접 업로드
   - Dropbox 연동

5. **🎙️ 음성 분석**
   - 상담사 발화 감지
   - 자동 AI 질문 타이밍 조절

6. **📊 분석 대시보드**
   - 녹화 통계 (시간, 횟수)
   - 시나리오별 사용 빈도
   - 인기 질문 분석

---

## 🆘 문제 해결

### Q1. 웹캠이 작동하지 않아요 (Permission Denied)
**A**: 다음 단계를 순서대로 시도하세요

#### ✅ 1단계: 브라우저 개발자 도구 확인
1. **F12 키**를 눌러 개발자 도구 열기
2. **Console 탭** 클릭
3. 웹캠 시작 버튼 클릭 시 나타나는 오류 메시지 확인
4. 다음 로그 확인:
   - `🎥 웹캠 시작 시도...`
   - `🔑 카메라 권한 요청 중...`
   - `❌ 웹캠 시작 오류:` (오류 발생 시)
   - 오류 이름(name)과 메시지(message) 확인

#### ✅ 2단계: 브라우저 사이트별 권한 초기화
1. **주소창 왼쪽 자물쇠 아이콘 🔒** 클릭
2. **"카메라"** 권한이 "차단됨"인지 확인
3. 차단되어 있다면 **"허용"**으로 변경
4. **"마이크"** 권한도 동일하게 확인 및 변경
5. **페이지 새로고침 (F5)**

#### ✅ 3단계: 브라우저 캐시 삭제
Edge/Chrome에서:
1. **Ctrl + Shift + Delete** 누르기
2. **"캐시된 이미지 및 파일"** 체크
3. **"쿠키 및 기타 사이트 데이터"** 체크
4. **"지우기"** 클릭
5. **브라우저 재시작**
6. 사이트 재접속

#### ✅ 4단계: InPrivate/시크릿 모드 테스트
1. Edge: **Ctrl + Shift + N**
2. Chrome: **Ctrl + Shift + N**
3. 시크릿 창에서 사이트 접속
4. 웹캠 권한 요청 시 **"허용"** 클릭
5. 작동 여부 확인
   - ✅ 작동 시: 브라우저 캐시/쿠키 문제 → 3단계 다시 시도
   - ❌ 실패 시: 5단계로 이동

#### ✅ 5단계: Windows 카메라 설정 확인
1. **Windows 설정** 열기 (Win + I)
2. **개인 정보 보호** → **카메라**
3. **"앱에서 카메라에 액세스 허용"** 켜기
4. **"데스크톱 앱에서 카메라에 액세스 허용"** 켜기
5. 브라우저 재시작 후 재시도

#### ✅ 6단계: 카메라 사용 중인 앱 종료
1. **작업 관리자** 열기 (Ctrl + Shift + Esc)
2. 카메라를 사용 중인 앱 확인:
   - Zoom, Teams, Skype
   - 다른 브라우저 탭
   - 사진 앱, 카메라 앱
3. 해당 앱 **종료**
4. 브라우저 새로고침

#### ✅ 7단계: 테스트 사이트로 확인
1. https://webcamtests.com 접속
2. 카메라 작동 확인
   - ✅ 작동: 브라우저는 정상, 사이트 권한 문제 → 2단계 재시도
   - ❌ 실패: 시스템 권한 또는 하드웨어 문제 → 5단계 재확인

#### 🔍 고급 디버깅 (개발자용)
브라우저 Console에서 다음 명령어 실행:
```javascript
// 권한 상태 확인
navigator.permissions.query({name: 'camera'}).then(p => console.log('카메라 권한:', p.state));
navigator.permissions.query({name: 'microphone'}).then(p => console.log('마이크 권한:', p.state));

// 장치 목록 확인
navigator.mediaDevices.enumerateDevices().then(devices => {
  console.log('비디오 장치:', devices.filter(d => d.kind === 'videoinput'));
  console.log('오디오 장치:', devices.filter(d => d.kind === 'audioinput'));
});

// 웹캠 직접 테스트
navigator.mediaDevices.getUserMedia({video: true, audio: true})
  .then(stream => console.log('✅ 웹캠 접근 성공!', stream))
  .catch(err => console.error('❌ 오류:', err.name, err.message));
```

### Q2. AI 음성이 들리지 않아요
**A**: 브라우저/OS 음성 설정 확인
1. 시스템 볼륨 확인
2. 브라우저 음소거 상태 확인
3. 설정 페이지에서 음성 속도 조절
4. Chrome/Edge 브라우저 사용 권장

### Q3. 녹화 파일이 저장되지 않아요
**A**: 브라우저 다운로드 설정 확인
1. 브라우저 설정 → 다운로드
2. "다운로드 전 저장 위치 확인" 옵션 확인
3. 다운로드 폴더 권한 확인
4. 충분한 저장 공간 확인

### Q4. API 키 오류가 발생해요
**A**: API 키 유효성 확인
1. 설정 페이지에서 API 키 재입력
2. https://aistudio.google.com/apikey 에서 새 키 발급
3. API 사용량 한도 확인
4. 테스트 페이지에서 연결 확인

---

## 📞 지원 & 문의

- **개발자**: Genspark AI Assistant
- **버전**: 1.0.0
- **최종 업데이트**: 2025-10-28
- **라이선스**: MIT (개인/상업적 사용 가능)

---

## 🎓 타로쌤을 위한 빠른 가이드

### 🚀 5분 만에 시작하기

1. **접속**: https://genspark.ai/app/page_private?id=bHyumk
2. **설정 클릭**: 우측 상단 ⚙️ 버튼
3. **저장**: (기본 API 키가 이미 설정되어 있음)
4. **홈 클릭**: 메인 화면으로 이동
5. **시나리오 선택**: 💕 연애운 카드 클릭
6. **대화 시작**: 🎬 대화 시작 버튼
7. **녹화 시작**: 🔴 녹화 시작 버튼
8. **상담 진행**: AI 질문에 자연스럽게 답변
9. **녹화 종료**: ⏹️ 녹화 중지 버튼
10. **완료**: 비디오 파일 자동 다운로드!

### 💡 촬영 팁

1. **조명**: 얼굴이 밝게 보이도록 전면 조명 사용
2. **배경**: 깔끔하고 신비로운 느낌의 배경 권장
3. **의상**: 타로 테마에 맞는 의상 (보라/검정 계열)
4. **카메라 위치**: 눈높이에 웹캠 배치
5. **대화 속도**: AI 음성보다 약간 느리게 답변
6. **편집**: 10~15분 단위로 분할 촬영 권장

---

**🌙 신비로운 타로 상담을 위한 최고의 도구! ✨**
