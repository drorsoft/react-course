import { expect, it, describe } from "vitest";
import { isValidEmail } from "../src/validators/isValidEmail";

describe("isValidEmail", () => {
  it("should validate correct email format", () => {
    const result = isValidEmail("joe@example.com");
    expect(result).toBe(true);
  });
  it("should not validate incorrect email format", () => {
    const result = isValidEmail("joeexample.com");
    expect(result).toBe(false);
  });
  it("edge case", () => {
    expect(() => {
      const result = isValidEmail(false as unknown as string);
    }).toThrowError();
  });
  // describe("edge cases", () => {
  //   test("should validate correct email format", () => {
  //     expect(1 + 2).toBe(3);
  //   });
  // });
});
