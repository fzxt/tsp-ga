import City from "./City";

export default class Tour {
  constructor(public cities: City[]) {}

  public get size(): number {
    return this.cities.length;
  }

  public get totalDistance(): number {
    const n = this.cities.length;

    if (n === 0) {
      return 0;
    }

    let distance = 0;

    for (let i = 0; i < n - 1; i++) {
      const a = this.cities[i];
      const b = this.cities[i + 1];

      distance += a.getDistance(b);
    }

    distance += this.cities[0].getDistance(this.cities[n - 1]);

    return distance;
  }

  public swapCitiesByIndex(cityAIndex: number, cityBIndex: number) {
    if (
      cityAIndex < 0 ||
      cityBIndex < 0 ||
      cityAIndex >= this.cities.length ||
      cityBIndex >= this.cities.length
    ) {
      throw new RangeError(
        "swapCitiesByIndex: invalid indices given, must be positive, less than number of cities"
      );
    }

    const temp = this.cities[cityAIndex];
    this.cities[cityAIndex] = this.cities[cityBIndex];
    this.cities[cityBIndex] = temp;
  }
}
