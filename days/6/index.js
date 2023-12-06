import { readLines } from "../../utils/file";
import { Race } from "./Race";

const lines = readLines("./days/6/inputs.txt");

const timesRegex = /(Time:)/, distanceRegex = /(Distance:)/;

const time = Number(lines[0].replace(timesRegex, "").trim().split(" ").filter(v => v).join(""))
const distance = Number(lines[1].replace(distanceRegex, "").trim().split(" ").filter(v => v).join(""))


const race = new Race(time, distance);
race.setSolutions();
console.log(race.solutions.length);

/*
let ways = 1;

for (let i = 0; i < races.length; i++) {
    races[i].setSolutions();
    ways *= races[i].solutions.length;
}

console.log(ways)
*/
