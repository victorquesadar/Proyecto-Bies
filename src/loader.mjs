import fs from 'fs';

export function loadProgram(fileName) {
  try {
    const programCode = fs.readFileSync(fileName, 'utf-8');
    return programCode;
  } catch (err) {
    console.error(`Error loading program from file ${fileName}:`, err);
    throw err;
  }
}
