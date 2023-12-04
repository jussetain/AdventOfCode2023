import { readLines } from "../../utils/file.js";

const dataSet = readLines("./days/4/inputs.txt");

const stripHeader = (line) => {
    const regex = /(Card(\s+))(\d+)(:)/;

    const result = line.match(regex);

    if (result) {
        return line.substring(result[0].length + 1,)
    }

    return null;

}

const getNumbers = (line) => {
    const [firstSet, secondSet] = line.split('|');
    return [
        firstSet.split(" ").filter(number => number !== ''),
        secondSet.split(" ").filter(number => number !== ''),
    ]
}

const getWinnings = (dataset) => {
    let duplicates = [];
    dataset[0].map(a => {
        if (dataset[1].some(b => a === b)) {
            duplicates.push(a);
        }
    });
    return duplicates;
}

/**
 * Algo
 */

const formattedDataset = dataSet.map(line => {
    const headlessLine = stripHeader(line);
    return headlessLine
});

const globalObject = formattedDataset.map((line, index) => {
    return {
        index: index + 1,
        repeat: 1,
        data: getWinnings(getNumbers(line)),
    }
});

globalObject.map((line, index) => {
    for (let j = 0; j < line.repeat; j++) {
        if (line.data.length > 0) {
            for (let i = 1; i <= line.data.length; i++) {
                if (globalObject[index + i].data.length >= 0) {
                    globalObject[index + i].repeat++;
                }
            }
        }
    }
});

console.log(globalObject.reduce((acc, v,) => Number(acc + v.repeat), 0));
