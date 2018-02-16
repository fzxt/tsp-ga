interface Coordinate {
  x: number;
  y: number;
}

export default class City {
  public point: Coordinate;

  constructor(point: Coordinate) {
    this.point = point;
  }

  public getDistance(from: City): number {
    const { x: x1, y: y1 } = this.point;
    const { x: x2, y: y2 } = from.point;

    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);

    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }

  public equals(city: City): boolean {
    return (
      city != undefined &&
      city != null &&
      city.point.x === this.point.x &&
      city.point.y === this.point.y
    );
  }
}
