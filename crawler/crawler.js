import { Builder, By, until } from "selenium-webdriver";
import { v1 } from "uuid";

import db from "./memory.js";

const CRAWLING_TIMER = 600000;
const URL = "https://namu.wiki/member/login";
const PATH_TO_INPUT = "/html/body/div/div/div[1]/nav/form/div/div/input";
const DIV_ID = "xe4jGj1HQ";

/**
 * 크롤러 서비스를 등록한다.
 */
function init() {
  crawlerService();
}

/**
 * Looping
 */
function crawlerService() {
  crawlNamuTrendings();

  setTimeout(() => {
    crawlNamuTrendings();
  }, CRAWLING_TIMER);
}

/**
 * Core Crawling logic
 */
async function crawlNamuTrendings() {
  let driver = await new Builder().forBrowser("firefox").build();
  try {
    await driver.get(URL);
    const input = await driver.findElement(By.xpath(PATH_TO_INPUT));
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
