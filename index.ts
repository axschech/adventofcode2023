import { readFile } from 'node:fs/promises'

const structureTotals = (tries: string) => {
	const splitTries = tries.split(";");
	const stuff = splitTries.map((aTry) => {
		return aTry.split(",").map((almost) => {
			const lastSplit = almost.split(" ");
			const num = +(lastSplit.at(1) || 0);
			const type = lastSplit.pop() || "";

			return { [type]: num };
		})
	});

	return stuff;
}

const calculateTotals = (totals: Record<string, number>[][] | Record<string, number>[]) => {
	totals.forEach(total => {
		console.log({ total })
	})
}

async function main() {
	const input = await readFile("./input.txt", { encoding: "utf-8" });
	const games = input.split("\n");
	const totals = games.reduce((prev: Record<string, string>, game) => {
		const splitGame = game.split(":");
		const key = splitGame.shift() || "no key";
		const tries = splitGame.pop() || "";

		const structuredTotals = structureTotals(tries);
		const realTotals = calculateTotals(structuredTotals);
		// console.log({ realTotals })
		prev[key] = tries;

		return prev;
	}, {})

	return totals;
}

main().then((result) => {
	console.log(result);
});