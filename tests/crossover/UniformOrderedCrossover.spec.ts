import "mocha";
import { expect } from "chai";

import UniformOrderCrossover from "../../src/crossover/UniformOrderedCrossover";
import Tour from "../../src/tsp/Tour";
import City from "../../src/tsp/City";

let parentA: Tour;
let parentB: Tour;

// set up, test cases and expected values inspired by this example for UOX:
// given the following:
// parent 1: [ 6, 2, 1, 4, 5, 7, 3 ]
// bitmask:  [ 0, 1, 1, 0, 1, 0, 1 ]
// parent 2: [ 4, 3, 7, 2, 1, 6, 5 ]

// should produce the following children:
// child 1: [ 4, 2, 1, 7, 5, 6, 3 ]
// child 2: [ 6, 3, 7, 2, 1, 4, 5 ]

describe("UniformOrderCrossover", () => {
  before(() => {
    parentA = new Tour([
      new City({
        x: 600,
        y: 600
      }),
      new City({
        x: 200,
        y: 200
      }),
      new City({
        x: 100,
        y: 100
      }),
      new City({
        x: 400,
        y: 400
      }),
      new City({
        x: 500,
        y: 500
      }),
      new City({
        x: 700,
        y: 700
      }),
      new City({
        x: 300,
        y: 300
      })
    ]);

    parentB = new Tour([
      new City({
        x: 400,
        y: 400
      }),
      new City({
        x: 300,
        y: 300
      }),
      new City({
        x: 700,
        y: 700
      }),
      new City({
        x: 200,
        y: 200
      }),
      new City({
        x: 100,
        y: 100
      }),
      new City({
        x: 600,
        y: 600
      }),
      new City({
        x: 500,
        y: 500
      })
    ]);
  });

  describe("uniformCrossover", () => {
    it("should perform crossover correctly given bitmask", () => {
      // prettier-ignore
      let [ childA, childB ] = new UniformOrderCrossover(parentA.size, [0, 1, 1, 0, 1, 0, 1]).crossover(parentA, parentB);

      let expectedChildA = [
        parentB.cities[0],
        parentA.cities[1],
        parentA.cities[2],
        parentA.cities[5],
        parentA.cities[4],
        parentB.cities[5],
        parentA.cities[6]
      ];

      let expectedChildB = [
        parentA.cities[0],
        parentB.cities[1],
        parentB.cities[2],
        parentA.cities[1],
        parentB.cities[4],
        parentA.cities[3],
        parentB.cities[6]
      ];

      expect(childA.cities).to.deep.equal(expectedChildA);
      expect(childB.cities).to.deep.equal(expectedChildB);
    });
  });
});
