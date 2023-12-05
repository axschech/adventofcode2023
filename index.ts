import { readFile } from 'node:fs/promises'


const VALID_NUMBERS = [
    "one", 
    "two", 
    "three", 
    "four", 
    "five", 
    "six", 
    "seven",
    "eight",
    "nine"
];

const VALID_INPUTS = [
    ...Array.from(Array(10).keys()),
    ...VALID_NUMBERS
]

console.log({VALID_INPUTS})
const makeMap = () => {
    return VALID_NUMBERS.map((number, index) => {
        return {
            [number]: index + 1
        }
    })
}

const makeRegex = () => {
    const numbersInReg = Object.values(VALID_NUMBERS).join("|");
    
    return new RegExp(`(${numbersInReg}|\\\d)`, "g");
}

async function main() {
    const input = await readFile("./input.txt", {encoding: "utf-8"});
    const numberMap = makeMap();
    
    const reg = makeRegex();

    console.log(reg);
    const items = input.split(/\r?\n|\r|\n/g);
      const found = items.reduce((prev, item) => {

       const matches = [...item.matchAll(reg)].map((match) => {
        return {
            found: match[0],
            start: match.index,
            end: (match.index || 0) + match[0].length,
            input: match.input
        }
       }).sort((a, b) => {
            const start = a.start || a.end;
            const end = b.start || b.end;
            return start > end ? 1 : -1;
       });
       console.log(matches, "matches");
       return prev;
    }, 0)

    return found;
}

main().then(result => {
    console.log(result);
});