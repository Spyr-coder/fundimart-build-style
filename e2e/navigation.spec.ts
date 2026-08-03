import { test, expect } from "@playwright/test";

test.describe("Navigation & info pages", () => {
  const infoRoutes = [
    { path: "/how-it-works", heading: "How FundiMart Works" },
    { path: "/about", heading: "About FundiMart" },
    { path: "/help", heading: "Help Center" },
    { path: "/blog", heading: "FundiMart Blog" },
    { path: "/careers", heading: "Careers at FundiMart" },
    { path: "/contact", heading: "Contact Us" },
    { path: "/shipping", heading: "Shipping & Delivery" },
    { path: "/returns", heading: "Returns & Refunds Policy" },
    { path: "/privacy", heading: "Privacy Policy" },
    { path: "/terms", heading: "Terms of Service" },
    { path: "/cookies", heading: "Cookie Policy" },
  ];

  for (const { path, heading } of infoRoutes) {
    test(`${path} loads with its heading`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible();
    });
  }

  test("footer quick links navigate correctly", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "About Us" }).click();
    await expect(page).toHaveURL(/\/about$/);
  });

  test("unknown route shows 404 page", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
  });

  test("hardware seller portal link goes to seller login", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Hardware Seller Portal/ }).first().click();
    await expect(page).toHaveURL(/\/seller\/login$/);
  });
});
