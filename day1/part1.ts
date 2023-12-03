import { readFile } from 'node:fs/promises'

async function main() {
    const input = await readFile("./input.txt", {encoding: "utf-8"});

    const items = input.split(/\r?\n|\r|\n/g);

    const found = items.reduce((prev, item) => {
        const numbers = item.replace(/\D+/g, "");
        
        return prev + (+`${numbers.at(0)}${numbers.at(numbers.length -1)}`);
    }, 0)

    console.log(found)
}

main();