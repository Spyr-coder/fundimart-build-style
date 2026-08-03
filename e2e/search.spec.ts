import { test, expect } from "@playwright/test";

test.describe("Search", () => {
  test("header search navigates to search results with query", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("Search for tools, materials, equipment...").fill("cement");
    await page.getByPlaceholder("Search for tools, materials, equipment...").press("Enter");

    await expect(page).toHaveURL(/\/search\?query=cement/);
    await expect(
      page.getByRole("heading", { name: /Search Results for "cement"/ })
    ).toBeVisible();
  });

  test("search with no matches shows empty message", async ({ page }) => {
    await page.goto("/search?query=zzzzzznotfound");
    await expect(page.getByText("No products found matching your search.")).toBeVisible();
  });

  test("search heading reflects empty query", async ({ page }) => {
    await page.goto("/search");
    await expect(page.getByRole("heading", { name: /Search Results for ""/ })).toBeVisible();
  });
});
