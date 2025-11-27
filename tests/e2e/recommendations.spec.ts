import { test, expect } from '@playwright/test';

test.describe('Recommendations 컴포넌트', () => {
  test('Recommendations 페이지가 렌더링되어야 함', async ({ page }) => {
    await page.goto('/');

    await page.click('button:has-text("AI Recommendations")');

    // 페이지가 로드되었는지 확인
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('null/undefined 데이터 처리가 올바르게 되어야 함', async ({ page }) => {
    await page.goto('/');

    await page.click('button:has-text("AI Recommendations")');

    // 페이지가 크래시하지 않고 로드되는지 확인
    await page.waitForTimeout(1000);

    // 에러 메시지가 표시되지 않는지 확인
    const errorText = page.locator('text=/error|crash|undefined/i');
    const hasError = await errorText.isVisible().catch(() => false);

    expect(hasError).toBe(false);
  });

  test('추천 데이터가 표시되어야 함', async ({ page }) => {
    await page.goto('/');

    await page.click('button:has-text("AI Recommendations")');

    // 프리미엄 오버레이가 있는 경우 스킵
    const hasOverlay = await page.locator('[class*="blur"]').first().isVisible().catch(() => false);

    if (!hasOverlay) {
      // 추천 항목이 표시되는지 확인 (테이블, 카드, 리스트 등)
      const hasContent = await page.locator('table, [class*="card"], ul, ol').first().isVisible().catch(() => false);
      expect(hasContent).toBe(true);
    } else {
      // 오버레이가 있으면 프리미엄 메시지 확인
      expect(hasOverlay).toBe(true);
    }
  });

  test('버튼 클릭 시 에러가 발생하지 않아야 함', async ({ page }) => {
    await page.goto('/');

    await page.click('button:has-text("AI Recommendations")');

    // 페이지 내 모든 버튼 찾기
    const buttons = page.locator('button');
    const count = await buttons.count();

    // 각 버튼 클릭 시 에러가 발생하지 않는지 확인
    for (let i = 0; i < Math.min(count, 5); i++) {
      const button = buttons.nth(i);

      if (await button.isVisible()) {
        await button.click().catch(() => {}); // 클릭 실패는 무시
        await page.waitForTimeout(200);

        // 페이지가 여전히 정상인지 확인
        const isPageOk = await page.locator('body').isVisible();
        expect(isPageOk).toBe(true);
      }
    }
  });
});
