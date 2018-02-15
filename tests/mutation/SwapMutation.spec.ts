import * as chai from "chai";
import "mocha";
import { spy } from "sinon";
import * as sinonChai from "sinon-chai";
chai.use(sinonChai);
const { expect } = chai;

import Tour from "../../src/tsp/Tour";
import SwapMutation from "../../src/mutation/SwapMutation";
import City from "../../src/tsp/City";

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
    let swappedTour = new SwapMutation().mutate(emptyTour);
    expect(swappedTour).to.equal(emptyTour);
  });

  it("should call tour.swapCitiesByIndex with 2 different indicies given tour with cities to perform swap", () => {
    let swapCitiesSpy = spy(tourWithCities, "swapCitiesByIndex");

    // call
    new SwapMutation().mutate(tourWithCities);

    expect(swapCitiesSpy).to.have.been.calledOnce;

    // assert two different indices
    let swapCitiesArguments = swapCitiesSpy.getCall(0).args;
    let seen = {};
    swapCitiesArguments.forEach(arg => {
      expect(arg in seen).to.equal(false);
      seen[arg] = arg;
    });

    swapCitiesSpy.restore();
  });

  it("should swap cities in tour given tour with cities", () => {
    let tour = new Tour([...tourWithCities.cities]);
    let swappedTour: Tour = new SwapMutation().mutate(tour);
    expect(swappedTour.cities).to.not.deep.equal(tourWithCities.cities);
    expect(swappedTour.size).to.be.equal(tourWithCities.size);
  });
});
