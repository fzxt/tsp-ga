import { expect } from "chai";
import "mocha";
import Parser from "../../src/data/Parser";
import City from "../../src/tsp/City";

const testData = `NAME: dj38
TYPE: TSP
DIMENSION: 10
NODE_COORD_SECTION
1 11003.611100 42102.500000
2 11108.611100 42373.888900
3 11133.333300 42885.833300`;

describe("Parser", () => {
  it("should throw error on bad data or empty data", () => {
    expect(() => Parser.getCities("")).to.throw();
    expect(() => Parser.getCities(`this is bad data`)).to.throw();
  });

  it("should return array of cities given proper data", () => {
    const actual = Parser.getCities(testData);

    const expected: City[] = [
      new City({ x: 11003.6111, y: 42102.5 }),
      new City({ x: 11108.6111, y: 42373.8889 }),
      new City({ x: 11133.3333, y: 42885.8333 })
    ];

    actual.forEach((city, index) => {
      expect(city.point.x).to.equal(expected[index].point.x);
      expect(city.point.y).to.equal(expected[index].point.y);
    });

    expect(actual.length).equal(expected.length);
  });
});
