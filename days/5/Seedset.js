import { readLines } from "../../utils/file.js";

export class Seedset {
    raw;
    seeds;
    steps;

    constructor() {
        this.raw = readLines("./days/5/inputs.txt");
        this.seeds = [];
        this.steps = [];

        this.getSeeds();
        this.getSteps();
    }

    getSeeds = () => {
        const regex = /(seeds:)/;
        const result = this.raw[0].match(regex);

        if (result) {
            this.seeds = this.raw[0].substring(result[0].length + 1,).trim().split(" ").map(v => Number(v))
        }

    }

    getSteps = () => {
        this.raw.map((line, index) => {
            const isHeader = /(map:)/;
            const isValues = /((\d+)(( |\n)+))/;
            if (isHeader.test(line)) {
                this.steps[this.steps.length] = {
                    type: line.replace(isHeader, "").trim(),
                    proc: [],
                }
            } else if (isValues.test(line) && index !== 0) {
                const [destination, source, size] = line.split(" ").map(v => Number(v));
                this.steps[this.steps.length - 1].proc.push({
                    source,
                    destination,
                    size
                })
            }
        });
    }

    getLocationFromSeed = (seed) => {
        let currentValue = seed;
        this.steps.map(step => {
            step.proc.every(proc => {
                if (!(currentValue < proc.source || currentValue > (proc.source + proc.size - 1))) {
                    const offset = currentValue - proc.source;
                    currentValue = proc.destination + offset;
                    return false;
                }
                return true;
            })
        });
        return currentValue;
    }

    getMinSeed = () => Math.min(...this.seeds.map(seed => this.getLocationFromSeed(seed)));

    getMinRangeSeed = () => {
        let currentSeedRange = [];
        let newSeeds = [];
        this.seeds.map((seed, index) => {
            if (index % 2 === 0) {
                currentSeedRange[0] = seed;
            } else {
                currentSeedRange[1] = currentSeedRange[0] + (seed - 1);
                newSeeds.push(currentSeedRange);
                currentSeedRange = [];
            }
        });



        const a = [];
        newSeeds.map((seed) => {
            let tmp = Infinity;
            console.log(seed);
            for (let i = seed[0]; i <= seed[1]; i++) {
                const value = this.getLocationFromSeed(i);
                if (value < tmp) tmp = value;
            }
            a.push(tmp);
            tmp = Infinity;
        });
        return Math.min(...a);
    }
}
