import { readdirSync, statSync } from "fs";
import path, { join } from "path";

console.log("SOUP BACKEND TEST RUNNER");
console.log("Given argv: ");
console.log(`${process.argv.join(", ")}`);
console.log(`-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-`);

const root = "./";

const ignoreList = ["node_modules"];

function walkDir(dir, callback) {
  if (ignoreList.includes(dir)) return;

  readdirSync(dir).forEach((f) => {
    const dirPath = join(dir, f);
    statSync(dirPath).isDirectory()
      ? walkDir(dirPath, callback)
      : callback(join(dir, f));
  });
}

walkDir(root, async (filePath) => {
  if (filePath.endsWith(".test.js")) {
    const tests = (await import(`${root}/${filePath}`)).tests;
    let count = 1;
    console.log(`${filePath} == \n`);
    if (tests) {
      tests.forEach(async (TC) => {
        try {
          console.log(TC.name);
          await TC();

          console.log(`Test Case #${count} Passed : `);
          console.log(TC.name);
        } catch (error) {
          console.log(`Test Case #${count} Failed : `);
          console.log(TC.name);
          console.log(error);
        }
        count++;
        console.log("============================");
      });
    } else {
      console.log(`module passed, test not found.`);
    }

    console.log("----------------------------");
  }
});
