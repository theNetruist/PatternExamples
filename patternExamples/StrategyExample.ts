import Operation from "../Operations";

/*
    Strategies don't maintain state - they modify the object
    sent to them
*/
interface StrategyModel {
    number1: number;
    number2: number;
    answer?: number;
}

/**
    The strategy pattern is used when there may be multiple ways 
    to do a thing, and you don't know what strategy will be needed.

    It allows you to write out each strategy, and then select the
    right one based on need.
*/
interface Strategy {
    /*
    The interface can define an input, but the output is void.
    */
    execute(value: StrategyModel): void;
}

//Create some Strategies...
class AddStrategy implements Strategy {
    execute = (value: StrategyModel) => {
        value.answer = value.number1 + value.number2;
    };
}

class SubtractStrategy implements Strategy {
    execute = (value: StrategyModel) => {
        value.answer = value.number1 - value.number2;
    };
}

class DoubleStrategy implements Strategy {
    execute = (value: StrategyModel) => {
        value.answer = (value.answer ?? 0) * 2;
    };
}

/*
    This is the real magic - the handler method will select a Strategy
    based on the needs, and the calling code is completely
    decoupled from the strategy implementations.
*/
class StrategyHandler {
    static getStrategy = (operator: Operation): Strategy => {
        switch (operator) {
            case Operation.Add:
                return new AddStrategy();
            case Operation.Subtract:
                return new SubtractStrategy();
            case Operation.Double:
                return new DoubleStrategy();
        }
    };
}

/*
    In this example, we want to add two numbers and then double them.
    Again, this class has no references to any individual strategy
    implementations.
*/
export default class StrategyExample {
    addNumbersThenDouble = (number1: number, number2: number) => {
        let model: StrategyModel = { number1: number1, number2: number2 };
        let addStrategy = StrategyHandler.getStrategy(Operation.Add);
        let doubleStrategy = StrategyHandler.getStrategy(Operation.Double);

        addStrategy.execute(model);
        doubleStrategy.execute(model);
        return model.answer;
    };

    // Let's try this with a decision tree
    addOrSubtractNumbersThenDouble = (
        number1: number,
        number2: number,
        weShouldSubtract: boolean
    ) => {
        let model: StrategyModel = { number1: number1, number2: number2 };
        let doubleStrategy = StrategyHandler.getStrategy(Operation.Double);
        let strategy: Strategy;
        if (weShouldSubtract) {
            strategy = StrategyHandler.getStrategy(Operation.Subtract);
        } else {
            strategy = StrategyHandler.getStrategy(Operation.Add);
        }
        strategy.execute(model);
        doubleStrategy.execute(model);
        return model.answer;
    };
}
