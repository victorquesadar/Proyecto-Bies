let stack = []; // Pila para almacenar valores
let accumulator = 0;
const frames = [{}]; // Inicializar con un frame vacío
let returnAddress = null; // Inicializar la dirección de retorno
let actualFrame = 0;

function runProgram(parsedProgram) {
	console.log("Running program...");

	const instructionHandlers = {
		'LDV': (args) => loadValue(args[0]),
		'BST': (args) => storeInFrame(args[0], args[1]),
		'BLD': (args) => loadFromFrame(args[0], args[1]),
		'ADD': () => binaryOperation((a, b) => a + b, 'ADD'),
		'SUB': () => binaryOperation((a, b) => b - a, 'SUB'),
		'MUL': () => binaryOperation((a, b) => a * b, 'MUL'),
		'DIV': () => binaryOperation((a, b) => a / b, 'DIV', true),
		'PRN': () => printValue(),
		'HLT': () => haltProgram(),
		'RET': () => returnFromFunction(),
		'LDF': (args) => loadFunction(args[0]),
		'APP': (args, inst, idx) => applyFunction(args, idx),
		'$FUN': (args, inst, idx) => skipFunctionBody(inst, idx),
		"$END ": (args, inst, idx) => endOfFrame(args, inst, idx)
	};

	logic(parsedProgram.instructions);

	function loadValue(args) {
		console.log(`Loading value: ${args}`);
		accumulator = parseInt(args, 10);
		stack.push(accumulator);
	}

	function storeInFrame(frameIdx, varIdx) {
		const fIndex = parseInt(frameIdx, 10);
		const vIndex = parseInt(varIdx, 10);
		frames[fIndex] = frames[fIndex] || {};
		frames[fIndex][vIndex] = accumulator;
		console.log(`Stored ${accumulator} in frame ${fIndex}, variable ${vIndex}`);
	}

	function loadFromFrame(frameIdx, varIdx) {
		const fIndex = parseInt(frameIdx, 10);
		const vIndex = parseInt(varIdx, 10);
		accumulator = frames[fIndex]?.[vIndex] ?? 0;
		stack.push(accumulator);
		console.log(`Loaded ${accumulator} from frame ${fIndex}, variable ${vIndex}: ${accumulator}`);
	}

	function binaryOperation(operation, opName, checkZero = false) {
		if (stack.length < 2) return console.error(`Not enough values for ${opName}`);
		const val1 = stack.pop(), val2 = stack.pop();
		if (checkZero && val2 === 0) return console.error(`Division by zero in ${opName}`);
		accumulator = operation(val1, val2);
		stack.push(accumulator);
		console.log(`${opName} result: ${accumulator}`);
	}

	function printValue() {
		const value = stack.pop();
		console.log(`Printing: ${value}`);
	}

	function haltProgram() {
		console.log("Halting program.");
		return;
	}

	function loadFunction(label) {
		const index = findInstructionIndex(`$FUN ${label}`);
		if (index !== -1) {
			console.log(`Loaded function ${label} at index ${index}`);
			stack.push({ index, label });
			accumulator = index;
		} else {
			console.error(`Function ${label} not found`);
		}
	}
	function endOfFrame(args, inst, idx) {
		flag = true;
		console.log("End of frame.");
		return returnFromFunction();
	}

	function applyFunction(args, idx) {
		if (stack.length === 0) return console.error("No function index on the stack.");
		const funcIndex = stack.find((item) => item.label == args).index;

		returnAddress = idx;
		frames.unshift({});
		console.log(`Applying function at index ${funcIndex}`);
		executeFunction(funcIndex);
	}

	function executeFunction(funcIndex) {
		const functionInstructions = parsedProgram.instructions
			.slice(funcIndex + 1)
			.filter((inst) => {
				const command = inst.children[0]?.getText();
				return command !== "$END"; // Incluir todas las instrucciones hasta $END
			});

		logic(functionInstructions);
	}

	function findInstructionIndex(label) {
		return parsedProgram.instructions.findIndex(inst => inst.children[0].getText() === label);
	}

	function returnFromFunction() {
		if (frames.length > 1) {
			frames.shift();
			if (returnAddress !== null) {
				console.log(`Returning to instruction ${returnAddress}`);
				return returnAddress;
			}
		} else {
			console.error("Cannot return from main program frame.");
		}
	}

	function skipFunctionBody(inst, idx) {
		const startFuncIndex = parsedProgram.instructions.indexOf(inst);
		const funcParent = parsedProgram.instructions[startFuncIndex];
		idx += funcParent.children.length - 1;
		console.log(`Skipping function body to index ${idx}`);
		return idx;
	}
	function logic(instructions) {
		for (let i = 0; i < instructions.length; i++) {
			const inst = instructions[i];
			if (inst.children && inst.children.length > 0) {
				let command = inst.children[0].getText();
				const args = inst.children.slice(1).map(arg => arg.getText());

				if (command.startsWith("$FUN")) command = "$FUN";
				const handler = instructionHandlers[command];
				if (handler) {
					const result = handler(args, inst, i);
					if (Number.isInteger(result)) { i = result; }

				} else console.error(`Unknown instruction: ${command}`);

			} else {
				console.warn("Instruction does not have children:", inst);
			}
		}
	}

}
export { runProgram };
