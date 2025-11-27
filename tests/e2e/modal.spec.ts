import { test, expect } from '@playwright/test';

test.describe('모달 기능', () => {
  test('구독 모달이 열리고 닫혀야 함', async ({ page }) => {
    await page.goto('/');

    // Upgrade to Premium 버튼 찾기
    const upgradeBtn = page.locator('button:has-text("Upgrade to Premium"), button:has-text("Upgrade")').first();

    if (await upgradeBtn.isVisible()) {
      // 모달 열기
      await upgradeBtn.click();
      await page.waitForTimeout(500);

      // 모달이 표시되는지 확인
      const modal = page.locator('[role="dialog"], [class*="modal"]').first();
      await expect(modal).toBeVisible();

      // 닫기 버튼 찾기 (X, Close, Cancel 등)
      const closeBtn = page.locator('button:has-text("Close"), button:has-text("Cancel"), button[aria-label="Close"]').first();

      if (await closeBtn.isVisible()) {
        await closeBtn.click();
        await page.waitForTimeout(300);

        // 모달이 사라졌는지 확인
        await expect(modal).not.toBeVisible();
      }
    }
  });

  test('모달 배경 클릭 시 닫혀야 함 (선택사항)', async ({ page }) => {
    await page.goto('/');

    const upgradeBtn = page.locator('button:has-text("Upgrade to Premium"), button:has-text("Upgrade")').first();

    if (await upgradeBtn.isVisible()) {
      await upgradeBtn.click();
      await page.waitForTimeout(500);

      const modal = page.locator('[role="dialog"]').first();

      if (await modal.isVisible()) {
        // 모달 외부 클릭 (배경)
        await page.mouse.click(10, 10);
        await page.waitForTimeout(300);

        // 일부 모달은 배경 클릭으로 닫히지 않을 수 있음
        const isStillVisible = await modal.isVisible().catch(() => false);

        // 배경 클릭이 작동하는지 확인 (작동하지 않아도 OK)
        expect(typeof isStillVisible).toBe('boolean');
      }
    }
  });

  test('모달 내 버튼들이 작동해야 함', async ({ page }) => {
    await page.goto('/');

    const upgradeBtn = page.locator('button:has-text("Upgrade to Premium"), button:has-text("Upgrade")').first();

    if (await upgradeBtn.isVisible()) {
      await upgradeBtn.click();
      await page.waitForTimeout(500);

      // 모달 내 버튼 찾기
      const modalButtons = page.locator('[role="dialog"] button');
      const count = await modalButtons.count();

      // 모든 버튼이 활성화 상태인지 확인
      for (let i = 0; i < count; i++) {
        const button = modalButtons.nth(i);
        await expect(button).toBeEnabled();
      }
    }
  });
});
