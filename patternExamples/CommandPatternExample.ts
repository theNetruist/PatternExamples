import Operation from "../Operations";

/**
    This pattern is used when you might have multiple
    commands to perform.

    This is similar to the Strategy pattern, but used in
    different ways. Both patterns decouple implementations
    of an interface and select the implementation based on
    a decision, but the decision is different. The Command
    pattern decides based on *what* needs to be done while
    the Strategy pattern decides based on *how* a thing
    needs to be done.

    Note that the Command implementation maintains the data
    within its scope, and always returns a new object.
*/
interface Command {
    execute(): number;
}

class AddCommand implements Command {
    constructor(private valueA: number, private valueB: number) {}

    execute = () => {
        return this.valueA + this.valueB;
    };
}

class SubtractCommand implements Command {
    constructor(private valueA: number, private valueB: number) {}

    execute = () => {
        return this.valueA - this.valueB;
    };
}

class DoubleCommand implements Command {
    constructor(private valueA: number) {}

    execute = () => {
        return this.valueA * 2;
    };
}

class CommandHandler {
    /*
        Just ilke the Strategy Pattern, we can decouple the
        implementations.
    */
    static getCommand = (
        operator: Operation,
        number1?: number,
        number2?: number
    ) => {
        switch (operator) {
            case Operation.Add:
                return new AddCommand(number1!, number2!);
            case Operation.Subtract:
                return new SubtractCommand(number1!, number2!);
            case Operation.Double:
                return new DoubleCommand(number1!);
        }
    };
}

export default class CommandExample {
    /*
        Notice that there is no reference to the implementation, itself, and each command
        does something different.
    */
    addNumbersThenDouble = (number1: number, number2: number) => {
        let added = CommandHandler.getCommand(
            Operation.Add,
            number1,
            number2
        ).execute();
        return CommandHandler.getCommand(Operation.Double, added).execute();
    };

    // Let's try this with a decision tree
    addOrSubtractNumbersThenDouble = (
        number1: number,
        number2: number,
        weShouldSubtract: boolean
    ) => {
        let mathed = CommandHandler.getCommand(
            weShouldSubtract ? Operation.Subtract : Operation.Add,
            number1,
            number2
        ).execute();
        return CommandHandler.getCommand(Operation.Double, mathed).execute();
    };
}
