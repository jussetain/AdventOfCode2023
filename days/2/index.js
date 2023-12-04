import fs from "fs";

const getLines = () => {
    try {
        const data = fs.readFileSync("./days/2/inputs.txt", 'utf8');
        const lines = data.split('\r\n');
        return lines;
    } catch (err) {
        console.error(err);
        return [];
    }
}
const LINES = getLines();

const getData = (line) => {
    const regex = /(Game )(\d+)(:)/;
    const rawDraw = stripHeader(line, regex);
    if (rawDraw) {
        return checkDraw(formatDraw(rawDraw));
    }
    return 0;
}

const stripHeader = (line, regex) => {
    const result = line.match(regex);

    if (result) {
        return {
            index: result[2],
            line: line.substring(result[0].length + 1,)
        };
    }

    return null;

}

const formatDraw = ({ line }) => {
    const array = []

    line.split(";").map(t => t.split(",").map(u => {
        const currentDraw = u.trim().split(" ");
        array.push({
            quantity: Number(currentDraw[0]),
            color: currentDraw[1]
        });
    }));

    return array;
}

const checkDraw = (data) => {
    let result = {};

    data.map(draw => {
        if (!result[draw.color]) result[draw.color] = [];
        result[draw.color].push(draw.quantity);
    });

    return Object.values(result).map(value => Math.max(...value)).reduce((a, b) => a * b);
}

let total = 0;

const run = () => {
    LINES.map((line, index) => {
        const result = getData(line);
        if (result) total += result;
    });
    console.log(total);
}

run();
