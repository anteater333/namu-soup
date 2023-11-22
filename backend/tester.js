import { readdirSync, statSync } from "fs";
import { join } from "path";

console.log("SOUP BACKEND TEST RUNNER");
console.log("Given argv: ");
console.log(`${process.argv.join(", ")}`);
console.log(
  `-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n`
);

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
  let passed = 0,
    failed = 0;
  console.log(
    "================================================================="
  );
  console.log(`Module #${moduleId} : ${filePath}`);
  console.log(
    "-----------------------------------------------------------------"
  );
  if (tests) {
    for (let i = 0; i < tests.length; i++) {
      const TC = tests[i];
      console.log(
        `Test Case #${tcCount} (${tcCount}/${tests.length}) : ${TC.name}\n`
      );
      try {
        await TC();

        console.log(`\nTest Case #${tcCount} done.`);
        passed++;
      } catch (error) {
        console.log(`\nTest Case #${tcCount} FAILED with error.\n`);
        console.log(error);
        failed++;
      }
      tcCount++;
      console.log(
        `-----------------------------------------------------------------`
      );
    }
  } else {
    console.log(`module passed, test not found.`);
  }

  console.log(
    `Module #${moduleId} done. (PASSED : ${passed}, FAILED : ${failed})`
  );
  console.log(
    "=================================================================\n"
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
