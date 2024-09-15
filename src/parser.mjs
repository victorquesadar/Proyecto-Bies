// Asumiendo que tienes un parser generado por ANTLR
import antlr4 from 'antlr4';
import biesASMParser from './parser/biesASMParser.js';

export function parseProgram(programCode) {
  // Aquí iría la lógica del parser usando antlr4 y el archivo biesASMParser
  const parsedProgram = {
    instructions: programCode.split('\n').map(line => line.trim()) // Ejemplo básico
  };
  return parsedProgram;
}
