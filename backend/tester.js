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

function catchTestModule(filename) {
  const pattern = /^[a-zA-Z0-9_\-.]+\.test\.(js|jsx)$/;
  return new RegExp(pattern).test(filename);
}

walkDir(root, (filePath) => {
  const basename = path.basename(filePath);
  if (catchTestModule(basename)) {
    console.log(basename);
    // run test module.
  }
});
