import { test, expect } from '@playwright/test';

test('Load Driver', async ({ request }) => {
  await request.get('/');

  expect(true).toBeTruthy();
});
