import Tour from "../tsp/Tour";
import Mutation from "./Mutation.interface";

export default class SwapMutation implements Mutation {
  public mutate(tour: Tour): Tour {
    if (tour.size <= 1) {
      return tour;
    }

    let cityAIndex: number = 0;
    let cityBIndex: number = 0;

    while (cityAIndex === cityBIndex) {
      cityAIndex = Math.floor(Math.random() * tour.size);
      cityBIndex = Math.floor(Math.random() * tour.size);
    }

    tour.swapCitiesByIndex(cityAIndex, cityBIndex);

    return tour;
  }
}
