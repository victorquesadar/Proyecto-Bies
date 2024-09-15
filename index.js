import { loadProgram } from './src/loader.mjs';
import { parseProgram } from './src/parser.mjs';
import { runProgram } from './src/runner.mjs';

// Cargar el programa (archivo biesVM)
const programCode = loadProgram('./test/add.biesVM');

// Parsear el programa cargado
const parsedProgram = parseProgram(programCode);

// Ejecutar el programa parseado
runProgram(parsedProgram);
