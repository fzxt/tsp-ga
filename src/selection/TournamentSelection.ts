// tslint:disable-next-line
const shuffle = require("lodash.shuffle");

import Generation from "../ga/Generation";
import Tour from "../tsp/Tour";
import Selection from "./selection";

export default class TournamentSelection implements Selection {
  public select(gen: Generation, k: number): Tour {
    const kTours = this.getKRandomTours(gen, k);

    let bestTour: Tour = kTours[0];

    for (let i = 1; i < kTours.length; i++) {
      const tour = kTours[i];
      if (tour.totalDistance < bestTour.totalDistance) {
        bestTour = tour;
      }
    }

    return bestTour;
  }

  private getKRandomTours(generation: Generation, k: number): Tour[] {
    if (k < 1) {
      throw Error("K must be greater than 0.");
    }

    if (generation.size === 0) {
      throw new Error("Cannot select K tours from empty generation");
    }

    const kTours = [];
    const randomIndexes = shuffle(
      Array.from({ length: generation.size }, (x, i) => i)
    );

    for (let i = 0; i < k; i++) {
      kTours.push(generation.getTour(randomIndexes.pop()));
    }

    return kTours;
  }
}
