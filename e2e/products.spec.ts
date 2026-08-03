import { test, expect } from "@playwright/test";
import { seedFundiMartData } from "./fixtures";

test.describe("Products", () => {
  test.beforeEach(async ({ page }) => {
    await seedFundiMartData(page);
  });

  test("lists seeded products from localStorage fallback", async ({ page }) => {
    await page.goto("/products");
    await expect(page.getByRole("heading", { name: "All Products" })).toBeVisible();

    await expect(page.getByText("Simba Cement 50kg").first()).toBeVisible();
    await expect(page.getByText("Rebar 12mm (Bundles)").first()).toBeVisible();
    await expect(page.getByText("Timber Plank 2x4").first()).toBeVisible();
  });

  test("shows empty state when no products are stored", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("fundimart_products", "[]"));
    await page.goto("/products");

    await expect(page.getByText("No products available at the moment.")).toBeVisible();
  });

  test("product card links to detail page", async ({ page }) => {
    await page.goto("/products");
    await page.getByText("Simba Cement 50kg").first().click();
    await expect(page).toHaveURL(/\/product\/prod_cement_1$/);

    await expect(page.getByRole("heading", { name: "Simba Cement 50kg" })).toBeVisible();
    await expect(page.getByText("KES 750")).toBeVisible();
    await expect(page.getByText("Karani Hardware")).toBeVisible();
  });

  test("unknown product shows not-found message", async ({ page }) => {
    await page.goto("/product/does-not-exist");
    await expect(page.getByRole("heading", { name: "Product Not Found" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Back to Products/ })).toBeVisible();
  });

  test("add to cart updates cart badge and sheet", async ({ page }) => {
    await page.goto("/products");

    const cementCard = page
      .locator("div.group")
      .filter({ hasText: "Simba Cement 50kg" })
      .first();
    await cementCard.getByRole("button", { name: /Add to Cart/ }).click();

    await expect(page.getByText("Simba Cement 50kg added to cart")).toBeVisible();

    await page.getByRole("button", { name: /^Cart/ }).click();
    const cart = page.getByRole("dialog");
    await expect(cart.getByRole("heading", { name: /Your Cart \(1\)/ })).toBeVisible();
    await expect(cart.getByRole("heading", { name: "Simba Cement 50kg" })).toBeVisible();
    await expect(cart.getByText("KES 750").first()).toBeVisible();
  });

  test("cart quantity controls update totals", async ({ page }) => {
    await page.goto("/products");

    const cementCard = page
      .locator("div.group")
      .filter({ hasText: "Simba Cement 50kg" })
      .first();
    await cementCard.getByRole("button", { name: /Add to Cart/ }).click();

    await page.getByRole("button", { name: /^Cart/ }).click();
    const cart = page.getByRole("dialog");
    await cart.locator(".lucide-plus").click();

    await expect(cart.getByRole("heading", { name: /Your Cart \(2\)/ })).toBeVisible();
    await expect(
      cart.getByRole("button", { name: /Proceed to Delivery.*KES 1,500/ })
    ).toBeVisible();

    await cart.locator(".lucide-minus").click();
    await expect(cart.getByRole("heading", { name: /Your Cart \(1\)/ })).toBeVisible();
  });

  test("removing an item empties the cart", async ({ page }) => {
    await page.goto("/products");

    const cementCard = page
      .locator("div.group")
      .filter({ hasText: "Simba Cement 50kg" })
      .first();
    await cementCard.getByRole("button", { name: /Add to Cart/ }).click();

    await page.getByRole("button", { name: /^Cart/ }).click();
    await page.getByRole("dialog").locator(".lucide-trash2").click();

    await expect(page.getByText("Your cart is empty")).toBeVisible();
  });

  test("checkout requires delivery details", async ({ page }) => {
    await page.goto("/products");

    const cementCard = page
      .locator("div.group")
      .filter({ hasText: "Simba Cement 50kg" })
      .first();
    await cementCard.getByRole("button", { name: /Add to Cart/ }).click();

    await page.getByRole("button", { name: /^Cart/ }).click();
    await page.getByRole("button", { name: /Proceed to Delivery/ }).click();

    await expect(page.getByRole("heading", { name: "Delivery Details" })).toBeVisible();
    await page.getByRole("button", { name: "Submit Order" }).click();

    await expect(page.getByRole("heading", { name: "Delivery Details" })).toBeVisible();
    await expect(page).toHaveURL(/\/products$/);

    const nameMissing = await page
      .getByPlaceholder("John Doe")
      .evaluate((el) => (el as HTMLInputElement).validity.valueMissing);
    expect(nameMissing).toBeTruthy();
  });

  test("complete checkout flow navigates to order success", async ({ page }) => {
    await page.route("https://jengamart-0.onrender.com/api/orders", (route) =>
      route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ id: "ORD_TEST" }) })
    );

    await page.goto("/products");

    const cementCard = page
      .locator("div.group")
      .filter({ hasText: "Simba Cement 50kg" })
      .first();
    await cementCard.getByRole("button", { name: /Add to Cart/ }).click();

    await page.getByRole("button", { name: /^Cart/ }).click();
    await page.getByRole("button", { name: /Proceed to Delivery/ }).click();

    await page.getByPlaceholder("John Doe").fill("Jane Mwangi");
    await page.getByPlaceholder("07xxxxxxxx").fill("0712345678");
    await page.locator("button", { hasText: "Select County" }).click();
    await page.getByRole("option", { name: "Nairobi" }).click();
    await page.locator("button", { hasText: "Select Town" }).click();
    await page.getByRole("option", { name: "CBD" }).click();

    await page.getByRole("button", { name: "Submit Order" }).click();

    await expect(page).toHaveURL(/\/order-success/);
  });
});
