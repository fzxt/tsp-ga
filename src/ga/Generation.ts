import Tour from "../tsp/Tour";

export default class Generation {
  constructor(private tours: Tour[]) {}

  public getTour(index: number): Tour {
    if (index < 0 || index > this.tours.length) {
      throw new RangeError("Generation.getTour: invalid index");
    }

    return this.tours[index];
  }

  get averageFitness(): number {
    if (this.tours.length === 0) {
      return 0;
    }

    let sum = 0;

    this.tours.forEach(tour => {
      sum += tour.totalDistance;
    });

    return sum / this.tours.length;
  }
}
