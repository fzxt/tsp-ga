import { expect } from "chai";
import "mocha";

import City from "../../src/tsp/City";
import Tour from "../../src/tsp/Tour";

let oddCities: City[];
let evenCities: City[];

describe("Tour", () => {
  before(() => {
    oddCities = [
      // distance is 290.993015 between first two cities
      new City({ x: 11003.6111, y: 42102.5 }),
      // distance is 512.54098 between second and third
      new City({ x: 11108.6111, y: 42373.8889 }),
      // distance is 794.001831 between third and last city, to complete the tour
      new City({ x: 11133.3333, y: 42885.8333 })
    ];

    evenCities = [
      new City({ x: 11003.6111, y: 42102.5 }),
      new City({ x: 11108.6111, y: 42373.8889 })
    ];
  });

  describe("totalDistance", () => {
    it("should return 0 for total distance if no cities in tour", () => {
      const tour: Tour = new Tour([]);
      expect(tour.totalDistance).to.equal(0);
    });

    it("should return correct total distance for odd number of cities", () => {
      const tour: Tour = new Tour(oddCities);
      const actual = tour.totalDistance;
      const expectedTotalDistance = 290.993015 + 512.54098 + 794.001831;
      expect(actual).to.be.closeTo(expectedTotalDistance, 0.01);
    });

    it("should return correct total distance for even number of cities", () => {
      const tour: Tour = new Tour(evenCities);
      const actual = tour.totalDistance;
      const expectedTotalDistance = 290.993015 * 2;
      expect(actual).to.be.closeTo(expectedTotalDistance, 0.01);
    });
  });

  describe("swapCitiesByIndex", () => {
    it("should throw RangeError when given two invalid indices", () => {
      const tour: Tour = new Tour([]);
      expect(() => tour.swapCitiesByIndex(-1, 100)).to.throw(RangeError);
    });

    it("should swap correctly when given two valid indices", () => {
      const beforeSwap: Tour = new Tour([
        new City({ x: 100, y: 100 }),
        new City({ x: 200, y: 200 })
      ]);

      const afterSwap: Tour = new Tour([...beforeSwap.cities]);
      afterSwap.swapCitiesByIndex(0, 1);
      expect(afterSwap.cities).to.not.deep.equal(beforeSwap.cities);
    });
  });
});
