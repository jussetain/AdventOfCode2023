import { Position } from "./Position";

export class Part extends Position {
    value;

    constructor(x, y, value) {
        super(x, y);
        this.value = value;
    }
}
