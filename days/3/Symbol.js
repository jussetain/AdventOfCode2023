import { Position } from "./Position";

export class Symbol extends Position {
    type;
    constructor(type, x, y) {
        super(x, y);
        this.type = type;
    }
}
