import assert from "node:assert/strict";
import CommandExample from "./patternExamples/CommandPatternExample";
import FluentPatternExample from "./patternExamples/FluentPatternExample";
import StrategyExample from "./patternExamples/StrategyExample";

const strategyExample = new StrategyExample();
assert.strictEqual(strategyExample.addNumbersThenDouble(1, 2), 6);
assert.strictEqual(
    strategyExample.addOrSubtractNumbersThenDouble(1, 2, true),
    -2
);
assert.strictEqual(
    strategyExample.addOrSubtractNumbersThenDouble(1, 2, false),
    6
);

const commandExample = new CommandExample();
assert.strictEqual(commandExample.addNumbersThenDouble(1, 2), 6);
assert.strictEqual(
    commandExample.addOrSubtractNumbersThenDouble(1, 2, true),
    -2
);
assert.strictEqual(
    commandExample.addOrSubtractNumbersThenDouble(1, 2, false),
    6
);

const fluentExample = new FluentPatternExample();
assert.strictEqual(fluentExample.addNumbersThenDouble(1, 2), 6);
assert.strictEqual(
    fluentExample.addOrSubtractNumbersThenDouble(1, 2, true),
    -2
);
assert.strictEqual(
    fluentExample.addOrSubtractNumbersThenDouble(1, 2, false),
    6
);

console.log("All good!");
