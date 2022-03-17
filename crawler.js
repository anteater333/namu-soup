import { Builder, By, Key, until } from "selenium-webdriver";

(async function example() {
  let driver = await new Builder().forBrowser("firefox").build();
  try {
    await driver.get("https://namu.wiki/member/login");
    const input = await driver.findElement(
      By.xpath("/html/body/div/div/div[1]/nav/form/div/div/input")
    );
    await input.click();

    const trendingContainer = await driver.wait(
      until.elementIsVisible(driver.findElement(By.id("xe4jGj1HQ")))
    );

    const trendings = await trendingContainer.findElements(By.xpath("./div"));

    for await (const trending of trendings) {
      console.log(await trending.getText());
    }
  } finally {
    await driver.quit();
  }
})();
