import { expect } from "chai";
import "mocha";

import City from "../../src/tsp/City";

describe("City", () => {
  describe("getDistance", () => {
    it("should compute correct euclidean distance between two cities", () => {
      const a: City = new City({ x: 100, y: 100 });
      const b: City = new City({ x: 200, y: 200 });

      const actual = a.getDistance(b);
      const expected = 141.421;

      expect(actual).to.be.closeTo(expected, 0.01);
    });
  });
});
