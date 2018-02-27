import * as d3 from "d3";
import data from "../data/dj38.tsp";
import Parser from "./data/Parser";

import {
  GeneticAlgorithm,
  GeneticAlgorithmResult
} from "./ga/GeneticAlgorithm";

import City from "./tsp/City";
import Tour from "./tsp/Tour";

const cities = Parser.getCities(data);
const ga = new GeneticAlgorithm(cities);
const iterator: IterableIterator<GeneticAlgorithmResult> = ga.run();
const bestFitnessTextNode = document.getElementById("bestFitness");

const NODE_RADIUS = 6;
const CANVAS_HEIGHT = 800;
const CANVAS_WIDTH = 600;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", CANVAS_WIDTH)
  .attr("height", CANVAS_HEIGHT);

const [minX, maxX] = d3.extent(cities, city => city.point.x);
const [minY, maxY] = d3.extent(cities, city => city.point.y);

const linearScaleX = d3
  .scaleLinear()
  .domain([minX, maxX])
  .range([10, CANVAS_WIDTH - 10]);

const linearScaleY = d3
  .scaleLinear()
  .domain([minY, maxY])
  .range([10, CANVAS_HEIGHT - 10]);

const node = svg
  .append("g")
  .selectAll("g")
  .data(makeNodes(cities));

function makeLinks(cityData: City[]) {
  const results = [];
  const n = cityData.length;

  for (let i = 0; i < n - 1; i++) {
    const source = cityData[i].point;
    const target = cityData[i + 1].point;

    results.push({
      source: { x: source.x, y: source.y },
      target: { x: target.x, y: target.y }
    });
  }

  // Salesman needs to end up back at the starting city
  results.push({
    source: {
      x: cityData[n - 1].point.x,
      y: cityData[n - 1].point.y
    },
    target: { x: cityData[0].point.x, y: cityData[0].point.y }
  });

  return results;
}

function renderStats(bestFitness: number, avgFitness: number) {
  bestFitnessTextNode.textContent = `Best: ${bestFitness.toFixed(
    4
  )}\tAvg: ${avgFitness.toFixed(4)}`;
}

function makeNodes(cityData: City[]) {
  return cityData.map(city => ({
    x: linearScaleX(city.point.x),
    y: linearScaleY(city.point.y)
  }));
}

function drawCities() {
  node
    .enter()
    .append("circle")
    .attr("r", NODE_RADIUS)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);
}

function drawTour(bestTour: Tour) {
  const link = svg.selectAll(".link").data(makeLinks(bestTour.cities));

  link
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .merge(link)
    .attr("x1", d => linearScaleX(d.source.x))
    .attr("x2", d => linearScaleX(d.target.x))
    .attr("y1", d => linearScaleY(d.source.y))
    .attr("y2", d => linearScaleY(d.target.y));
}

function update() {
  const { done, value: results } = iterator.next();

  if (done) {
    return;
  }

  drawTour(results.bestTour);
  renderStats(results.bestFitness, results.averageFitness);

  requestAnimationFrame(update);
}

drawCities();
drawTour(new Tour(cities));
update();
