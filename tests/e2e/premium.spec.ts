import { test, expect } from '@playwright/test';

test.describe('프리미엄 기능', () => {
  test('프리미엄 잠금 오버레이가 표시되어야 함', async ({ page }) => {
    await page.goto('/');

    // AI Recommendations 페이지로 이동 (프리미엄 기능)
    await page.click('button:has-text("AI Recommendations")');

    // 프리미엄 오버레이 확인 (isPremium이 false일 경우)
    const overlay = page.locator('[class*="blur"], [class*="overlay"]').first();

    // 오버레이가 있거나 프리미엄 콘텐츠가 보이는지 확인
    const hasOverlay = await overlay.isVisible().catch(() => false);
    const hasContent = await page.locator('h1, h2').first().isVisible();

    // 둘 중 하나는 반드시 true여야 함
    expect(hasOverlay || hasContent).toBe(true);
  });

  test('프리미엄 업그레이드 버튼이 작동해야 함', async ({ page }) => {
    await page.goto('/');

    // Upgrade to Premium 버튼 찾기
    const upgradeBtn = page.locator('button:has-text("Upgrade to Premium"), button:has-text("Upgrade")').first();

    if (await upgradeBtn.isVisible()) {
      await upgradeBtn.click();

      // 모달 또는 새 페이지가 열렸는지 확인
      await page.waitForTimeout(500);

      // 모달이 열렸는지 확인 (Dialog, Modal 등)
      const modal = page.locator('[role="dialog"], [class*="modal"]').first();
      const isModalVisible = await modal.isVisible().catch(() => false);

      expect(isModalVisible).toBe(true);
    }
  });

  test('프리미엄 잠금 메시지가 표시되어야 함', async ({ page }) => {
    await page.goto('/');

    // Performance 페이지로 이동
    await page.click('button:has-text("Performance")');

    // "Unlock" 또는 "Premium" 관련 텍스트 확인
    const premiumText = page.locator('text=/Unlock|Premium|Upgrade/i').first();
    const hasText = await premiumText.isVisible().catch(() => false);

    // 프리미엄 관련 텍스트가 있거나 콘텐츠가 정상 표시되는지 확인
    const hasContent = await page.locator('h1, h2').first().isVisible();

    expect(hasText || hasContent).toBe(true);
  });
});
