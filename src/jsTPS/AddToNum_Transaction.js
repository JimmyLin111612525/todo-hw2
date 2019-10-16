import jtpsTransaction from './jsTPS_Transaction.js'
import Num from './Num.js'

export default class AddToNum_Transaction{
    num=new Num();
    amountToAdd=0;
    
    constructor(initNum,initAmountToAdd){
        console.log(this.num);
        this.num=(initNum);
        console.log(this.num.getNum());
        console.log(initNum);
        this.amountToAdd=initAmountToAdd;
        this.doTransaction();
    }

    doTransaction=()=>{
        var oldNum=this.num.getNum();
        var newNum=oldNum+this.amountToAdd;
        this.num.setNum(newNum);
    }

    undoTransaction=()=>{
        var oldNum=this.num.getNum();
        var newNum=oldNum-this.amountToAdd;
        this.num.setNum(newNum);
        return this.sum;
    }

    toString=()=>{
        return `Add ${this.amountToAdd}`;
    }
}