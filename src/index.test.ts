import { name as snakeToCamel } from "./utils/snake-to-camel.test";

const tests = [snakeToCamel];

process.stdout.write("Loading tests: ");
tests.forEach((test, index) => {
  index > 0 ? process.stdout.write(`, ${test}`) : process.stdout.write(test);
});
process.stdout.write(`\n\nLoaded ${tests.length} test suites.\n\n`);
