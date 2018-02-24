const shuffle = require("lodash.shuffle");

import City from "../tsp/City";
import Tour from "../tsp/Tour";

import Generation from "./Generation";
import Selection from "../selection/Selection";
import TournamentSelection from "../selection/TournamentSelection";
import UniformOrderCrossover from "../crossover/UniformOrderedCrossover";
import Crossover from "../crossover/Crossover.interface";
import SwapMutation from "../mutation/SwapMutation";
import Mutation from "../mutation/Mutation.interface";

export default class GeneticAlgorithm {
  private readonly GENERATION_SIZE: Number = 500;

  private readonly initialCities: City[];
  private readonly selectionStrategy: Selection;
  private readonly crossoverStrategy: Crossover;
  private readonly mutationStrategy: Mutation;

  constructor(cities: City[]) {
    this.initialCities = cities;
    this.selectionStrategy = new TournamentSelection();
    this.crossoverStrategy = new UniformOrderCrossover(
      this.initialCities.length
    );
    this.mutationStrategy = new SwapMutation();
  }

  public run() {
    let iterations = 0;
    let parent = this.createInitialGeneration(this.initialCities);

    if (parent.size == 0) {
      throw new Error("GA.run(): Initial generation was empty! aborting");
    }

    while (iterations < this.GENERATION_SIZE) {
      let generatedChildren = this.generateChildrenFromParent(parent);
      parent = new Generation(generatedChildren);
      console.log(`Average fitness: ${parent.averageFitness}`);
      iterations++;
    }
  }

  private generateChildrenFromParent(parent: Generation): Tour[] {
    let generatedChildren: Tour[] = [];

    while (generatedChildren.length < this.GENERATION_SIZE) {
      let [parentA, parentB] = [
        this.selectionStrategy.select(parent, this.initialCities.length),
        this.selectionStrategy.select(parent, this.initialCities.length)
      ];

      let [childA, childB] = this.crossoverStrategy.crossover(parentA, parentB);

      childA = this.mutationStrategy.mutate(childA);
      childB = this.mutationStrategy.mutate(childB);

      generatedChildren.push(childA, childB);
    }

    return generatedChildren;
  }

  private createInitialGeneration(initialCities: City[]): Generation {
    let initialPopulation: Tour[] = [];

    for (let i = 0; i < this.GENERATION_SIZE; i++) {
      let cities = shuffle(initialCities);
      initialPopulation.push(new Tour(cities));
    }

    return new Generation(initialPopulation);
  }
}
