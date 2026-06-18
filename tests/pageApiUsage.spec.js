const { test, expect } = require('@playwright/test');
const api = require('../Page/pageApi');

test('pageApi helper - example usage', async ({ page }) => {
  await api.gotoPage(page, 'https://example.com');
  const heading = await api.getText(page, 'h1');
  expect(heading).toContain('Example Domain');
});
