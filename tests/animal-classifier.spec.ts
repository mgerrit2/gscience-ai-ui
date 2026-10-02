import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

test.describe('Dog & Cat Classifier Component', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to your application/route where the component is rendered.
    // Adjust the URL/route if necessary to match your dev server path.
    await page.goto('http://localhost:4200');
  });

  test('should display the default placeholder image and specifications accordion', async ({
    page,
  }) => {
    // Verify that the default placeholder image is visible
    const placeholderImg = page.locator('img[alt="Placeholder"]');
    await expect(placeholderImg).toBeVisible();

    // Verify component heading
    await expect(page.locator('.h2')).toHaveText('Dog & Cat Classifier');

    // Verify accordion header is present
    const specsHeader = page.locator('p-accordion-header');
    await expect(specsHeader).toContainText('Specifications');
  });

  test('should upload an image and display model predictions', async ({ page }) => {
    const fixtureDir = path.resolve(__dirname, 'fixtures');
    if (!fs.existsSync(fixtureDir)) {
      fs.mkdirSync(fixtureDir, { recursive: true });
    }
    const testImagePath = path.join(fixtureDir, '148.jpg');

    if (!fs.existsSync(testImagePath)) {
      throw new Error(`Test image fixture not found at: ${testImagePath}`);
    }

    // DIRECT FIX: Instead of clicking the button and waiting for a file chooser,
    // directly attach the file to the hidden file input element.
    // (Make sure the selector matches your file input ID or template reference, e.g., input[type="file"])
    await page.locator('input[type="file"]').setInputFiles(testImagePath);

    // Optional: Log browser console outputs to verify handleFileInput is running
    page.on('console', (msg) => console.log('BROWSER LOG:', msg.text()));

    // Wait for predictions to populate
    const topPredictionInput = page.locator('#selectedAnimal');
    await expect(topPredictionInput).not.toHaveValue('', { timeout: 50000 });

    const allPredictionsTextarea = page.locator('#allpredictions');
    await expect(allPredictionsTextarea).not.toHaveValue('', { timeout: 50000 });
  });

});
