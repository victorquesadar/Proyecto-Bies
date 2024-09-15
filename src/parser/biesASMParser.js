// Generated from biesASM.g4 by ANTLR 4.13.0
// jshint ignore: start
import antlr4 from 'antlr4';
import biesASMListener from './biesASMListener.js';
const serializedATN = [4,1,7,17,2,0,7,0,2,1,7,1,2,2,7,2,1,0,4,0,8,8,0,11,
0,12,0,9,1,1,1,1,1,1,1,2,1,2,1,2,0,0,3,0,2,4,0,1,1,0,1,6,14,0,7,1,0,0,0,
2,11,1,0,0,0,4,14,1,0,0,0,6,8,3,2,1,0,7,6,1,0,0,0,8,9,1,0,0,0,9,7,1,0,0,
0,9,10,1,0,0,0,10,1,1,0,0,0,11,12,3,4,2,0,12,13,5,7,0,0,13,3,1,0,0,0,14,
15,7,0,0,0,15,5,1,0,0,0,1,9];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class biesASMParser extends antlr4.Parser {

    static grammarFileName = "biesASM.g4";
    static literalNames = [ null, "'ADD'", "'SUB'", "'MUL'", "'DIV'", "'PRN'", 
                            "'LDV'" ];
    static symbolicNames = [ null, "ADD", "SUB", "MUL", "DIV", "PRN", "LDV", 
                             "NUM" ];
    static ruleNames = [ "program", "instruction", "operation" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = biesASMParser.ruleNames;
        this.literalNames = biesASMParser.literalNames;
        this.symbolicNames = biesASMParser.symbolicNames;
    }



	program() {
	    let localctx = new ProgramContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, biesASMParser.RULE_program);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 7; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 6;
	            this.instruction();
	            this.state = 9; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) === 0 && ((1 << _la) & 126) !== 0));
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	instruction() {
	    let localctx = new InstructionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, biesASMParser.RULE_instruction);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 11;
	        this.operation();
	        this.state = 12;
	        this.match(biesASMParser.NUM);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	operation() {
	    let localctx = new OperationContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, biesASMParser.RULE_operation);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 14;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 126) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

biesASMParser.EOF = antlr4.Token.EOF;
biesASMParser.ADD = 1;
biesASMParser.SUB = 2;
biesASMParser.MUL = 3;
biesASMParser.DIV = 4;
biesASMParser.PRN = 5;
biesASMParser.LDV = 6;
biesASMParser.NUM = 7;

biesASMParser.RULE_program = 0;
biesASMParser.RULE_instruction = 1;
biesASMParser.RULE_operation = 2;

class ProgramContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = biesASMParser.RULE_program;
    }

	instruction = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(InstructionContext);
	    } else {
	        return this.getTypedRuleContext(InstructionContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof biesASMListener ) {
	        listener.enterProgram(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof biesASMListener ) {
	        listener.exitProgram(this);
		}
	}


}



class InstructionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = biesASMParser.RULE_instruction;
    }

	operation() {
	    return this.getTypedRuleContext(OperationContext,0);
	};

	NUM() {
	    return this.getToken(biesASMParser.NUM, 0);
	};

	enterRule(listener) {
	    if(listener instanceof biesASMListener ) {
	        listener.enterInstruction(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof biesASMListener ) {
	        listener.exitInstruction(this);
		}
	}


}



class OperationContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = biesASMParser.RULE_operation;
    }

	ADD() {
	    return this.getToken(biesASMParser.ADD, 0);
	};

	SUB() {
	    return this.getToken(biesASMParser.SUB, 0);
	};

	MUL() {
	    return this.getToken(biesASMParser.MUL, 0);
	};

	DIV() {
	    return this.getToken(biesASMParser.DIV, 0);
	};

	PRN() {
	    return this.getToken(biesASMParser.PRN, 0);
	};

	LDV() {
	    return this.getToken(biesASMParser.LDV, 0);
	};

	enterRule(listener) {
	    if(listener instanceof biesASMListener ) {
	        listener.enterOperation(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof biesASMListener ) {
	        listener.exitOperation(this);
		}
	}


}




biesASMParser.ProgramContext = ProgramContext; 
biesASMParser.InstructionContext = InstructionContext; 
biesASMParser.OperationContext = OperationContext; 
