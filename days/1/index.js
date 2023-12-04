import fs from "fs";

const regex = /\d/g;

const arrayWords = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine'
];

const wordToDigit = (word) => {
    return "" + (arrayWords.indexOf(word) + 1);
}

let total = 0;

try {
    const data = fs.readFileSync('./inputs.txt', 'utf8');
    const lines = data.split('\r\n');

    lines.map((line) => {
        let allMaches = [];

        const matches = Array.from(line.matchAll(regex));

        matches.map(m => {
            allMaches.push({
                index: m.index,
                str: m[0]
            });
        });

        arrayWords.map(word => {
            const result = Array.from(line.matchAll(`(${word})`));
            if (result.length <= 0) {
                // TODO rien
            } else if (result.length === 1) {
                allMaches.push({
                    index: result[0].index,
                    str: wordToDigit(result[0][0])
                })
            } else {
                allMaches.push({
                    index: result[0].index,
                    str: wordToDigit(result[0][0])
                })
                allMaches.push({
                    index: result[result.length - 1].index,
                    str: wordToDigit(result[result.length - 1][0])
                })
            }
        })

        allMaches.sort((a, b) => a.index - b.index);

        if (allMaches.length === 0) {
            total += 0;
        } else if (allMaches.length === 1) {
            total = total + Number(allMaches[0].str + allMaches[0].str);
        } else {
            total = total + Number(allMaches[0].str + allMaches[allMaches.length - 1].str);
        }
    });

} catch (err) {
    console.error(err);
}
