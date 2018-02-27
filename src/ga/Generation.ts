import * as PriorityQueue from "js-priority-queue";
import Tour from "../tsp/Tour";

export default class Generation {
  private priorityQueue: PriorityQueue<Tour>;

  constructor(private readonly tours: Tour[]) {
    this.priorityQueue = new PriorityQueue({ comparator: Tour.compareTo });
    this.tours.forEach(tour => this.priorityQueue.queue(tour));
  }

  public getTour(index: number): Tour {
    if (index < 0 || index > this.tours.length) {
      throw new RangeError("Generation.getTour: invalid index");
    }

    return this.tours[index];
  }

  get size(): number {
    return this.tours.length;
  }

  get bestTour(): Tour {
    return this.priorityQueue.peek();
  }

  get bestFitness(): number {
    return this.priorityQueue.peek().totalDistance;
  }

  get averageFitness(): number {
    if (this.tours.length === 0) {
      return 0;
    }

    const sum = this.tours.reduce(
      (tour, { totalDistance }) => tour + totalDistance,
      0
    );

    return sum / this.tours.length;
  }
}
