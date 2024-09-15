function runProgram(parsedProgram) {
  console.log('Running program...');
  let accumulator = 0;  // Variable para almacenar resultados

  parsedProgram.instructions.forEach(inst => {
    const [command, arg] = inst.split(' ');

    switch (command) {
      case 'ADD':
        accumulator += parseInt(arg, 10);
        console.log(`Adding ${arg}. Accumulator: ${accumulator}`);
        break;
      case 'LDV':
        console.log(`Loading value: ${arg}`);
        accumulator = parseInt(arg, 10);
        break;
      case 'PRN':
        console.log(`Printing value: ${accumulator}`);
        break;
      default:
        console.log(`Unknown instruction: ${inst}`);
    }
  });
}

export { runProgram };

