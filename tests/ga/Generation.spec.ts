import { expect } from "chai";
import "mocha";

import Generation from "../../src/ga/Generation";
import City from "../../src/tsp/City";
import Tour from "../../src/tsp/Tour";

let citiesA: City[];
let citiesB: City[];

describe("Generation", () => {
  before(() => {
    citiesA = [
      new City({
        x: 100,
        y: 100
      }),
      new City({
        x: 200,
        y: 200
      }),
      new City({
        x: 300,
        y: 300
      })
    ];

    citiesB = [
      new City({
        x: 200,
        y: 300
      }),
      new City({
        x: 400,
        y: 500
      }),
      new City({
        x: 600,
        y: 700
      })
    ];
  });

  describe("averageFitness", () => {
    it("should return 0 for average fitness when no tours", () => {
      const generation = new Generation([]);
      expect(generation.averageFitness).to.equal(0);
    });

    it("should return correct average fitness given a single tour", () => {
      const tour = new Tour(citiesA);
      const generation = new Generation([tour]);

      // Since there is only one tour, the expected average fitness should be
      // the same value as the totalDistance for the tour
      const expectedAverageFitness = tour.totalDistance;
      expect(generation.averageFitness).to.be.closeTo(
        expectedAverageFitness,
        0.1
      );
    });

    it("should return correct average fitness given multiple tours", () => {
      const tourA = new Tour(citiesA);
      const tourB = new Tour(citiesB);

      const generation = new Generation([tourA, tourB]);

      const expectedAverageFitness =
        (tourA.totalDistance + tourB.totalDistance) / 2;
      expect(generation.averageFitness).to.be.closeTo(
        expectedAverageFitness,
        0.1
      );
    });
  });

  describe("getTour", () => {
    it("should throw RangeError if invalid index is given", () => {
      const generation = new Generation([]);
      expect(() => generation.getTour(3)).to.throw(RangeError);
    });

    it("should return correct tour given valid index", () => {
      const expectedTour = new Tour(citiesB);
      const generation = new Generation([new Tour(citiesA), expectedTour]);
      const selectedTour = generation.getTour(1);
      expect(selectedTour).to.deep.equal(expectedTour);
    });
  });
});
