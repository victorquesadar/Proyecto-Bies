let stack = []; // Pila para almacenar valores

function runProgram(parsedProgram) {
	console.log("Running program...");
	let accumulator = 0;
	const frames = [{}]; // Inicializar con un frame vacío
	let returnAddress = null; // Inicializar la dirección de retorno
	//let skiper = 0;

	logic(parsedProgram.instructions);

	function executeFunction(funcIndex) {
		const functionInstructions = parsedProgram.instructions
			.slice(funcIndex + 1)
			.filter((inst) => {
				const command = inst.children[0]?.getText();
				return command !== "$END"; // Incluir todas las instrucciones hasta $END
			});

		logic(functionInstructions);
	}

	function logic(instructions) {
		for (let i = 0; i < instructions.length; i++) {
			const inst = instructions[i];
			//instructions.forEach((inst) => {
			if (inst.children && inst.children.length > 0) {
				let command = inst.children[0].getText(); // Obtener el comando
				const args = inst.children.slice(1).map((arg) => arg.getText()); // Obtener argumentos

				if (command.startsWith("$FUN")) {
					command = "$FUN";
				}


				switch (command) {
					case "LDV":
						console.log(`Loading value: ${args[0]}`);
						accumulator = parseInt(args[0], 10);
						stack.push(accumulator);
						break;
					case "BST":
						const frameIndex = parseInt(args[0], 10);
						const variableIndex = parseInt(args[1], 10);
						if (!frames[frameIndex]) {
							frames[frameIndex] = {};
						}
						frames[frameIndex][variableIndex] = accumulator;
						console.log(
							`Storing ${accumulator} in frame ${frameIndex}, variable ${variableIndex}`
						);
						break;
					case "BLD":
						const loadFrameIndex = parseInt(args[0], 10);
						const loadVariableIndex = parseInt(args[1], 10);

						accumulator =
							(frames[loadFrameIndex] &&
								frames[loadFrameIndex][loadVariableIndex]) ||
							0;
						stack.push(accumulator);
						console.log(
							`Loading value from frame ${loadFrameIndex}, variable ${loadVariableIndex}: ${accumulator}`
						);
						break;
					case "ADD":
						if (stack.length < 2) {
							console.error("Not enough values in stack for ADD operation.");
							return;
						}
						const value1 = stack.pop();
						const value2 = stack.pop();
						accumulator = value1 + value2;
						stack.push(accumulator);
						console.log(`Accumulator after ADD: ${accumulator}`);
						break;
					case "SUB":
						if (stack.length < 2) {
							console.error("Not enough values in stack for SUB operation.");
							return;
						}
						const subValue1 = stack.pop();
						const subValue2 = stack.pop();
						accumulator = subValue2 - subValue1;
						stack.push(accumulator);
						console.log(`Accumulator after SUB: ${accumulator}`);
						break;
					case "MUL":
						if (stack.length < 2) {
							console.error("Not enough values in stack for MUL operation.");
							return;
						}
						const mulValue1 = stack.pop();
						const mulValue2 = stack.pop();
						accumulator = mulValue1 * mulValue2;
						stack.push(accumulator);
						console.log(`Accumulator after MUL: ${accumulator}`);
						break;
					case "DIV":
						if (stack.length < 2) {
							console.error("Not enough values in stack for DIV operation.");
							return;
						}
						const divValue1 = stack.pop();
						const divValue2 = stack.pop();
						if (divValue1 === 0) {
							console.error("Division by zero error.");
							return;
						}
						accumulator = divValue2 / divValue1;
						stack.push(accumulator);
						console.log(`Accumulator after DIV: ${accumulator}`);
						break;

					case "$FUN": //para ignorar el cuerpo de la funcion si no se llama
						let funcStartIndex = parsedProgram.instructions.indexOf(inst);
						let funcParent = parsedProgram.instructions[funcStartIndex];

						i += funcParent.children.length - 1; // Cambia esto al contexto que estés analizando
						console.log(`Skiping ${funcParent.children[0]} to index ${i}`);

						break;

					case "LDF":
						const label = args[0]; // Obtener la etiqueta o nombre de la función
						const startFuncIndex = parsedProgram.instructions.findIndex(
							(instruction) => {
								return (
									instruction.children[0].getText() === "$FUN " + label // && // Cambia a "FUN"
								);
							}
						);

						if (startFuncIndex !== -1) {
							const endFunctionIndex = parsedProgram.instructions.findIndex(
								(instruction, idx) =>
									idx > startFuncIndex &&
									instruction.children[0].getText() === "$END " + label
							);
						}
						if (startFuncIndex !== -1) {
							console.log(`Loading function at index ${startFuncIndex}`);
							stack.push(startFuncIndex); // Almacenar el índice de la función en la pila
							accumulator = startFuncIndex; // Almacenar el índice de la función en el acumulador
						} else {
							console.error(`Label or function ${label} not found.`);
						}
						break;
						
					case "LNT": 
						if (stack.length === 0) {
							console.error("No list on stack for LNT operation.");
							return;
						}
						const listForLNT = stack.pop();
						if (Array.isArray(listForLNT)) {
							accumulator = listForLNT.length === 0 ? 1 : 0; // Retorna 1 si está vacía, 0 si no
						} else {
							console.error("Top of stack is not a list.");
						}
						stack.push(accumulator);
						console.log(`LNT result: ${accumulator}`);
						break;

					case "LIN":
						if (stack.length < 2) {
							console.error("Not enough values on stack for LIN operation.");
							return;
						}
						const element = stack.pop();
						const listForLIN = stack.pop();
						if (Array.isArray(listForLIN)) {
							listForLIN.unshift(element); // Inserta el elemento al inicio de la lista
							stack.push(listForLIN);
							console.log(`List after LIN: ${listForLIN}`);
						} else {
							console.error("Top of stack is not a list.");
						}
						break;

					case "LTK":
						if (stack.length < 2) {
							console.error("Not enough values on stack for LTK operation.");
							return;
						}
						const k = stack.pop();
						const listForLTK = stack.pop();
						if (Array.isArray(listForLTK) && Number.isInteger(k) && k >= 0 && k < listForLTK.length) {
							accumulator = listForLTK[k];
							stack.push(accumulator);
							console.log(`LTK result: ${accumulator}`);
						} else {
							console.error("Invalid list or index for LTK operation.");
						}
						break;

					case "LRK":
						if (stack.length < 2) {
							console.error("Not enough values on stack for LRK operation.");
							return;
						}
						const index = stack.pop();
						const listForLRK = stack.pop();
						if (Array.isArray(listForLRK) && Number.isInteger(index) && index >= 0 && index <= listForLRK.length) {
							const restOfList = listForLRK.slice(index);
							stack.push(restOfList);
							console.log(`LRK result: ${restOfList}`);
						} else {
							console.error("Invalid list or index for LRK operation.");
						}
						break;

					case "TOL":
						if (stack.length === 0) {
							console.error("No values on stack for TOL operation.");
							return;
						}
						const tolValue = stack.pop();
						const tolList = Array.isArray(tolValue) ? tolValue : [tolValue];
						stack.push(tolList);
						console.log(`TOL result: ${tolList}`);
						break;


					case "APP":
						if (stack.length === 0) {
							console.error("No function index on the stack.");
							return;
						}
						const functionIndex = stack[stack.length - 2]; // Sacar el índice de la función

						// Verificar que el índice esté en un rango válido
						if (
							functionIndex < 0 ||
							functionIndex >= parsedProgram.instructions.length
						) {
							console.error(`Invalid function index: ${functionIndex}`);
							return;
						}

						returnAddress = parsedProgram.instructions.indexOf(inst) + 1; // Guardar la dirección de retorno
						frames.unshift({}); // Crear un nuevo frame para la función
						console.log(`Applying function at index ${functionIndex}`);
						executeFunction(functionIndex); // Ejecutar la función
						break;

					case "RET":
						console.log("Returning from function");
						if (frames.length > 1) {
							frames.shift(); // Sacar el frame de la función

							if (returnAddress !== null) {
								console.log(`Returning to instruction at index ${returnAddress}`);
								i = returnAddress - 1; // Saltar a la dirección de retorno
								returnAddress = null; // Resetear la dirección de retorno
							}
						} else {
							console.error("Cannot return from main program frame.");
						}
						break;

					case "PRN":
						stack.pop();
						console.log(`Printing value: ${accumulator}`);
						break;
					case "HLT":
						console.log("Halting program.");
						return;
					case "SKIP":
						return;

					default:
						console.log(`Unknown instruction: ${command}`);
				}
			} else {
				console.log("Instruction does not have children:", inst);
			}
		};
	}
}

export { runProgram };
