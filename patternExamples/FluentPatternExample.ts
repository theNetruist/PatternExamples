/**
    The Fluent Pattern is similar to the Strategy Pattern, in that
    it modifies an object, but in the Fluent pattern, the object
    definition is modified so that it can perform actions on itself.
*/
class FluentPattern {
    constructor(public value: number) {}
}

/*
    A downside of this pattern (at least in TS) is that
    each fluent function has to be added to the interface.

    Also, TS tends to complain if the functionas aren't added to the same file.
    This can be safely '@ts-ignore'd.
*/
interface FluentPattern {
    add(value: number): FluentPattern;
}

FluentPattern.prototype.add = function (value: number) {
    this.value = this.value + value;
    return this;
};

interface FluentPattern {
    subtract(value: number): FluentPattern;
}

FluentPattern.prototype.subtract = function (value: number) {
    this.value = this.value - value;
    return this;
};

interface FluentPattern {
    double(): FluentPattern;
}

FluentPattern.prototype.double = function () {
    this.value = this.value * 2;
    return this;
};

export default class FluentPatternExample {
    addNumbersThenDouble = (number1: number, number2: number) => {
        return new FluentPattern(number1).add(number2).double().value;
    };

    // Let's try this with a decision tree
    addOrSubtractNumbersThenDouble = (
        number1: number,
        number2: number,
        weShouldSubtract: boolean
    ) => {
        let fp = new FluentPattern(number1);
        if (weShouldSubtract) {
            fp.subtract(number2);
        } else {
            fp.add(number2);
        }
        return fp.double().value;
    };
}
