import { test, expect } from "@playwright/test";


test("user can navigate from Dashboard to Users", async ({ page }) => {

  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /dashboard/i })
  ).toBeVisible();

  await page.getByRole("link", { name: /users/i }).click();

  await expect(
    page.getByRole("heading", { name: /users/i })
  ).toBeVisible();

});

test("user can search for a customer", async ({ page }) => {

  await page.goto("/users");

  const searchInput = page.getByPlaceholder("Search users...");

  // Get the first customer currently displayed
  const firstUser = page.locator(".user-card").first();

  const userName = await firstUser
    .locator(".card-header h3")
    .textContent();

  // Search for that customer
  await searchInput.fill(userName.trim());

  // The searched customer should still be visible
  await expect(firstUser).toBeVisible();

});



test("user can filter unpaid customers", async ({ page }) => {

  await page.goto("/users");

  await page.getByRole("button", {
    name: "UNPAID ONLY"
  }).click();

  await expect(
    page.getByText("UNPAID ONLY")
  ).not.toBeVisible();

  await expect(
    page.getByText("SHOW ALL")
  ).toBeVisible();

});



test("user can navigate through application pages", async ({ page }) => {

  await page.goto("/");

  await page.getByRole("link", {
    name: /plans/i
  }).click();

  await expect(
    page.getByRole("heading", { name: /plans/i })
  ).toBeVisible();


  await page.getByRole("link", {
    name: /payments/i
  }).click();

  await expect(
    page.getByRole("heading", { name: /payments/i })
  ).toBeVisible();


  await page.getByRole("link", {
    name: /settings/i
  }).click();

  await expect(
    page.getByRole("heading", { name: /settings/i })
  ).toBeVisible();

});


test("user can open the add user form", async ({ page }) => {

  await page.goto("/users");

  await page.getByRole("button", {
    name: /add user/i
  }).click();

  await expect(
    page.getByText("CREATE USER RECORD")
  ).toBeVisible();

  await expect(
    page.getByLabel("CUSTOMER NAME")
  ).toBeVisible();

  await expect(
    page.getByLabel("EMAIL ADDRESS")
  ).toBeVisible();

});