import { test, expect } from "@playwright/test";

test.describe("Fundi-AI Assistant", () => {
  test("widget opens and shows greeting", async ({ page }) => {
    await page.goto("/");
    await page.locator("div.fixed.bottom-6.right-6 button").click();

    await expect(page.getByText("Fundi-AI", { exact: true })).toBeVisible();
    await expect(
      page.getByText(/How can I help you with your construction needs today?/)
    ).toBeVisible();
  });

  test("sending a message shows a bot reply", async ({ page }) => {
    await page.route("/api/ai/estimate", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          replyText: "For your estimate, I recommend Simba Cement 50kg.",
          recommendedCategories: ["Cement"],
        }),
      })
    );

    await page.goto("/");
    await page.locator("div.fixed.bottom-6.right-6 button").click();
    await page.getByPlaceholder("Type your message...").fill("How much cement for a house?");
    await page.getByPlaceholder("Type your message...").press("Enter");

    await expect(
      page.getByText("For your estimate, I recommend Simba Cement 50kg.")
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /Search Cement/ })).toBeVisible();
  });

  test("closing the widget hides the chat", async ({ page }) => {
    await page.goto("/");
    await page.locator("div.fixed.bottom-6.right-6 button").click();
    await expect(page.getByText("Fundi-AI", { exact: true })).toBeVisible();

    await page.locator(".lucide-x").click();
    await expect(page.getByText("Fundi-AI", { exact: true })).toBeHidden();
  });
});
