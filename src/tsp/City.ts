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
    let { x: x1, y: y1 } = this.point;
    let { x: x2, y: y2 } = from.point;

    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);

    return Math.sqrt((Math.pow(dx, 2)) + Math.pow(dy, 2));
  }
}
