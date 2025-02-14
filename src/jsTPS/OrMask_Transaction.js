import jtpsTransaction from './jsTPS_Transaction.js'

export default class OrMask_Transaction{
    num=new Num();
    intNum=null;
    mask=null;

    constructor(initNum,initIntNum, initMask){
        this.num.setNum(initNum);
        this.intNum=initIntNum;
        this.mask=initMask;
    }

    doTransaction=()=>{
        this.num.orMask(this.mask);
    }

    undoTransaction=()=>{
        this.num.setNum(this.intNum);
    }

    toString=()=>{
        return `Or Mask ${this.mask}`;
    }
}