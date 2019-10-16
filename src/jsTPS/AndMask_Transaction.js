import jtpsTransaction from './jsTPS_Transaction.js'
import Num from './Num.js'

export default class AndMask_Transaction{
    num=new Num();
    intNum=null;
    mask=null;

    constructor(initNum,initIntNum, initMask){
        this.num=(initNum);
        this.intNum=initIntNum;
        this.mask=initMask;
        this.doTransaction();
    }

    doTransaction=()=>{
        this.num.andMask(this.mask);
    }

    undoTransaction=()=>{
        this.num.setNum(this.intNum);
    }

    toString=()=>{
        return `And Mask ${this.mask}`;
    }
}