import Tour from "../tsp/Tour";

export default interface Mutation {
  mutate(tour: Tour): Tour;
};
