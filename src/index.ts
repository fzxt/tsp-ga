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
const ga = new GeneticAlgorithm(cities);
const iterator: IterableIterator<GeneticAlgorithmResult> = ga.run();
const bestFitnessTextNode = document.getElementById("bestFitness");

const GRAPH_HEIGHT = 800;
const GRAPH_WIDTH = 600;

const graph: TourGraph = new TourGraph({
  cities,
  height: GRAPH_HEIGHT,
  width: GRAPH_WIDTH
});

function renderStats(bestFitness: number, avgFitness: number) {
  bestFitnessTextNode.textContent = `Best: ${bestFitness.toFixed(
    4
  )}\tAvg: ${avgFitness.toFixed(4)}`;
}

function setupGraph() {
  graph.init();
  graph.drawCities();
  graph.drawTour(new Tour(cities));
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
