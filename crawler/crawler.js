import { Builder, By, until } from "selenium-webdriver";
import firefox from "selenium-webdriver/firefox"

import db from "./memory.js";

const CRAWLING_TIMER = 300000;
const URL = "https://namu.wiki/member/login";
const PATH_TO_INPUT = "/html/body/div/div/div[1]/nav/form/div/div/input";
const DIV_ID = "xe4jGj1HQ";

let driver;

/**
 * 크롤러 서비스를 등록한다.
 */
async function init() {
  driver = await new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(new firefox.Options().headless())
    .build();

  await driver.manage().setTimeouts({
    implicit: 60000,
    pageLoad: 60000,
    script: 60000,
  });

  crawlerService();
}

/**
 * Looping
 */
function crawlerService() {
  crawlNamuTrendings();

  const randInterval = Math.floor(Math.random() * (9876 - 2581)) + 25810

  setTimeout(() => {
    crawlerService();
  }, CRAWLING_TIMER + randInterval);
}

/**
 * Core Crawling logic
 */
async function crawlNamuTrendings() {
  try {
    await driver.get(URL);

    const input = await driver.wait(
      until.elementIsVisible(driver.findElement(By.xpath(PATH_TO_INPUT)))
    );
    await input.click();

    const trendingContainer = await driver.wait(
      until.elementIsVisible(driver.findElement(By.id(DIV_ID)))
    );

    const trendings = await trendingContainer.findElements(By.xpath("./div"));

    // db 초기화
    const newTrendings = [];
    for await (const [idx, trending] of trendings.entries()) {
      newTrendings.push(await trending.getText());
    }

    db.resetMemory(newTrendings);
  } finally {
    await driver.quit();
  }
}

export default init;
