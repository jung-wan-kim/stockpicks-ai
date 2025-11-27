# StockPicks AI - 테스트 전략 문서

## 개요

이 문서는 StockPicks AI 프로젝트의 테스트 전략을 정의합니다. 버튼 수정 등 UI 변경 시 테스트 누락을 방지하고, 품질을 보장하기 위한 자동화된 테스트 워크플로우를 제공합니다.

## 현재 상황 분석

### 문제점
1. **테스트 인프라 부재**: 테스트 프레임워크가 설치되지 않음
2. **수동 검증 의존**: 15개+ 버튼 수정 시 수동 클릭 테스트만 수행
3. **회귀 버그 위험**: Recommendations 컴포넌트 null 체크 버그 발견
4. **문서화 부족**: 테스트 필수 지침이 없음

### 목표
- **자동화**: UI 변경 시 자동으로 테스트 실행
- **빠른 피드백**: 개발 중 즉시 버그 발견
- **회귀 방지**: 기존 기능이 깨지지 않도록 보장
- **효율성**: Claude Code가 테스트를 자동으로 작성/실행

## 테스트 전략

### 1단계: E2E 테스트 (Playwright) - 우선순위 ⭐⭐⭐

**이유**: 버튼 클릭, 페이지 네비게이션, 프리미엄 기능 등 실제 사용자 시나리오 검증

**테스트 범위**:
- ✅ 페이지 네비게이션 (사이드바 버튼 7개)
- ✅ 프리미엄 기능 잠금/해제
- ✅ 모달 열기/닫기
- ✅ 버튼 상태 변경 (호버, 클릭)
- ✅ 차트 렌더링 확인

**실행 시점**:
- 컴포넌트 수정 후 (특히 버튼, 이벤트 핸들러)
- 커밋 전 필수 실행
- CI/CD 파이프라인

**도구**: Playwright (이미 localhost:3001에서 실행 가능)

### 2단계: 컴포넌트 단위 테스트 (Vitest + Testing Library) - 우선순위 ⭐⭐

**이유**: 로직 검증, null 체크, 조건부 렌더링 등 세밀한 테스트

**테스트 범위**:
- Props 전달 및 렌더링
- 조건부 렌더링 (isPremium, null 체크)
- 이벤트 핸들러 호출
- 상태 변경 로직

**실행 시점**:
- 컴포넌트 로직 수정 시
- 빠른 개발 중 피드백

**도구**: Vitest + React Testing Library

### 3단계: 시각적 회귀 테스트 (선택사항) - 우선순위 ⭐

**이유**: UI 스타일 변경 감지

**도구**: Playwright 스크린샷 비교

## 테스트 구조

```
StockAI/
├── tests/
│   ├── e2e/                    # E2E 테스트 (Playwright)
│   │   ├── navigation.spec.ts  # 페이지 네비게이션 테스트
│   │   ├── premium.spec.ts     # 프리미엄 기능 테스트
│   │   ├── buttons.spec.ts     # 버튼 인터랙션 테스트
│   │   └── modal.spec.ts       # 모달 테스트
│   │
│   └── unit/                   # 단위 테스트 (Vitest)
│       ├── Dashboard.test.tsx
│       ├── Recommendations.test.tsx
│       └── BlurOverlay.test.tsx
│
├── playwright.config.ts         # Playwright 설정
└── vitest.config.ts            # Vitest 설정
```

## 자동화 워크플로우

### Claude Code 작업 시 체크리스트

**UI 컴포넌트 수정 시 (버튼, 레이아웃, 이벤트 핸들러)**:
1. ✅ 수정 사항 적용
2. ✅ E2E 테스트 실행: `npm run test:e2e`
3. ✅ 실패 시 자동 수정 (bug-fixer agent 호출)
4. ✅ 성공 시 커밋

**로직 수정 시 (상태 관리, null 체크, 조건부 렌더링)**:
1. ✅ 수정 사항 적용
2. ✅ 단위 테스트 실행: `npm run test:unit`
3. ✅ E2E 테스트 실행: `npm run test:e2e`
4. ✅ 성공 시 커밋

**새 컴포넌트 추가 시**:
1. ✅ 컴포넌트 생성
2. ✅ 단위 테스트 작성
3. ✅ E2E 테스트에 시나리오 추가
4. ✅ 모든 테스트 통과 후 커밋

### Hook 자동화 (향후 구현)

`~/.claude/hooks/pre-commit.sh`:
```bash
#!/bin/bash
# UI 파일이 변경되었는지 확인
if git diff --cached --name-only | grep -E '\.(tsx|jsx)$'; then
  echo "Running E2E tests..."
  npm run test:e2e
  if [ $? -ne 0 ]; then
    echo "E2E tests failed. Commit aborted."
    exit 1
  fi
fi
```

## 테스트 작성 가이드

### E2E 테스트 예시 (Playwright)

```typescript
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('모든 페이지 버튼이 작동해야 함', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Dashboard 버튼 클릭
    await page.click('button:has-text("Dashboard")');
    await expect(page.locator('h1')).toContainText('Dashboard');

    // Recommendations 버튼 클릭
    await page.click('button:has-text("AI Recommendations")');
    await expect(page.locator('h1')).toContainText('Recommendations');

    // ... 나머지 페이지도 테스트
  });
});
```

### 단위 테스트 예시 (Vitest + Testing Library)

```typescript
import { render, screen } from '@testing-library/react';
import { Recommendations } from './Recommendations';

describe('Recommendations', () => {
  test('추천 데이터가 없을 때 null 체크', () => {
    render(<Recommendations recommendations={[]} />);
    expect(screen.queryByText('No recommendations')).toBeInTheDocument();
  });

  test('추천 데이터가 있을 때 렌더링', () => {
    const data = [{ symbol: 'AAPL', confidence: 0.95 }];
    render(<Recommendations recommendations={data} />);
    expect(screen.getByText('AAPL')).toBeInTheDocument();
  });
});
```

## 명령어 레퍼런스

```bash
# 테스트 설치
npm install -D @playwright/test vitest @testing-library/react @testing-library/user-event jsdom

# E2E 테스트 실행
npm run test:e2e              # 전체 실행
npm run test:e2e:ui           # UI 모드 (디버깅)
npm run test:e2e:debug        # 디버그 모드

# 단위 테스트 실행
npm run test:unit             # 전체 실행
npm run test:unit:watch       # Watch 모드 (개발 중)

# 전체 테스트 실행
npm run test                  # E2E + Unit 모두 실행

# 개발 서버 + 테스트 동시 실행
npm run dev:test              # dev 서버 + watch 모드
```

## 성공 기준

### 커밋 전 필수 체크
- [ ] E2E 테스트 통과율 100%
- [ ] 단위 테스트 통과율 100%
- [ ] 수동으로 주요 기능 확인 (선택사항)

### 테스트 커버리지 목표
- **E2E**: 모든 사용자 시나리오 (네비게이션, 모달, 프리미엄 기능)
- **Unit**: 비즈니스 로직 및 조건부 렌더링 90%+

## 문제 해결 가이드

### "테스트가 실패했는데 로컬에서는 작동함"
1. 개발 서버가 실행 중인지 확인 (`npm run dev`)
2. Playwright 브라우저 설치 확인 (`npx playwright install`)
3. 포트 충돌 확인 (3000번 포트)

### "null 체크 버그가 자주 발생함"
1. Vitest로 단위 테스트 추가
2. `recommendations?.length > 0` 패턴 사용
3. TypeScript strict 모드 활성화 고려

### "테스트 작성 시간이 너무 오래 걸림"
1. E2E만 우선 작성 (가장 중요한 시나리오)
2. Claude Code에게 테스트 자동 생성 요청
3. 점진적으로 커버리지 확대

## 다음 단계

1. ✅ Playwright 설치 및 설정
2. ✅ 기본 E2E 테스트 작성 (navigation, buttons)
3. ✅ CLAUDE.md 업데이트 (테스트 필수 지침)
4. ⏳ Vitest 설정 (향후)
5. ⏳ CI/CD 통합 (GitHub Actions)

---

**마지막 업데이트**: 2025-11-27
**작성자**: Claude Code
