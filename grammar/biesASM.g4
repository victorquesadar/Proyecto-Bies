grammar biesASM;

program: (frame | instruction)+ HLT;

frame: FUN instruction* endFrame;
endFrame: '$END ' FUNCTION;                            // Fin del frame


instruction: LDV NUM                    // Cargar valor en el registro
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
           ;

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

LIST: '[' (NUM (',' NUM)*)? ']';
NUM: ('-'? [0-9]+);                     // Definición de números (incluyendo negativos)
WS: [ \t\r\n]+ -> skip;                 // Espacios en blanco son ignorados
FUNCTION:'$'[0-9]+;
COMMENT: ';' ~[\r\n]* -> skip;          // Ignorar comentarios hasta el final de la línea