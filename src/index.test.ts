import { name as entityFactory } from "./entities/entity-factory.test";
import { name as entityFactoryHelpers } from "./entities/factory-helpers.test";
import { name as posixAccounts } from "./entities/posix-account.test";
import { name as snakeToCamel } from "./utils/snake-to-camel.test";

const tests = [entityFactory, entityFactoryHelpers, posixAccounts, snakeToCamel];

process.stdout.write("Loading tests: ");
tests.forEach((test, index) => {
  index > 0 ? process.stdout.write(`, ${test}`) : process.stdout.write(test);
});
process.stdout.write(`\n\nLoaded ${tests.length} test suites.\n\n`);
