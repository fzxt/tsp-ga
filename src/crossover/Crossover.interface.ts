import Tour from "../tsp/Tour";

export default interface Crossover {
  crossover(parentA: Tour, parentB: Tour): Tour[];
};
