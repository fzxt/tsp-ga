import Tour from "../tsp/Tour";
import Generation from "../ga/Generation";

export default interface Selection {
  select(gen: Generation, k: number): Tour;
};
