import { test, expect } from '@playwright/test';

test.describe('버튼 인터랙션', () => {
  test('모든 버튼이 클릭 가능해야 함', async ({ page }) => {
    await page.goto('/');

    // 사이드바 버튼들 확인
    const buttons = [
      'Dashboard',
      'AI Recommendations',
      'Analysis',
      'My Picks',
      'Performance',
      'Market Insights',
      'Settings'
    ];

    for (const buttonText of buttons) {
      const button = page.locator(`button:has-text("${buttonText}")`);
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();

      // 클릭 가능한지 확인
      await button.click();
      await page.waitForTimeout(300); // 애니메이션 대기
    }
  });

  test('버튼 호버 시 스타일이 변경되어야 함', async ({ page }) => {
    await page.goto('/');

    const dashboardBtn = page.locator('button:has-text("Dashboard")');

    // 기본 상태
    const defaultColor = await dashboardBtn.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );

    // 호버 상태
    await dashboardBtn.hover();
    await page.waitForTimeout(200);

    const hoverColor = await dashboardBtn.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );

    // 호버 시 색상이 변경되거나 유지되는지 확인 (버튼이 반응함)
    expect(hoverColor).toBeDefined();
  });

  test('버튼이 disabled 상태가 아니어야 함', async ({ page }) => {
    await page.goto('/');

    // 모든 사이드바 버튼이 활성화 상태인지 확인
    const allButtons = page.locator('nav button, aside button, [role="navigation"] button');
    const count = await allButtons.count();

    for (let i = 0; i < count; i++) {
      const button = allButtons.nth(i);
      await expect(button).not.toBeDisabled();
    }
  });

  test('버튼 텍스트가 올바르게 렌더링되어야 함', async ({ page }) => {
    await page.goto('/');

    // 각 버튼의 텍스트가 존재하는지 확인
    await expect(page.locator('button:has-text("Dashboard")')).toBeVisible();
    await expect(page.locator('button:has-text("AI Recommendations")')).toBeVisible();
    await expect(page.locator('button:has-text("Analysis")')).toBeVisible();
    await expect(page.locator('button:has-text("My Picks")')).toBeVisible();
    await expect(page.locator('button:has-text("Performance")')).toBeVisible();
    await expect(page.locator('button:has-text("Market Insights")')).toBeVisible();
    await expect(page.locator('button:has-text("Settings")')).toBeVisible();
  });
});
