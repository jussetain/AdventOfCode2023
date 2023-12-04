import fs from "fs";

const readFile = (file) => {
    try {
        const data = fs.readFileSync(file, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
}

const readLines = (file) => {
    try {
        const data = fs.readFileSync(file, 'utf8');
        const lines = data.split('\r\n').filter(l => l.length > 0);
        return lines;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export {
    readFile,
    readLines
};
