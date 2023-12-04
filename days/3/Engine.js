import { readLines } from "../../utils/file";

import { Symbol } from "./Symbol";
import { Part } from "./Part";
import { Position } from "./Position";

const Directions = {
    N: new Position(-1, 0),
    S: new Position(1, 0),
    W: new Position(0, -1),
    E: new Position(0, 1),
    NE: new Position(-1, 1),
    NW: new Position(-1, -1),
    SE: new Position(1, 1),
    SW: new Position(1, -1),
}

export class Engine {
    symbols;
    part;

    constructor() {
        this.symbols = [];
        this.parts = [];

        this.getSymbols();
        this.getParts();
    }

    getSymbols = () => {
        const regexSymbols = /[^A-Za-z0-9.\n]/g;
        const lines = readLines("./days/3/inputs.txt");

        lines.map((line, index) => {
            const results = line.matchAll(regexSymbols);
            [...results].map(r => {
                this.symbols.push(new Symbol(r[0], index, r.index));
            });
        })
    }

    getParts = () => {
        const regexNumbers = /\d+/g;
        const lines = readLines("./days/3/inputs.txt");

        lines.map((line, index) => {
            const results = line.matchAll(regexNumbers);
            [...results].map(r => {
                this.parts.push(new Part(index, r.index, r[0]));
            });
        });
    }

    checkPartSurroundings = (part) => {
        let isOk = false;
        for (let i = 0; i < part.value.length; i++) {
            let { x, y } = part;
            y = y + i;
            Object.values(Directions).map((direction) => {
                const newX = x + direction.x;
                const newY = y + direction.y;

                isOk |= this.isThereSymbol(newX, newY);
            });
        }
        return !!isOk;
    }

    checkSymbolSurroundings = (symbol) => {
        return this.symbols.map((symbol) => {
            const { x, y, type } = symbol;
            let result = [];

            Object.values(Directions).map((direction) => {
                const newX = x + direction.x;
                const newY = y + direction.y;

                this.parts
                    .filter((part) => part.x >= x - 1 && part.x <= x + 1)
                    .map((part) => {
                        for (let i = 0; i < part.value.length; i++) {
                            if (newX === part.x && newY === part.y + i) {
                                result.push(part);
                            }
                        }
                    });
            });
            /** Thanks stackoverflow https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects */
            result = result.filter((res, index, self) =>
                index === self.findIndex((t) => (
                    t.x === res.x && t.y === res.y && t.value === res.value
                ))
            )


            return {
                symbol,
                result,
            }
        })
    }

    isThereSymbol = (x, y) => !this.symbols.every((symbol) => !(symbol.x === x && symbol.y === y));

    getSchematicEngine = () => {
        let total = 0;
        this.checkSymbolSurroundings().map(gears => {
            if (gears.symbol.type === '*' && gears.result.length === 2) {
                total += (Number(gears.result[0].value) * Number(gears.result[1].value));
            }
        });

        return total;
    }

}
