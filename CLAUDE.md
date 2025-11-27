# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

StockPicks AI - AI 기반 주식 추천 서비스의 프론트엔드 애플리케이션입니다. Figma에서 생성된 React + TypeScript + Vite 프로젝트로, shadcn/ui 컴포넌트와 Tailwind CSS를 사용합니다.

## 개발 명령어

```bash
npm install    # 의존성 설치
npm run dev    # 개발 서버 실행 (localhost:3000)
npm run build  # 프로덕션 빌드 (build/ 디렉토리)
```

## 아키텍처

### 기술 스택
- **프레임워크**: React 18 + TypeScript + Vite
- **스타일링**: Tailwind CSS + shadcn/ui (Radix UI 기반)
- **차트**: Recharts
- **상태관리**: React useState (로컬 상태)

### 주요 구조

```
src/
├── App.tsx              # 메인 앱 - 사이드바 네비게이션 + 페이지 라우팅
├── components/
│   ├── Dashboard.tsx    # 대시보드 - 통계카드, 성과차트, 추천목록
│   ├── Recommendations.tsx  # AI 추천 페이지
│   ├── Analysis.tsx     # 주식 분석 페이지
│   ├── MyPicks.tsx      # 내 종목 페이지
│   ├── Performance.tsx  # 성과 페이지
│   ├── MarketInsights.tsx   # 시장 인사이트 페이지
│   ├── SettingsPage.tsx # 설정 페이지
│   ├── BlurOverlay.tsx  # 프리미엄 잠금 오버레이
│   ├── SubscriptionModal.tsx  # 구독 모달
│   └── ui/              # shadcn/ui 컴포넌트 (수정 불필요)
├── assets/              # 이미지 에셋
└── index.css            # Tailwind 스타일
```

### 핵심 패턴

**프리미엄 기능 잠금**: `isPremium` 상태와 `BlurOverlay` 컴포넌트로 프리미엄 콘텐츠 제한
```tsx
// 사용 예시
{!isPremium && <BlurOverlay onClick={onUnlock} message="Unlock AI Recommendations" />}
```

**페이지 네비게이션**: App.tsx에서 `currentPage` 상태로 SPA 라우팅 관리
```tsx
type PageType = "dashboard" | "recommendations" | "analysis" | "mypicks" | "performance" | "insights" | "settings";
```

### 디자인 시스템
- **배경**: 검정 (`bg-black`)
- **보더**: 회색 (`border-gray-900`)
- **강조색**: 흰색 텍스트/버튼, 초록색 상승표시 (`text-green-400`)
- **폰트**: Liberation Sans
- **기본 여백**: 24px, 16px, 12px 단위

### Path Alias
`@` → `./src` (vite.config.ts에 설정됨)

## 테스트 전략 (필수)

### 작업 시 테스트 체크리스트

**모든 UI 변경 작업 후 필수 실행**:

```bash
# E2E 테스트 실행 (필수)
npm run test:e2e

# UI 모드로 디버깅 (선택)
npm run test:e2e:ui

# 특정 테스트만 실행
npx playwright test navigation.spec.ts
```

**테스트가 반드시 필요한 경우**:
- ✅ 버튼 수정 (클릭 핸들러, 스타일, 텍스트)
- ✅ 페이지 네비게이션 변경
- ✅ 프리미엄 기능 수정
- ✅ 모달/다이얼로그 변경
- ✅ 컴포넌트 로직 수정 (null 체크, 조건부 렌더링)
- ✅ 이벤트 핸들러 추가/수정

**커밋 전 필수 확인**:
1. E2E 테스트 통과 (`npm run test:e2e`)
2. 개발 서버 정상 실행 (`npm run dev`)
3. 빌드 에러 없음 (`npm run build`)

### 테스트 파일 구조

```
tests/
└── e2e/
    ├── navigation.spec.ts      # 페이지 네비게이션
    ├── buttons.spec.ts         # 버튼 인터랙션
    ├── premium.spec.ts         # 프리미엄 기능
    ├── modal.spec.ts           # 모달 기능
    └── recommendations.spec.ts # Recommendations 컴포넌트
```

### Claude Code 워크플로우

**UI 수정 시 자동화된 프로세스**:
1. 코드 수정 완료
2. `npm run test:e2e` 자동 실행
3. 테스트 실패 시:
   - 에러 로그 분석
   - 버그 수정
   - 재테스트
   - 최대 3회 재시도
4. 테스트 성공 시:
   - Git 커밋
   - 작업 완료 보고

**금지 사항**:
- ❌ 테스트 없이 버튼/UI 수정 커밋
- ❌ 테스트 실패를 무시하고 커밋
- ❌ "나중에 테스트 추가" 약속

### 테스트 작성 가이드

**새 버튼 추가 시**:
```typescript
// tests/e2e/buttons.spec.ts
test('새 버튼이 작동해야 함', async ({ page }) => {
  await page.goto('/');
  await page.click('button:has-text("새 버튼")');
  await expect(page.locator('h1')).toContainText('예상 텍스트');
});
```

**새 페이지 추가 시**:
```typescript
// tests/e2e/navigation.spec.ts
test('새 페이지로 이동해야 함', async ({ page }) => {
  await page.goto('/');
  await page.click('button:has-text("새 페이지")');
  await expect(page.locator('h1, h2').first()).toBeVisible();
});
```

### 상세 문서

테스트 전략 전체는 `TEST_STRATEGY.md` 참고
