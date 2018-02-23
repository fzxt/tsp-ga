import Generation from "../ga/Generation";
import Tour from "../tsp/Tour";
import Selection from "./selection";

export default class TournamentSelection implements Selection {
  /**
   * Fisher yates shuffle
   * @param {Array} array items An array containing the items.
   */
  private shuffle(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
      const idx = Math.floor(Math.random() * (i + 1));
      [array[i], array[idx]] = [array[idx], array[i]];
    }

    return array;
  }

  private getKTours(generation: Generation, k: number): Tour[] {
    if (k < 1) {
      throw Error("K must be greater than 0.");
    }

    let kTours = [];
    let randomIndexes = this.shuffle(
      Array.from({ length: generation.size }, (x, i) => i)
    );

    for (let i = 0; i < k; i++) {
      kTours.push(generation.getTour(randomIndexes.pop()));
    }

    return kTours;
  }

  select(gen: Generation, k: number): Tour {
    let kTours = this.getKTours(gen, k);

    let bestTour: Tour = kTours[0];

    for (let i = 1; i < kTours.length; i++) {
      let tour = kTours[i];
      if (tour.totalDistance < bestTour.totalDistance) {
        bestTour = tour;
      }
    }

    return bestTour;
  }
}
