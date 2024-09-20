import fs from 'fs';

/**
 * Load the program code from a file.
 * @param {string} fileName - The path to the file containing the program code.
 * @returns {string} The content of the program file.
 * @throws {Error} Throws an error if the file cannot be read.
 */

export function loadProgram(fileName) {
  try {
    const programCode = fs.readFileSync(fileName, 'utf-8');
    return programCode;
  } catch (err) {
    console.error(`Error loading program from file ${fileName}:`, err);
    throw err;
  }
}
