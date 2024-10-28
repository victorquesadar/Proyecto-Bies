grammar biesASM;

program: (frame | instruction)+ HLT;

frame: FUN instruction* endFrame;
endFrame: '$END ' FUNCTION;                            // Fin del frame


instruction: LDV value                    // Cargar valor en el registro
           | ADD                        // Sumar
           | SUB                        // Restar
           | MUL                        // Multiplicar
           | DIV                        // Dividir
           | PRN                        // Imprimir
           | BST NUM NUM                // Almacenar en dirección
           | BLD NUM NUM                // Cargar desde dirección
           | LDF FUNCTION                       // Cargar función
           | APP FUNCTION                        // Aplicar función
           | RET                        // Retornar de función
		   | LNT                // Test de nulidad de lista
           | LIN                // Insertar en el inicio de una lista
           | LTK                // Obtener el k-ésimo elemento de una lista
           | LRK                // Obtener el resto de la lista después del k-ésimo
           | TOL                // Convertir a lista
           | BF NUM                     // Bifurcación condicional en falso
           | BR NUM
           | BT NUM                     // Bifurcación condicional en verdadero
           | INP
           | CompareInstruction      // Instrucciones de comparación
           ;



CompareInstruction: EQ | GT | GTE | LT | LTE;

LDV: 'LDV';                             // Instrucción para cargar valor
ADD: 'ADD';                             // Instrucción para sumar
SUB: 'SUB';                             // Instrucción para restar
MUL: 'MUL';                             // Instrucción para multiplicar
DIV: 'DIV';                             // Instrucción para dividir
PRN: 'PRN';                             // Instrucción para imprimir
BST: 'BST';                             // Instrucción para almacenar
BLD: 'BLD';                             // Instrucción para cargar
LDF: 'LDF';                             // Instrucción para cargar función
APP: 'APP';                             // Aplicar función

RET: 'RET'; 
LNT: 'LNT';
LIN: 'LIN';
LTK: 'LTK';
LRK: 'LRK';
TOL: 'TOL';                            // Retornar de función
HLT: 'HLT';                             // Instrucción para detener
FUN: '$FUN ' FUNCTION;                   // Definir función

LIST: '[' (NUM (',' NUM)*)? ']' | STRING;
INP: 'INP';    
STRING: '"' (CHAR)* '"';                          // Instrucción para entrada

// Comparaciones
EQ: 'EQ';                               // Instrucción para igualdad
GT: 'GT';                               // Instrucción para mayor que
GTE: 'GTE';                             // Instrucción para mayor o igual que
LT: 'LT';                               // Instrucción para menor que
LTE: 'LTE';                             // Instrucción para menor o igual que

// Bifurcaciones
BT: 'BT';                               // Bifurcación condicional en verdadero
BF: 'BF';                               // Bifurcación condicional en falso
BR: 'BR';                               // Bifurcación incondicional


value: NUM | LIST | STRING;

NUM: ('-'? [0-9]+);                     // Definición de números (incluyendo negativos)
WS: [ \t\r\n]+ -> skip;                 // Espacios en blanco son ignorados
FUNCTION:'$'[0-9]+;
COMMENT: ';' ~[\r\n]* -> skip;          // Ignorar comentarios hasta el final de la línea
CHAR: .; // Permitir letras, números y guiones bajos
