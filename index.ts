import { readFile } from 'node:fs/promises'

// oneight ?
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
	...[1,2,3,4,5,6,7,8,9],
	...VALID_NUMBERS
]

console.log({VALID_INPUTS})
const makeMap = () => {
	let map: Record<string, number> = {};
	VALID_NUMBERS.forEach((number, index) => {
		map[number] = index + 1;
	})

	return map;
}

const makeRegex = () => {
	const numbersInReg = Object.values(VALID_NUMBERS).map((validNumber) => {
		return `(${validNumber.toString()})`;
	}, "").join("|");
	console.log(numbersInReg, "numbersInReg")
	return new RegExp(`(?=(${numbersInReg}|\\\d))`, "g");
}

async function main() {
	const input = await readFile("./input.txt", {encoding: "utf-8"});
	const numberMap = makeMap();
	
	// const reg = makeRegex();
	const reg = new RegExp("(?=(one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9))", "g");
	let count = 0;

	const items = input.split(/\r?\n|\r|\n/g);
	  const found = items.reduce((prev, item) => {

	   const matches = [...item.matchAll(reg)].map((match) => {
		console.log(match, "match")
		return {
			found: match[1],
			start: match.index,
			end: (match.index || 0) + match[1].length,
			input: match.input
		}
	   });

	   const separateMatches = [...matches.map((match) => ({
		pos: match.start,
		value: match.found,
		input: match.input
	   })), ...matches.map((match) => ({
		pos: match.end,
		value: match.found,
		input: match.input
	   }))]

	   const sortedMatches = separateMatches.sort(({pos: a = 0}, {pos: b = 0}) => {
			return a > b ? 1 : -1;
		});
		
	   console.log(sortedMatches, "sortedMatches");
	   const firstElement = sortedMatches[0];
	   console.log(firstElement, "firstElement");
	   const small = firstElement.value;
	   const large = sortedMatches.pop()?.value || small;
	   const first = numberMap[small] || +small;
	   const last = numberMap[large] || +large;
	   console.log(`smallest: ${first}`);
	   console.log(`largest: ${last}`);
	   const stringSum = `${first}${last}`;
	   console.log(`stringSum: ${stringSum}`);
	   const sum = +stringSum;
	   console.log(sum, "sum")
	   const newTotal = prev + sum;
	   console.log(`new total: ${newTotal}`);
	   count++;
	   return newTotal;
	// return 0;
	}, 0)

	return [found, count];
}

main().then(([result, count]) => {
	console.log({result});
	console.log({count})
	const reg = makeRegex();
	console.log({reg})
});