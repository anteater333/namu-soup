import { readdirSync, statSync } from "fs";
import path, { join } from "path";

console.log("SOUP BACKEND TEST RUNNER");
console.log("Given argv: ");
console.log(`${process.argv.join(", ")}`);
console.log(`-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n`);

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

async function executeTestModule(filePath, moduleId) {
  const tests = (await import(`${root}/${filePath}`)).tests;
  let tcCount = 1;
  console.log(
    "================================================================"
  );
  console.log(`Module #${moduleId} : ${filePath}`);
  console.log(
    "----------------------------------------------------------------"
  );
  if (tests) {
    for (let i = 0; i < tests.length; i++) {
      const TC = tests[i];
      console.log(`Test Case #${tcCount} : ${TC.name}\n`);
      try {
        await TC();

        console.log(`\nTest Case #${tcCount} done.`);
      } catch (error) {
        console.log(`\nTest Case #${tcCount} FAILED with error.\n`);
        console.log(error);
      }
      tcCount++;
      console.log(
        "----------------------------------------------------------------"
      );
    }
  } else {
    console.log(`module passed, test not found.`);
  }

  console.log(`Module #${moduleId} done.`);
  console.log(
    "================================================================\n"
  );
}

const moduleList = [];
walkDir(root, (filePath) => {
  if (filePath.endsWith(".test.js")) {
    moduleList.push(filePath);
  }
});

let moduleCnt = 0;

for await (const module of moduleList) {
  moduleCnt++;
  await executeTestModule(module, moduleCnt);
}
