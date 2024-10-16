import { loadProgram } from "./src/loader.mjs";
import { parseProgram } from "./src/parser.mjs";
//import { runProgram } from "./src/runner.mjs"; //OLD
import { runProgram } from "./src/cleanRunner.mjs";

async function main() {
	//const fileName = './test/example.biesVM'; 
	//const fileName = "./test/nivel4.biesVM";
	const fileName = [
		//"./test/nivel1.biesVM",
		//"./test/nivel2.biesVM",
		//"./test/nivel3.biesVM",
		//"./test/Casos/fibonacciIterativo.biesVM",
		//"./test/Casos/mayor.biesVM",
		//"./test/Casos/testInput.biesVM"
		"./test/Casos/factorialIterativo.biesVM",

	];

	fileName.forEach((element) => {
		console.log("Nivel: ", element);
		try {
			const programCode = loadProgram(element); 
			const parsedProgram = parseProgram(programCode); 
			runProgram(parsedProgram);
		} catch (error) {
			console.error("Error en la ejecución del programa:", error);
		}
		console.log("\n");
	});
}

main();
