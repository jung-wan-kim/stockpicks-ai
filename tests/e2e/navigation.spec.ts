import { test, expect } from '@playwright/test';

test.describe('페이지 네비게이션', () => {
  test('모든 사이드바 버튼이 올바른 페이지로 이동해야 함', async ({ page }) => {
    await page.goto('/');

    // Dashboard 테스트
    await page.click('button:has-text("Dashboard")');
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // AI Recommendations 테스트
    await page.click('button:has-text("AI Recommendations")');
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Analysis 테스트
    await page.click('button:has-text("Analysis")');
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // My Picks 테스트
    await page.click('button:has-text("My Picks")');
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Performance 테스트
    await page.click('button:has-text("Performance")');
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Market Insights 테스트
    await page.click('button:has-text("Market Insights")');
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Settings 테스트
    await page.click('button:has-text("Settings")');
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('페이지 이동 시 활성 상태가 변경되어야 함', async ({ page }) => {
    await page.goto('/');

    // Dashboard 버튼 클릭
    const dashboardBtn = page.locator('button:has-text("Dashboard")');
    await dashboardBtn.click();

    // 활성 상태 확인 (bg-gray-900 또는 특정 스타일)
    const activeClass = await dashboardBtn.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );
    expect(activeClass).not.toBe('rgba(0, 0, 0, 0)');

    // AI Recommendations 버튼 클릭 후 확인
    const recommendationsBtn = page.locator('button:has-text("AI Recommendations")');
    await recommendationsBtn.click();

    const newActiveClass = await recommendationsBtn.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );
    expect(newActiveClass).not.toBe('rgba(0, 0, 0, 0)');
  });
});
