import 'mocha';
import { expect } from 'chai';
import City from '../../src/tsp/City';

describe('City', () => {
  it("getDistance: should compute correct euclidean distance between two cities", () => {
    const a: City = new City({ x: 100, y: 100 });
    const b: City = new City({ x: 200, y: 200 });

    const actual = a.getDistance(b).toFixed(3);
    const expected = 141.421;

    expect(parseFloat(actual)).to.equal(expected);
  });
});
