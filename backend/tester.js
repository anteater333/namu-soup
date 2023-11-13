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
    const tests = await import(`${root}/${filePath}`);
    Object.keys(tests).forEach((key) => {
      const test = tests[key]();
      // TBD : Not implemented yet
      console.log(key);
    });
  }
});
