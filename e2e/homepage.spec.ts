import { test, expect } from "@playwright/test";
import { seedFundiMartData } from "./fixtures";

test.describe("Homepage", () => {
  test("loads core homepage sections", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/FundiMart/);

    await expect(page.getByRole("heading", { name: /Built On Trust/ })).toBeVisible();
    await expect(page.getByText(/New Season Sale/)).toBeVisible();

    await expect(page.getByRole("heading", { name: "Best Sellers" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Shop by Category" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Featured Products" })).toBeVisible();

    await expect(page.getByRole("link", { name: /How FundiMart Works/ })).toBeVisible();
  });

  test("hero CTA navigates to products", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Shop Now/ }).click();
    await expect(page).toHaveURL(/\/products$/);
    await expect(page.getByRole("heading", { name: "All Products" })).toBeVisible();
  });

  test("shows featured products from verified sellers", async ({ page }) => {
    await seedFundiMartData(page);
    await page.goto("/");

    const featured = page.getByRole("heading", { name: "Featured Products" });
    await expect(featured).toBeVisible();
    await expect(page.getByText("Simba Cement 50kg").first()).toBeVisible();
    await expect(page.getByText("Rebar 12mm (Bundles)").first()).toBeVisible();
  });

  test("category card links to category page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /^Cement/ }).first().click();
    await expect(page).toHaveURL(/\/category\/cement$/);
    await expect(page.getByRole("heading", { name: "Cement" })).toBeVisible();
  });

  test("theme toggle switches dark mode class", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);

    await page.getByTitle("Switch to dark mode").click();
    await expect(html).toHaveClass(/dark/);

    await page.getByTitle("Switch to light mode").click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test("Fundi-AI chat widget opens with greeting", async ({ page }) => {
    await page.goto("/");
    await page.locator("div.fixed.bottom-6.right-6 button").click();

    await expect(page.getByText("Fundi-AI", { exact: true })).toBeVisible();
    await expect(
      page.getByText(/How can I help you with your construction needs today?/)
    ).toBeVisible();

    await page.locator(".lucide-x").click();
    await expect(page.getByText("Fundi-AI", { exact: true })).toBeHidden();
  });
});
