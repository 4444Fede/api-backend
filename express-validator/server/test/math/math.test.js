const { add, subtract } = require("./math");

describe("Basic Math Functions", () => {
  test("add(2, 3) should return 5", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("add(-1, 1) should return 0", () => {
    expect(add(-1, 1)).toBe(0);
  });

  test("subtract(5, 3) should return 2", () => {
    expect(subtract(5, 3)).toBe(2);
  });

  test("subtract(0, 3) should return -3", () => {
    expect(subtract(0, 3)).toBe(-3);
  });
});

describe("Basic Comparisons", () => {
  test("Two numbers should be equal", () => {
    expect(5).toBe(5);
  });

  test("Two objects should have the same structure", () => {
    const obj1 = { name: "John", age: 30 };
    const obj2 = { name: "John", age: 30 };
    expect(obj1).toEqual(obj2);
  });
});

describe("Object Tests", () => {
  test("Object should have correct properties and values", () => {
    const user = { name: "Alice", age: 25, isActive: true };
    expect(user).toEqual({
      name: "Alice",
      age: 25,
      isActive: true,
    });
  });

  test("Nested object should match structure", () => {
    const user = {
      name: "Bob",
      address: {
        city: "New York",
        zip: 10001,
      },
    };
    expect(user).toEqual({
      name: "Bob",
      address: {
        city: "New York",
        zip: 10001,
      },
    });
  });
});

describe("Boolean and Null Tests", () => {
  test("Value should be truthy", () => {
    const isAvailable = true;
    expect(isAvailable).toBeTruthy();
  });

  test("Value should be falsy", () => {
    const isAvailable = false;
    expect(isAvailable).toBeFalsy();
  });

  test("Value should be null", () => {
    const result = null;
    expect(result).toBeNull();
  });

  test("Value should be defined", () => {
    const definedValue = "Hello";
    expect(definedValue).toBeDefined();
  });

  test("Value should be undefined", () => {
    let undefinedValue;
    expect(undefinedValue).toBeUndefined();
  });
});

describe("Number Tests", () => {
  test("Number should be greater than another", () => {
    expect(10).toBeGreaterThan(5);
  });

  test("Number should be greater than or equal to another", () => {
    expect(10).toBeGreaterThanOrEqual(10);
  });

  test("Number should be less than another", () => {
    expect(5).toBeLessThan(10);
  });

  test("Number should be less than or equal to another", () => {
    expect(5).toBeLessThanOrEqual(5);
  });

  test("Positive and negative numbers comparison", () => {
    expect(-5).toBeLessThan(0);
    expect(5).toBeGreaterThan(-5);
  });
});
