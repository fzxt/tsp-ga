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
const ga = new GeneticAlgorithm({ cities, genSize: 50 });
const iterator: IterableIterator<GeneticAlgorithmResult> = ga.run();
const bestFitnessTextNode = document.getElementById("bestFitness");
const averageFitnessTextNode = document.getElementById("avgFitness");

const $card = document.getElementById("card");
const $graph = document.getElementById("graph");
const $settingsBtn = document.getElementById("btn-settings");
const $closeSettingsBtn = document.getElementById("btn-close");

const GRAPH_HEIGHT = 507;
const GRAPH_WIDTH = 900;

$settingsBtn.addEventListener("click", onSettingsClick);
$closeSettingsBtn.addEventListener("click", onCloseClicked);

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

function onSettingsClick(e: Event) {
  $card.classList.add("flip");
}

function onCloseClicked(e: Event) {
  $card.classList.remove("flip");
}

function setupGraph() {
  graph.init();
  graph.drawTour(new Tour(cities));
  // Draw cities after to ensure the nodes are on top of the tour path lines
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
