import { expect } from "chai";
import "mocha";
import { stub } from "sinon";

import Generation from "../../src/ga/Generation";
import TournamentSelection from "../../src/selection/TournamentSelection";
import City from "../../src/tsp/City";
import Tour from "../../src/tsp/Tour";

let gen: Generation;
let bestTour: Tour;
describe("TournamentSelection", () => {
  before(() => {
    const citiesA = [
      new City({ x: 100, y: 200 }),
      new City({ x: 200, y: 300 }),
      new City({ x: 400, y: 500 })
    ];

    const citiesB = [
      new City({ x: 400, y: 500 }),
      new City({ x: 800, y: 300 }),
      new City({ x: 100, y: 200 })
    ];

    const tourA = new Tour(citiesA);
    const tourB = new Tour(citiesB);

    bestTour = tourA.totalDistance < tourB.totalDistance ? tourA : tourB;

    gen = new Generation([tourA, tourB]);
  });

  describe("select", () => {
    it("should give the best tour", () => {
      const selectionStategy = new TournamentSelection();
      const selected = selectionStategy.select(gen, 2);
      expect(selected).to.deep.equal(bestTour);
    });
  });
});
