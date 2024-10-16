import readline from 'readline';

let stack = []; // Pila para almacenar valores
let accumulator = 0;
const frames = [{}]; // Inicializar con un frame vacío
let returnAddress = null; // Inicializar la dirección de retorno
let actualFrame = 0;
let lists = [];

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
		'LIN': () => insertInList(), // Instrucción para insertar en lista
		'LNT': () => listNullTest(),  // Instrucción para obtener longitud de lista
		'LTK': () => takeFromList(),    // Instrucción para tomar de lista
		'LRK': () => getListFromIndex(),   // Instrucción para eliminar de lista
		'TOL': () => topOfList(),  
		'APP': (args, inst, idx) => applyFunction(args, idx),
		'$FUN': (args, inst, idx) => skipFunctionBody(inst, idx),
		"$END ": (args, inst, idx) => endOfFrame(args, inst, idx),
		"EQ": () => compareOperation((a,b)=>a==b, "=="),
		"GT": () => compareOperation((a,b)=>a>b, ">"),
		"GTE": () => compareOperation((a,b)=>a>=b, ">="),
		"LT": () => compareOperation((a,b)=>a<b, "<"),
		"LTE": () => compareOperation((a,b)=>a<=b, "<="),
		"BT": (args, inst, idx) => conditionalBranch(args[0], idx, true), //Branch on True
		"BF": (args, inst, idx) => conditionalBranch(args[0], idx, false), //Branch on False
		"BR": (args, inst, idx) => branch(args[0], idx), //Branch Relative
		"INP": () => consoleInput()
	};

	logic(parsedProgram.instructions);

	function loadValue(args) {
		console.log(`Loading value: ${args}`);
		accumulator = parseInt(args, 10);
		stack.push(accumulator);
	}
	function input() {
		return new Promise((resolve) => {

		  process.stdin.resume();
		  process.stdin.setEncoding('utf8');
	  
		  console.log('Escribe algo: ');
	  
		  process.stdin.on('data', (input) => {
			const entrada = input.trim();
			resolve(entrada); 
			process.stdin.pause(); 
		  });
		});
	  }
	async function consoleInput(){
		const entrada = await input();
		console.log(`Input: ${entrada}`);
	}

	function storeInFrame(frameIdx, varIdx) {
		const fIndex = parseInt(frameIdx, 10);
		const vIndex = parseInt(varIdx, 10);
		frames[fIndex] = frames[fIndex] || {};
		frames[fIndex][vIndex] = accumulator;
		console.log(`Stored ${accumulator} in frame ${fIndex}, variable ${vIndex}`);
	}
	function conditionalBranch(args, idx, bool) {
		const condition = stack.pop();
		if(bool && condition) idx += +args;
		else if(!bool && !condition) idx += +args;
		console.log(`Branch Relative to ${idx}`);
		return idx;
	}
	function branch(args, idx) {
		idx += +args;
		console.log(`Branch jump to ${idx}`);
		return idx;
	}

	function loadFromFrame(frameIdx, varIdx) {
		const fIndex = parseInt(frameIdx, 10);
		const vIndex = parseInt(varIdx, 10);
		accumulator = frames[fIndex]?.[vIndex] ?? 0;
		stack.push(accumulator);
		console.log(`Loaded ${accumulator} from frame ${fIndex}, variable ${vIndex}: ${accumulator}`);
	}
	function compareOperation(operation, opName) {
		if (stack.length < 2) return console.error(`Not enough values for ${opName}`);
		const val1 = stack.pop(), val2 = stack.pop();
		let result = operation(val1, val2);
		stack.push(+result);
		console.log(`${val1} ${opName} ${val2} = ${result}`);

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
				//stack.push(accumulator);
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
function loadList(label) {
    const list = lists[label]; // Obtener la lista desde 'lists'

    if (Array.isArray(list)) {
        // Cargar la lista en la parte superior del stack
        stack.unshift(list); 
        console.log(`List loaded onto stack:`, list);
        return list; // Retornar la lista
    } else {
        console.log(`List '${label}' not loaded because it is empty or undefined.`);
        return null; // Retornar null si no se carga
    }
}








function pushToStack(value) {
    stack.push(value); // Agrega el valor al stack
    console.log(`Pushed to stack: ${value}`);
}

function popFromStack() {
    if (stack.length === 0) {
        console.error("Stack is empty. Cannot pop.");
        return null; // Retorna null si no hay elementos en el stack
    }
    const value = stack.pop(); // Saca el valor de la pila
    console.log(`Popped from stack: ${value}`);
    return value;
}

function createList() {
    const newList = []; // Crea una nueva lista vacía
    lists.push(newList); // Agrega la nueva lista a la colección lists
    stack.push(newList); // También la agrega al stack para operaciones
    console.log("Created a new list on the top of the stack.");
}

function listNullTest() {
    if (stack.length === 0) {
        console.error("Stack is empty. Cannot perform LNT operation.");
        return;
    }

    const list = stack[stack.length - 1]; // Acceder a la lista en el tope de la pila sin eliminarla
    if (!Array.isArray(list)) {
        console.error("Top of stack is not a list for LNT operation.");
        return;
    }

    const isEmpty = list.length === 0; // Verifica si la lista está vacía
    const T = isEmpty ? 1 : 0; // T es 1 si la lista está vacía, 0 si no

    if (isEmpty) {
        console.log("The list is empty.");
    } else {
        console.log("The list is not empty.");
    }

    console.log(`List: ${list}`);
    
    stack.push(T); // Vuelve a empujar el valor T en la pila
    console.log(`Value pushed onto stack: ${T}`);
	
}

function insertInList(label) {
    console.log("Stack before LIN operation:", stack);

    // Verificamos si hay suficientes elementos en el stack
    if (stack.length < 2) {
        console.error("Not enough elements on the stack for LIN operation.");
        return;
    }

    const value = stack.pop(); // Obtenemos el valor a insertar
    const list = loadList(label); // Intentamos cargar la lista

    if (!list) {
        console.error("Failed to load the list, aborting LIN operation.");
        stack.push(value); // Regresamos el valor al stack
        return;
    }

    // Insertamos el valor en la lista cargada al principio
    list.unshift(value); // Agregar el valor al inicio de la lista existente

    // Limpiar el stack
    stack.splice(0, stack.length);
    
    console.log("Inserted into list:", list);
    stack.push(list); // Regresar la lista al stack

    console.log("Stack after LIN operation:", stack);
}







function topOfList(label) {

    const list = loadList(label); // Cargar la lista

    console.log("Stack before TOL operation:", stack);

    if (stack.length === 0) {
        console.error("Stack is empty, cannot perform TOL operation.");
        return;
    }

    const topValue = stack.pop(); // Sacamos el valor de la parte superior del stack

    // Verificamos si el topValue es una lista
    if (Array.isArray(topValue)) {
        console.log(`Top value is a list. Pushing it back.`);
        stack.push(topValue); // Regresamos la lista al stack
    } else {
        console.log(`Top value is not a list. Pushing it back as a new list.`);
        const newList = [topValue]; // Creamos una nueva lista solo si es necesario
        stack.push(newList);
        lists[label] = newList; // Esto debería evitarse si se quiere mantener la lista original
    }

    console.log("Stack after TOL operation:", stack);
    return stack[stack.length - 1]; // Retornamos la lista en la parte superior del stack
	stack.splice(0,stack.length);
	
}






function showStack() {
    console.log("Current stack:", JSON.stringify(stack));
}

function insertIntoList(value) {
    console.log("Stack before inserting into list:", stack);
    if (stack.length === 0 || !Array.isArray(stack[stack.length - 1])) {
        stack.push([]); // Crear nueva lista si no existe
    }

    const list = stack.pop(); // Saca la lista existente
    list.unshift(value); // Inserta al inicio de la lista
    console.log(`Inserted ${value} into list: ${list}`);
    // No es necesario volver a poner la lista en el stack
}

function takeFromList() {
    showStack();
    if (stack.length < 2) {
        console.error("Not enough elements on the stack for LTK operation.");
        return;
    }

    const index = popFromStack(); // Saca el índice
    const list = popFromStack(); // Saca la lista

    if (!Array.isArray(list)) {
        console.error("Top of stack is not a list for LTK operation.");
        stack.push(list); // Vuelve a empujar la lista
        stack.push(index); // Vuelve a empujar el índice
        return;
    }

    if (index < 0 || index >= list.length) {
        console.error("Index out of bounds for the list.");
        stack.push(list); // Vuelve a empujar la lista
        stack.push(index); // Vuelve a empujar el índice
        return;
    }

    const value = list[index]; // Toma el valor del índice
    console.log(`Value taken from list: ${value}`);

    // Empuja solo el valor a la pila
    stack.push(value); // Devuelve solo el valor extraído a la pila
    showStack(); // Mostrar estado de la pila después de tomar un valor
	
}

function getListFromIndex(label) {
    // Cargar la lista usando la función loadList
    const list = loadList(label);
    console.log("Stack before LRK operation:", stack);

    // Verificamos que haya suficientes elementos en la pila
    if (stack.length < 2) {
        console.error("Not enough elements on the stack for LRK operation.");
        return;
    }

    const index = popFromStack(); // Saca el índice
    const topValue = popFromStack(); // Saca el valor de la parte superior del stack

    // Verificamos si el topValue es una lista
    if (!Array.isArray(topValue)) {
        console.error("Top of stack is not a list for LRK operation.");
        stack.push(topValue); // Vuelve a empujar el topValue
        stack.push(index); // Vuelve a empujar el índice
        return;
    }

    // Verificamos que el índice esté dentro de los límites de la lista
    if (index < 0 || index >= topValue.length) {
        console.error(`Index out of bounds for the list. Valid index range is 0 to ${topValue.length - 1}.`);
        stack.push(topValue); // Vuelve a empujar la lista
        stack.push(index); // Vuelve a empujar el índice
        return;
    }

    // Cargamos la lista de nuevo a la pila antes de aplicar el slice
    stack.push(topValue);
    console.log(`List loaded onto stack:`, topValue);

    // Obtiene el resto de la lista a partir del índice especificado
    const slicedList = topValue.slice(index); // Toma el resto de la lista a partir del índice
    console.log(`Rest of the list after index ${index}: ${slicedList}`);
	stack.splice(0,stack.length);
    stack.push(slicedList); // Devuelve el resto de la lista a la pila
    showStack(); // Mostrar estado de la pila después de la operación

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
