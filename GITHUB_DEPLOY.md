# 🚀 GitHub Pages 배포 가이드

## 📋 준비물
- ✅ GitHub 계정
- ✅ 프로젝트 전체 파일

---

## 🎯 배포 순서 (5분 완료!)

### 1️⃣ GitHub Repository 만들기

1. **GitHub 접속**: https://github.com
2. **로그인**
3. 우측 상단 **"+"** 버튼 클릭 → **"New repository"**
4. Repository 정보 입력:
   - **Repository name**: `ai-tarot-recording` (원하는 이름)
   - **Description**: "AI 타로 상담 녹화 시스템"
   - **Public** 선택 (무료 GitHub Pages 사용)
   - ✅ **"Add a README file"** 체크 (선택)
5. **"Create repository"** 클릭

---

### 2️⃣ 파일 업로드

#### 방법 A: 웹에서 직접 업로드 (쉬움)

1. Repository 페이지에서 **"uploading an existing file"** 클릭
2. 또는 **"Add file"** → **"Upload files"** 클릭
3. 모든 프로젝트 파일을 **드래그 앤 드롭**
   - `index.html`, `start.html`, `settings.html`
   - `css/` 폴더
   - `js/` 폴더
   - `README.md`
   - `_headers`, `netlify.toml` (있으면)
   - 기타 모든 파일
4. 하단 **"Commit changes"** 클릭

#### 방법 B: Git 명령어 (익숙하면)

```bash
# 로컬 프로젝트 폴더에서
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/사용자명/ai-tarot-recording.git
git push -u origin main
```

---

### 3️⃣ GitHub Pages 활성화

1. Repository 페이지에서 **"Settings"** 탭 클릭
2. 왼쪽 메뉴에서 **"Pages"** 클릭
3. **"Source"** 섹션:
   - Branch: **main** 선택
   - Folder: **/ (root)** 선택
4. **"Save"** 클릭
5. 🎉 **배포 완료!**

---

### 4️⃣ 사이트 URL 확인

- 배포 후 1-2분 대기
- Settings → Pages 페이지 상단에 URL 표시:
  ```
  Your site is live at https://사용자명.github.io/ai-tarot-recording/
  ```

---

## 🔧 주의사항

### ⚠️ 파일 경로 문제

GitHub Pages는 `https://사용자명.github.io/프로젝트명/` 형태라서,
일부 절대 경로(`/css/style.css`)가 문제될 수 있습니다.

#### 해결책 1: 상대 경로 확인
모든 HTML 파일에서:
- ✅ `css/styles.css` (상대 경로 - OK)
- ❌ `/css/styles.css` (절대 경로 - 문제 가능)

#### 해결책 2: 커스텀 도메인 (선택)
Settings → Pages → Custom domain 설정

---

## 🎯 배포 후 테스트

1. `https://사용자명.github.io/프로젝트명/` 접속
2. F12 → Console 열기
3. "웹캠 시작" 클릭
4. 권한 팝업 → "허용"
5. ✅ 작동 확인!

---

## 🔄 파일 수정 후 재배포

### 웹에서 수정:
1. GitHub Repository → 파일 클릭
2. 연필 아이콘(✏️) 클릭 → 수정
3. "Commit changes" 클릭
4. 1-2분 후 자동 재배포

### 로컬에서 수정:
```bash
git add .
git commit -m "수정 내용"
git push
```

---

## 💡 팁

### GitHub Pages vs Netlify
- **GitHub Pages**: 보안 정책 유연, 카메라 접근 문제 없음
- **Netlify**: 고급 기능 많지만 보안 정책 엄격

### 두 곳 모두 사용 가능
- GitHub Pages: 메인 사용
- Netlify: 백업용

---

## 🆘 문제 해결

### "404 Not Found" 오류
- Repository가 Public인지 확인
- Settings → Pages 활성화 확인
- 1-2분 대기 (배포 시간)

### 스타일이 안 보임
- CSS 경로 확인 (`css/styles.css`)
- 브라우저 캐시 삭제 (Ctrl+Shift+R)

### 웹캠 여전히 안 됨
- HTTPS 확인 (github.io는 자동 HTTPS)
- 브라우저 권한 확인
- Windows 카메라 설정 확인

---

**🎉 GitHub Pages로 배포하면 카메라 문제 100% 해결됩니다!**
