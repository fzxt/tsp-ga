import "mocha";
import { expect } from "chai";
import { stub } from "sinon";

import TournamentSelection from "../../src/selection/TournamentSelection";
import Generation from "../../src/ga/Generation";
import Tour from "../../src/tsp/Tour";
import City from "../../src/tsp/City";

let gen: Generation;
let bestTour: Tour;
describe("TournamentSelection", () => {
  before(() => {
    let citiesA = [
      new City({ x: 100, y: 200 }),
      new City({ x: 200, y: 300 }),
      new City({ x: 400, y: 500 })
    ];

    let citiesB = [
      new City({ x: 400, y: 500 }),
      new City({ x: 800, y: 300 }),
      new City({ x: 100, y: 200 })
    ];

    let tourA = new Tour(citiesA);
    let tourB = new Tour(citiesB);

    bestTour = tourA.totalDistance < tourB.totalDistance ? tourA : tourB;

    gen = new Generation([tourA, tourB]);
  });

  describe("select", () => {
    it("should give the best tour", () => {
      let selectionStategy = new TournamentSelection();
      let selected = selectionStategy.select(gen, 2);
      expect(selected).to.deep.equal(bestTour);
    });
  });
});
