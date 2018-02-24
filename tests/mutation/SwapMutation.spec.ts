import { expect } from "chai";
import "mocha";

import SwapMutation from "../../src/mutation/SwapMutation";
import City from "../../src/tsp/City";
import Tour from "../../src/tsp/Tour";

let emptyTour: Tour;
let tourWithCities: Tour;

describe("SwapMutation", () => {
  before(() => {
    emptyTour = new Tour([]);
    tourWithCities = new Tour([
      new City({ x: 100, y: 100 }),
      new City({ x: 200, y: 200 })
    ]);
  });

  it("should not mutate tour.swapCitiesByIndex given tour with no cities", () => {
    const swappedTour = new SwapMutation().mutate(emptyTour);
    expect(swappedTour).to.equal(emptyTour);
  });

  it("should swap cities in tour given tour with cities", () => {
    const tour = new Tour([...tourWithCities.cities]);
    const swappedTour: Tour = new SwapMutation().mutate(tour);
    expect(swappedTour.cities).to.not.deep.equal(tourWithCities.cities);
    expect(swappedTour.size).to.be.equal(tourWithCities.size);
  });
});
