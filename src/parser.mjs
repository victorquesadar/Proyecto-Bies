// Asumiendo que tienes un parser generado por ANTLR
import antlr4 from "antlr4";
import biesASMParser from "./parser/biesASMParser.js";
import biesASMLexer from "./parser/biesASMLexer.js";
import biesASMVisitor from "./parser/biesASMVisitor.js";

/**
 * Parse the provided program code into a structured format.
 * @param {string} programCode - The code of the program to parse.
 * @returns {{ instructions: Array }} An object containing an array of parsed instructions.
 * @throws {Error} Throws an error if the parsing fails.
 */

export function parseProgram(programCode) {
	const input = new antlr4.InputStream(programCode);
	const lexer = new biesASMLexer(input);
	const tokens = new antlr4.CommonTokenStream(lexer);
	const parser = new biesASMParser(tokens);

	const tree = parser.program(); // Llamada al parser que genera el árbol

	const parsedProgram = {
		instructions: [],
	};


	// Recorremos los hijos del árbol
	tree.children.forEach((child) => {

		if (child instanceof biesASMParser.InstructionContext) {
			parsedProgram.instructions.push(child);
		} else if (child instanceof biesASMParser.FrameContext) {
			parsedProgram.instructions.push(child);
			child.children.forEach((funcChild) => {
				if (
					funcChild instanceof biesASMParser.InstructionContext ||
					funcChild instanceof biesASMParser.FrameContext ||
					funcChild instanceof biesASMParser.EndFrameContext
				) {
					parsedProgram.instructions.push(funcChild);
				}
			});
		} else {
			console.warn(`Unexpected child type: ${child.constructor.name}`);
		}
	});



	return parsedProgram;
}
