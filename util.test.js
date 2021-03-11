const puppeteer = require("puppeteer");
const { generateText, checkAndGenerate } = require("./util");

test("generates test", function () {
  expect(generateText("bnp", 29)).toBe("bnp (29 years old)");
});

test("should generate valid input", () => {
  expect(checkAndGenerate("bnp", 29)).toBe("bnp (29 years old)");
});

test("should click around", async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ["--window-size=1920,1080"],
  });

  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:8080/");
  await page.click("input#name");
  await page.type("input#name", "bnp");
  await page.click("input#age");
  await page.type("input#age", "29");
  await page.click("#btnAddUser");
  const test = await page.$eval(".user-item", (el) => el.textContent);
  expect(test).toBe("bnp (29 years old)");
}, 10000);
