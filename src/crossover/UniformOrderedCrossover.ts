import Crossover from "./Crossover.interface";

import City from "../tsp/City";
import Tour from "../tsp/Tour";

/**
 * Implementation of the uniform order crossover.
 * Given two tours (parents), return the two children by combining the genes of them using a binary crossover mask.
 */

export default class UniformOrderCrossover implements Crossover {
  private static generateRandomBitmaskOfSize(size: number): number[] {
    return new Array(size).fill(Math.round(Math.random()));
  }

  constructor(
    bitmaskSize: number = 0,
    private bitmask: number[] = UniformOrderCrossover.generateRandomBitmaskOfSize(
      bitmaskSize
    )
  ) {}

  public crossover(parentA: Tour, parentB: Tour): Tour[] {
    if (parentA.size !== parentB.size) {
      throw Error(
        "Crossover: Error, parents have different sizes. Cannot perform crossover"
      );
    }

    const childA: City[] = new Array(this.bitmask.length).fill(null);
    const childB: City[] = new Array(this.bitmask.length).fill(null);

    this.passGenesFromParents(childA, parentA, childB, parentB);
    this.passRestFromOtherParent(parentB, childA, parentA, childB);

    return [new Tour(childA), new Tour(childB)];
  }

  private passGenesFromParents(
    childA: City[],
    parentA: Tour,
    childB: City[],
    parentB: Tour
  ) {
    for (let i = 0; i < this.bitmask.length; i++) {
      if (this.bitmask[i] === 1) {
        childA[i] = new City({ ...parentA.cities[i].point });
        childB[i] = new City({ ...parentB.cities[i].point });
      }
    }
  }

  private passRestFromOtherParent(
    parentB: Tour,
    childA: City[],
    parentA: Tour,
    childB: City[]
  ) {
    // compute the set difference between child one, and parent b
    const notInA = parentB.cities.filter(city => !this.contains(childA, city));
    const notInB = parentA.cities.filter(city => !this.contains(childB, city));
    // fill in the null values
    for (let i = 0; i < this.bitmask.length; i++) {
      if (childA[i] === null) {
        childA[i] = notInA.shift();
      }
      if (childB[i] === null) {
        childB[i] = notInB.shift();
      }
    }
  }

  private contains(child: City[], otherCity: City): boolean {
    for (const city of child) {
      if (city !== null && city.equals(otherCity)) {
        return true;
      }
    }

    return false;
  }
}
