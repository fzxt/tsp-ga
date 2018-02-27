import * as d3 from "d3";
import City from "../tsp/City";
import Tour from "../tsp/Tour";

interface TourGraphConfig {
  cities: City[];
  width: number;
  height: number;
  node_radius?: number;
}

export default class TourGraph {
  private svg;
  private node;

  private linearScaleX: d3.ScaleLinear<number, number>;
  private linearScaleY: d3.ScaleLinear<number, number>;

  constructor(private config: TourGraphConfig) {
    this.config.node_radius = config.node_radius || 5;

    const { cities, height, width } = this.config;

    const [minX, maxX] = d3.extent(cities, city => city.point.x);
    const [minY, maxY] = d3.extent(cities, city => city.point.y);

    this.linearScaleX = d3
      .scaleLinear()
      .domain([minX, maxX])
      // so we aren't drawing cities on the edges
      .range([10, width - 10]);

    this.linearScaleY = d3
      .scaleLinear()
      .domain([minY, maxY])
      .range([10, height - 10]);
  }

  public drawCities() {
    this.node
      .enter()
      .append("circle")
      .attr("r", this.config.node_radius)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  }

  public drawTour(tour: Tour) {
    const link = this.svg.selectAll(".link").data(this.makeLinks(tour.cities));

    link
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .merge(link)
      .attr("x1", d => this.linearScaleX(d.source.x))
      .attr("x2", d => this.linearScaleX(d.target.x))
      .attr("y1", d => this.linearScaleY(d.source.y))
      .attr("y2", d => this.linearScaleY(d.target.y));
  }

  public init() {
    this.svg = d3
      .select("body")
      .append("svg")
      .attr("width", this.config.width)
      .attr("height", this.config.height);

    this.node = this.svg
      .append("g")
      .selectAll("g")
      .data(this.makeNodes(this.config.cities));
  }

  private makeNodes(cities: City[]) {
    return cities.map(city => ({
      x: this.linearScaleX(city.point.x),
      y: this.linearScaleY(city.point.y)
    }));
  }

  private makeLinks(cities: City[]) {
    const results = [];
    const n = cities.length;

    for (let i = 0; i < n - 1; i++) {
      const source = cities[i].point;
      const target = cities[i + 1].point;

      results.push({
        source: { x: source.x, y: source.y },
        target: { x: target.x, y: target.y }
      });
    }

    // Salesman needs to end up back at the starting city
    results.push({
      source: {
        x: cities[n - 1].point.x,
        y: cities[n - 1].point.y
      },
      target: { x: cities[0].point.x, y: cities[0].point.y }
    });

    return results;
  }
}
