// Generated from biesASM.g4 by ANTLR 4.13.0
// jshint ignore: start
import antlr4 from 'antlr4';


const serializedATN = [4,0,7,44,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,
7,4,2,5,7,5,2,6,7,6,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,2,1,2,1,2,1,2,1,3,
1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,6,4,6,41,8,6,11,6,12,6,42,
0,0,7,1,1,3,2,5,3,7,4,9,5,11,6,13,7,1,0,1,1,0,48,57,44,0,1,1,0,0,0,0,3,1,
0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,0,13,1,0,0,0,1,15,
1,0,0,0,3,19,1,0,0,0,5,23,1,0,0,0,7,27,1,0,0,0,9,31,1,0,0,0,11,35,1,0,0,
0,13,40,1,0,0,0,15,16,5,65,0,0,16,17,5,68,0,0,17,18,5,68,0,0,18,2,1,0,0,
0,19,20,5,83,0,0,20,21,5,85,0,0,21,22,5,66,0,0,22,4,1,0,0,0,23,24,5,77,0,
0,24,25,5,85,0,0,25,26,5,76,0,0,26,6,1,0,0,0,27,28,5,68,0,0,28,29,5,73,0,
0,29,30,5,86,0,0,30,8,1,0,0,0,31,32,5,80,0,0,32,33,5,82,0,0,33,34,5,78,0,
0,34,10,1,0,0,0,35,36,5,76,0,0,36,37,5,68,0,0,37,38,5,86,0,0,38,12,1,0,0,
0,39,41,7,0,0,0,40,39,1,0,0,0,41,42,1,0,0,0,42,40,1,0,0,0,42,43,1,0,0,0,
43,14,1,0,0,0,2,0,42,0];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

export default class biesASMLexer extends antlr4.Lexer {

    static grammarFileName = "biesASM.g4";
    static channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	static modeNames = [ "DEFAULT_MODE" ];
	static literalNames = [ null, "'ADD'", "'SUB'", "'MUL'", "'DIV'", "'PRN'", 
                         "'LDV'" ];
	static symbolicNames = [ null, "ADD", "SUB", "MUL", "DIV", "PRN", "LDV", 
                          "NUM" ];
	static ruleNames = [ "ADD", "SUB", "MUL", "DIV", "PRN", "LDV", "NUM" ];

    constructor(input) {
        super(input)
        this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.atn.PredictionContextCache());
    }
}

biesASMLexer.EOF = antlr4.Token.EOF;
biesASMLexer.ADD = 1;
biesASMLexer.SUB = 2;
biesASMLexer.MUL = 3;
biesASMLexer.DIV = 4;
biesASMLexer.PRN = 5;
biesASMLexer.LDV = 6;
biesASMLexer.NUM = 7;



