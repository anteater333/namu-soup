import { exec } from "child_process";
import { promisify } from "util";

import db from "./memory.js";

const CRAWLING_TIMER = 300000;
const URL = "https://search.namu.wiki/api/ranking";
const USERAGENT = `"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0"`;

const COMMAND = "curl -L -k -v -A";

const execPromise = promisify(exec);

/**
 * 크롤러 서비스를 등록한다.
 */
async function init() {
  crawlerService();
}

/**
 * Looping
 */
function crawlerService() {
  crawlNamuTrendings();

  const randInterval = Math.floor(Math.random() * (9876 - 2581)) + 25810;

  setTimeout(() => {
    crawlerService();
  }, CRAWLING_TIMER + randInterval);
}

/**
 * Core Crawling logic
 */
async function crawlNamuTrendings() {
  // db 초기화
  const newTrendings = [];

  const { stdout, stderr, error } = await execPromise(
    [COMMAND, USERAGENT, URL].join(" ")
  );

  const trendings = JSON.parse(stdout);

  trendings.forEach((trending) => {
    newTrendings.push(trending);
  });

  db.resetMemory(newTrendings);
}

export default init;
