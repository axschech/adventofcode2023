import { readFile } from 'node:fs/promises'

const structureTotals = (tries: string) => {
	const splitTries = tries.split(";");
	const record: Record<string, number> = {};

	splitTries.forEach((aTry) => {
		aTry.split(",").forEach((almost) => {
			const lastSplit = almost.split(" ");
			const num = +(lastSplit.at(1) || 0);
			const type = lastSplit.pop() || "";
			if (!record[type]) {
				record[type] = num;
				return;
			}

			record[type] += num;
		})
	});
	console.log(record, "record")
	// console.log(stuff, "stuff")
	return record;
}

const calculateTotals = (totals: Record<string, number>[][]) => {
	let record: Record<string, number> = {};

	totals.forEach(total => {
		console.log(Object.values(totals), "totals keys")
	})
}

const calculateTotal = (total: Record<string, number>[]) => {
	let calc = {};
	total.forEach((total) => {
		console.log(Object.keys(total), "keys")
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
		// console.log(structuredTotals, "structuredTotals")
		// const realTotals = calculateTotals(structuredTotals);
		// console.log({ realTotals })
		prev[key] = tries;

		return prev;
	}, {})

	return totals;
}

main().then((result) => {
	console.log(result);
});