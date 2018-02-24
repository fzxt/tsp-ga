import Generation from "../ga/Generation";
import Tour from "../tsp/Tour";

export default interface Selection {
  select(gen: Generation, k: number): Tour;
};
