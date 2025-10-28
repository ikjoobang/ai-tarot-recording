🚀 AI 타로 상담 녹화 시스템 - GitHub Pages 배포 가이드

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 이 ZIP 파일에 포함된 내용:

✅ 핵심 HTML 파일:
   - index.html (메인 녹화 페이지)
   - start.html (시작/소개 페이지)  
   - settings.html (설정 페이지)

✅ CSS 폴더:
   - css/styles.css (전체 스타일시트)

✅ JavaScript 폴더:
   - js/app.js (메인 애플리케이션)
   - js/recorder.js (웹캠 녹화)
   - js/gemini.js (AI 대화)
   - js/tts.js (음성 합성)
   - js/scenarios.js (시나리오)
   - js/storage.js (파일 저장)

✅ 문서:
   - README.md (프로젝트 설명서)
   - GITHUB_DEPLOY.md (배포 가이드)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 GitHub Pages 배포 순서 (5분 완료!)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ GitHub Repository 만들기

   1. https://github.com 접속 및 로그인
   2. 우측 상단 "+" 버튼 → "New repository" 클릭
   3. Repository 정보 입력:
      - Repository name: ai-tarot-recording
      - Description: AI 타로 상담 녹화 시스템
      - ✅ Public 선택
      - ❌ README 추가하지 않음 (이미 포함됨)
   4. "Create repository" 클릭

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣ 파일 업로드

   1. 생성된 Repository 페이지에서
      "uploading an existing file" 링크 클릭
   
   2. 또는 "Add file" → "Upload files" 클릭
   
   3. 이 ZIP 파일의 모든 내용을 압축 해제
   
   4. 압축 해제한 폴더의 모든 파일과 폴더를 
      GitHub 페이지로 드래그 앤 드롭:
      
      📁 업로드할 항목:
      ├── index.html
      ├── start.html
      ├── settings.html
      ├── README.md
      ├── GITHUB_DEPLOY.md
      ├── css/
      │   └── styles.css
      └── js/
          ├── app.js
          ├── recorder.js
          ├── gemini.js
          ├── tts.js
          ├── scenarios.js
          └── storage.js
   
   5. Commit message: "Initial commit - AI Tarot Recording System"
   
   6. "Commit changes" 버튼 클릭

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3️⃣ GitHub Pages 활성화

   1. Repository 페이지 상단 "Settings" 탭 클릭
   
   2. 왼쪽 메뉴에서 "Pages" 클릭
   
   3. "Source" 섹션에서:
      - Branch: main 선택
      - Folder: / (root) 선택
   
   4. "Save" 버튼 클릭
   
   5. 🎉 배포 완료!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4️⃣ 사이트 URL 확인 (1-2분 후)

   1. Settings → Pages 페이지 상단에 
      초록색 박스로 URL 표시:
      
      ✅ Your site is live at
      https://사용자명.github.io/ai-tarot-recording/
   
   2. 해당 URL 클릭하여 사이트 접속

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5️⃣ 웹캠 테스트

   1. 배포된 사이트 접속
   2. F12 → Console 열기
   3. "웹캠 시작" 버튼 클릭
   4. "카메라 허용하시겠습니까?" 팝업 → "허용" 클릭
   5. ✅ 정상 작동 확인!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 중요 포인트

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 반드시 HTTPS URL 사용
   - github.io는 자동으로 HTTPS 적용됨
   - 카메라/마이크는 HTTPS에서만 작동

✅ 폴더 구조 유지 필수
   - css/ 폴더 그대로 업로드
   - js/ 폴더 그대로 업로드
   - 파일 경로가 틀리면 스타일/기능 작동 안 됨

✅ 파일 수정 후 재배포
   - GitHub에서 파일 클릭 → 연필 아이콘으로 수정
   - 또는 로컬에서 수정 후 다시 업로드
   - 1-2분 후 자동 재배포

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🆘 문제 해결

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q: "404 Not Found" 오류
A: Repository가 Public인지 확인
   Settings → Pages 활성화 확인
   1-2분 대기 (배포 시간 필요)

Q: 스타일이 안 보임
A: css/ 폴더가 제대로 업로드되었는지 확인
   브라우저 캐시 삭제 (Ctrl+Shift+R)

Q: 웹캠이 여전히 안 됨  
A: HTTPS 접속 확인 (http:// 아님!)
   브라우저 권한 팝업에서 "허용" 클릭
   Windows 카메라 설정 확인

Q: JavaScript 오류
A: js/ 폴더의 모든 파일이 업로드되었는지 확인
   Console (F12)에서 오류 메시지 확인

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📞 추가 지원

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- 상세 가이드: GITHUB_DEPLOY.md 파일 참고
- 프로젝트 문서: README.md 파일 참고

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 GitHub Pages로 배포하면 
   카메라/마이크 권한 문제가 100% 해결됩니다!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

버전: 1.0.0
업데이트: 2025-10-28
개발: AI Assistant
