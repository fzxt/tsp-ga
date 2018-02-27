import * as d3 from "d3";
import City from "../tsp/City";
import Tour from "../tsp/Tour";

interface TourGraphConfig {
  container: HTMLElement;
  cities: City[];
  width: number;
  height: number;
  node_radius?: number;
}

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export default class TourGraph {
  private svg;
  private node;

  private linearScaleX: d3.ScaleLinear<number, number>;
  private linearScaleY: d3.ScaleLinear<number, number>;

  constructor(private config: TourGraphConfig) {
    if (this.config.container.nodeName !== "svg") {
      throw new Error("TourGraph: Error, container must be an SVG element");
    }

    this.config.node_radius = config.node_radius || 5;

    const { cities, height, width } = this.config;

    const [minX, maxX] = d3.extent(cities, city => city.point.x);
    const [minY, maxY] = d3.extent(cities, city => city.point.y);

    this.linearScaleX = d3
      .scaleLinear()
      .domain([minX, maxX])
      // so we aren't drawing cities on the edges
      .range([30, width - 30]);

    this.linearScaleY = d3
      .scaleLinear()
      .domain([minY, maxY])
      .range([30, height - 30]);
  }

  public drawCities() {
    this.node = this.svg
      .append("g")
      .selectAll("g")
      .data(this.makeNodes(this.config.cities));

    const container = this.node.enter().append("g");

    container
      .append("circle")
      .attr("class", "node")
      .attr("fill", (d, i) =>
        this.findColorBetween(
          { r: 182, g: 65, b: 100 },
          { r: 96, g: 46, b: 108 },
          i / this.config.cities.length
        )
      )
      .attr("r", this.config.node_radius)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .merge(container);

    container
      .append("text")
      .attr("fill", "white")
      .attr("x", d => d.x)
      .attr("y", d => d.y - 10)
      .text((d, i) => `${i + 1}`)
      .merge(container);
  }

  public drawTour(tour: Tour) {
    const link = this.svg.selectAll(".link").data(this.makeLinks(tour.cities));

    link
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#979797")
      .attr("stroke-width", 2)
      .merge(link)
      .attr("x1", d => this.linearScaleX(d.source.x))
      .attr("x2", d => this.linearScaleX(d.target.x))
      .attr("y1", d => this.linearScaleY(d.source.y))
      .attr("y2", d => this.linearScaleY(d.target.y));
  }

  public init() {
    this.svg = d3
      .select(this.config.container)
      .attr("width", this.config.width)
      .attr("height", this.config.height);
  }

  private makeNodes(cities: City[]) {
    return cities.map(city => ({
      x: this.linearScaleX(city.point.x),
      y: this.linearScaleY(city.point.y)
    }));
  }

  private findColorBetween(
    left: RGBColor,
    right: RGBColor,
    percentage: number
  ): string {
    const channels = ["r", "g", "b"];
    const color = { r: 0, g: 0, b: 0 };
    channels.forEach(
      c => (color[c] = Math.round(left[c] + (right[c] - left[c]) * percentage))
    );
    return `rgb(${color.r},${color.g},${color.b})`;
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
