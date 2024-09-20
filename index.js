import { loadProgram } from "./src/loader.mjs"; 
import { parseProgram } from "./src/parser.mjs"; 
//import { runProgram } from "./src/runner.mjs"; //OLD
import { runProgram } from "./src/cleanRunner.mjs"; 

async function main() {
  //const fileName = './test/example.biesVM'; 
  //const fileName = "./test/nivel4.biesVM";
  const fileName = [
    "./test/nivel1.biesVM",
    "./test/nivel2.biesVM",
    "./test/nivel3.biesVM",
    "./test/nivel4.biesVM",
  ]; 

  fileName.forEach((element) => {
    console.log("Nivel: ", element);
    try {
      const programCode = loadProgram(element); // Cargar el código del programa
      const parsedProgram = parseProgram(programCode); // Parsear el código
      runProgram(parsedProgram); // Ejecutar el programa
    } catch (error) {
      console.error("Error en la ejecución del programa:", error);
    }
    console.log("\n");
  });
}

main();
