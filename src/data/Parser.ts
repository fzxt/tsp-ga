import City from "../tsp/City";

export default class Parser {
  public static getCities(data: string): City[] {
    try {
      if (!data) {
        throw new Error("bad data");
      }

      const lines = data.split("\n");

      const coordinates = lines
        .filter(line => this.isCoordinateString(line))
        .map(line => line.split(" "))
        .map((coord: string[]) => {
          const x = parseFloat(coord[1]);
          const y = parseFloat(coord[2]);

          if (isNaN(x) || isNaN(y)) {
            throw new Error("bad data");
          }

          return { x, y };
        });

      return coordinates.map(({ x, y }) => new City({ x, y }));
    } catch (err) {
      throw Error(
        "Parser.getCities: Check data file or string passed to function!"
      );
    }
  }

  private static isCoordinateString = (line: string): boolean =>
    !line.includes("DIMENSION") &&
    !line.includes("NODE_COORD_SECTION") &&
    !line.includes("TYPE") &&
    !line.includes("NAME");
}
