import { test, expect } from "@playwright/test";

test.describe("Auth pages", () => {
  test("auth page defaults to login tab", async ({ page }) => {
    await page.goto("/auth");
    await expect(page.getByRole("heading", { name: "Welcome to FundiMart" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Sign In/ })).toBeVisible();
  });

  test("?tab=register&role=seller opens the seller register form", async ({ page }) => {
    await page.goto("/auth?tab=register&role=seller");
    await expect(page.getByLabel("Business Email")).toBeVisible();
    await expect(page.getByLabel("Hardware Store Name")).toBeVisible();
    await expect(page.getByLabel("Location")).toBeVisible();
    await expect(page.getByLabel("Firm Email (for invoices)")).toBeVisible();
  });

  test("Become a Seller button on How It Works opens seller registration", async ({ page }) => {
    await page.goto("/how-it-works");
    await page.getByRole("link", { name: "Become a Seller" }).click();
    await expect(page).toHaveURL(/\/auth\?tab=register&role=seller$/);
    await expect(page.getByLabel("Business Email")).toBeVisible();
    await expect(page.getByLabel("Hardware Store Name")).toBeVisible();
  });
});
