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

const makeMap = () => {
    return VALID_NUMBERS.map((number, index) => {
        return {
            [number]: index + 1
        }
    })
}

const makeRegex = () => {
    const numbersInReg = Object.values(VALID_NUMBERS).join("|");
    
    return new RegExp(`([\s\S]*?)(?!${numbersInReg})`, "g");
}

async function main() {
    const input = await readFile("./input.txt", {encoding: "utf-8"});
    const numberMap = makeMap();
    
    const reg = makeRegex();

    // console.log(reg);
    const items = input.split(/\r?\n|\r|\n/g);

    const found = items.reduce((prev, item) => {
        const numbers = item.replaceAll(reg, "");
        console.log(numbers)
        return prev + (+`${numbers.at(0)}${numbers.at(numbers.length -1)}`);
    }, 0)

    return found;
}

main().then(result => {
    console.log(result);
});