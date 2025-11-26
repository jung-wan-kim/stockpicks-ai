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
