import 'mocha';
import { expect } from 'chai';
import City from '../../src/tsp/City';
import Parser from '../../src/io/Parser';

let testData =
  `NAME: dj38
TYPE: TSP
DIMENSION: 10
NODE_COORD_SECTION
1 11003.611100 42102.500000
2 11108.611100 42373.888900
3 11133.333300 42885.833300`

describe('Parser', () => {
  it("should throw error on bad data", () => {
    expect(() => {
      Parser.getCities(`this is bad data`)
    }).to.throw(Error, "Parser.getCities: Check data file or string passed to function")
  });

  it("should return array of cities given proper data", () => {
    let actual = Parser.getCities(testData);

    let expected: City[] = [
      new City({ x: 11003.6111, y: 42102.500000 }),
      new City({ x: 11108.6111, y: 42373.888900 }),
      new City({ x: 11133.3333, y: 42885.833300 }),
    ]

    actual.forEach((city, index) => {
      expect(city.point.x).to.equal(expected[index].point.x);
      expect(city.point.y).to.equal(expected[index].point.y);
    });

    expect(actual.length).equal(expected.length);
  });
});
