import { loadProgram } from "./src/loader.mjs";
import { parseProgram } from "./src/parser.mjs";
import { runProgram } from "./src/cleanRunner.mjs";

async function main(fileName) {
  console.log("Ejecutando el archivo:", fileName);
  try {

    const programCode = loadProgram(fileName); 

    const parsedProgram = parseProgram(programCode); 

    await runProgram(parsedProgram); 
  } catch (error) {
    console.error("Error en la ejecución del programa:", error);
  }
}


const args = process.argv.slice(2);

if (args.length < 1) {
  console.error("Por favor, proporciona el nombre del archivo a ejecutar.");
  process.exit(1); 
}

const fileName = args[0]; // Primer argumento: nombre del archivo
//const fileName = "mayor";
// Llama a la función principal
main("./test/Casos/"+fileName+".biesVM");
