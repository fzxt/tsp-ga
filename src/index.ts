import * as d3 from "d3";
import data from "../data/dj38.tsp";
import Parser from "./data/Parser";
import TourGraph from "./ui/TourGraph";

import {
  GeneticAlgorithm,
  GeneticAlgorithmResult
} from "./ga/GeneticAlgorithm";

import City from "./tsp/City";
import Tour from "./tsp/Tour";

const cities = Parser.getCities(data);
const ga = new GeneticAlgorithm({ cities, genSize: 500 });
const iterator: IterableIterator<GeneticAlgorithmResult> = ga.run();
const bestFitnessTextNode = document.getElementById("bestFitness");
const averageFitnessTextNode = document.getElementById("avgFitness");

const GRAPH_HEIGHT = 400 / 16 * 9;
const GRAPH_WIDTH = 600;

const $graph = document.getElementById("graph");

const graph: TourGraph = new TourGraph({
  cities,
  container: $graph,
  height: GRAPH_HEIGHT,
  node_radius: 8,
  width: GRAPH_WIDTH
});

function renderStats(bestFitness: number, avgFitness: number) {
  bestFitnessTextNode.textContent = `${bestFitness.toFixed(4)}`;
  averageFitnessTextNode.textContent = `${avgFitness.toFixed(4)}`;
}

function setupGraph() {
  graph.init();
  graph.drawTour(new Tour(cities));
  graph.drawCities();
}

function update() {
  const { done, value: results } = iterator.next();

  if (done) {
    return;
  }

  graph.drawTour(results.bestTour);

  renderStats(results.bestFitness, results.averageFitness);

  requestAnimationFrame(update);
}

function main() {
  setupGraph();
  update();
}

main();
