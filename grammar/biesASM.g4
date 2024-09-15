grammar biesASM;

// Reglas léxicas
ADD : 'ADD';
SUB : 'SUB';
MUL : 'MUL';
DIV : 'DIV';
PRN : 'PRN';
LDV : 'LDV';
NUM : [0-9]+;

// Reglas sintácticas
program : (instruction)+ ;
instruction : operation NUM ;
operation : ADD | SUB | MUL | DIV | PRN | LDV ;
