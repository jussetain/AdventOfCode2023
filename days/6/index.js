import { readLines } from "../../utils/file";
import { Race } from "./Race";

const lines = readLines("./days/6/inputs.txt");

const timesRegex = /(Time:)/, distanceRegex = /(Distance:)/;

const times = lines[0].replace(timesRegex, "").trim().split(" ").filter(v => v).map(v => Number(v));
const distances = lines[1].replace(distanceRegex, "").trim().split(" ").filter(v => v).map(v => Number(v));

const races = [];

for (let i = 0; i < times.length; i++) {
    races.push(new Race(times[i], distances[i]))
}

let ways = 1;

for (let i = 0; i < races.length; i++) {
    races[i].setSolutions();
    ways *= races[i].solutions.length;
}

console.log(ways)
