import jtps from './jsTPS.js'
import Num from './Num.js'
import AddToNum_Transaction from './AddToNum_Transaction.js'
import AndMask_Transaction from './AndMask_Transaction.js'

var tps = new jtps();
var num = new Num();

var markUp = `
<h2>Add</h2>
<p>0 === num.getNum() ==> ${0 === num.getNum()}</p>
`;
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans = new AddToNum_Transaction(num, 5);
tps.addTransaction(trans);
num.setNum(trans.num.getNum());

var markUp = `
<p>var trans=new AddToNum_Transaction(num,5)</p>
<p>tps.addTransaction(trans)</p>
<p>num.setNum(trans.num.getNum())</p>
<p>5 === num.getNum() ==> ${5 === num.getNum()}</p>
<p>1 === tps.getSize() ==> ${1 === tps.getSize()}</p>
<p>0 === tps.getRedoSize() ==> ${0 === tps.getRedoSize()}</p>
<p>1 === tps.getUndoSize() ==> ${1 === tps.getUndoSize()}</p>
`;
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans = new AddToNum_Transaction(num, 10);
tps.addTransaction(trans);
num = trans.num;

var markUp = `
<br>
<p>var trans=new AddToNum_Transaction(num,10)</p>
<p>tps.addTransaction(trans)</p>
<p>num=trans.num</p>
<p>15 === num.getNum() ==> ${15 === num.getNum()}</p>
<p>2 === tps.getSize() ==> ${2 === tps.getSize()}</p>
<p>0 === tps.getRedoSize() ==> ${0 === tps.getRedoSize()}</p>
<p>2 === tps.getUndoSize() ==> ${2 === tps.getUndoSize()}</p>
`;

document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans = new AddToNum_Transaction(num, 20);
tps.addTransaction(trans);
num = trans.num;

var markUp = `
<br>
<p>var trans=new AddToNum_Transaction(num,20)</p>
<p>tps.addTransaction(trans)</p>
<p>num=trans.num</p>
<p>35 === num.getNum() ==> ${35 === num.getNum()}</p>
<p>3 === tps.getSize() ==> ${3 === tps.getSize()}</p>
<p>0 === tps.getRedoSize() ==> ${0 === tps.getRedoSize()}</p>
<p>3 === tps.getUndoSize() ==> ${3 === tps.getUndoSize()}</p>
`
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var tps = new jtps();
var num = new Num();

var markUp = `
<br>
<h2>And Mask</h2>
<p>0 === num.getNum() ==> ${0 === num.getNum()}</p>
`;
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans = new AddToNum_Transaction(num, 12);

var trans2 = new AndMask_Transaction(num, num.getNum(), 4);

tps.addTransaction(trans);
num = trans.num;
tps.addTransaction(trans2);
num = trans2.num;

var markUp = `
<p>var trans=new AddToNum_Transaction(num,12)<br>
num=trans.num<br>
var trans2=new AndMask_Transaction(num,num.getNum(),4)<br>
num=tran2.num<br>
tps.addTransaction(trans)<br>
tps.addTransaction(trans2)</p>
<p>4 === num.getNum() ==> ${4 === num.getNum()}</p>
<p>2 === tps.getSize() ==> ${2 === tps.getSize()}</p>
`
console.log(num.getNum());
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans = tps.undoTransaction();
num.setNum(trans.intNum);
console.log(trans);

var markUp = `
<p>var trans=tps.undoTransaction()<br>
num=trans.num</p>
<p>12 === num.getNum() ==> ${12 === num.getNum()}</p>
<p>2 === tps.getSize() ==> ${2 === tps.getSize()}</p>
<p>1 === tps.getRedoSize() ==> ${1 === tps.getRedoSize()}</p>
<p>1 === tps.getUndoSize() ==> ${1 === tps.getUndoSize()}</p>
`
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var tps = new jtps();
var num = new Num();

var markUp = `
<br>
<h2>Undo</h2>
<p>0 === num.getNum() ==> ${0 === num.getNum()}</p>
<p>false === tps.hasTransactionToUndo() ==> ${false === tps.hasTransactionToUndo()}</p>
<p>false === tps.hasTransactionToRedo() ==> ${false === tps.hasTransactionToRedo()}</p>
`;
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans = new AddToNum_Transaction(num, 5);
tps.addTransaction(trans);
num = trans.num;
console.log(trans.num);
var trans = new AddToNum_Transaction(num, 10);
tps.addTransaction(trans);
num = trans.num;
console.log(num);
var trans = new AddToNum_Transaction(num, 20);
tps.addTransaction(trans);
num = trans.num;
console.log(num);

var markUp = `
<p>var trans=new AddToNum_Transaction(num,5)<br>
tps.addTransaction(trans)<br>
num=trans.num<br>
var trans=new AddToNum_Transaction(num,10)<br>
tps.addTransaction(trans)<br>
num=trans.num<br>
var trans=new AddToNum_Transaction(num,20)<br>
tps.addTransaction(trans)<br>
num=trans.num
</p>
<p>true === tps.hasTransactionToUndo() ==> ${true === tps.hasTransactionToUndo()}</p>
<p>false === tps.hasTransactionToRedo() ==> ${false === tps.hasTransactionToRedo()}</p>
<p>35 === num.getNum() ==> ${35 === num.getNum()}</p>
<p>true === tps.hasTransactionToUndo() ==> ${true === tps.hasTransactionToUndo()}</p>
<p>3 === tps.getSize() ==> ${3 === tps.getSize()}</p>
<p>0 === tps.getRedoSize() ==> ${0 === tps.getRedoSize()}</p>
<p>3 === tps.getUndoSize() ==> ${3 === tps.getUndoSize()}</p>
`
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans = tps.undoTransaction();
trans.undoTransaction();
num = trans.num;
var markUp = `
<br>
<p>var trans=tps.undoTransaction()<br>
trans.undoTransaction()<br>
num=trans.num</p>
<p>true === tps.hasTransactionToUndo() ==> ${true === tps.hasTransactionToUndo()}</p>
<p>true === tps.hasTransactionToRedo() ==> ${true === tps.hasTransactionToRedo()}</p>
<p>15 === num.getNum() ==> ${15 === num.getNum()}</p>
<p>3 === tps.getSize() ==> ${3 === tps.getSize()}</p>
<p>1 === tps.getRedoSize() ==> ${1 === tps.getRedoSize()}</p>
<p>2 === tps.getUndoSize() ==> ${2 === tps.getUndoSize()}</p>
`
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans = tps.undoTransaction();
trans.undoTransaction();
num = trans.num;
var markUp = `
<br>
<p>var trans=tps.undoTransaction()<br>
trans.undoTransaction()<br>
num=trans.num;</p>
<p>true === tps.hasTransactionToUndo() ==> ${true === tps.hasTransactionToUndo()}</p>
<p>true === tps.hasTransactionToRedo() ==> ${true === tps.hasTransactionToRedo()}</p>
<p>5 === num.getNum() ==> ${5 === num.getNum()}</p>
<p>3 === tps.getSize() ==> ${3 === tps.getSize()}</p>
<p>2 === tps.getRedoSize() ==> ${2 === tps.getRedoSize()}</p>
<p>1 === tps.getUndoSize() ==> ${1 === tps.getUndoSize()}<p>
`
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans = tps.undoTransaction();
trans.undoTransaction();
num = trans.num;
var markUp = `
<br>
<p>var trans=tps.undoTransaction()<br>
trans.undoTransaction()<br>
num=trans.num;</p>
<p>false === tps.hasTransactionToUndo() ==> ${false === tps.hasTransactionToUndo()}</p>
<p>true === tps.hasTransactionToRedo() ==> ${true === tps.hasTransactionToRedo()}</p>
<p>0 === num.getNum() ==> ${0 === num.getNum()}</p>
<p>3 === tps.getSize() ==> ${3 === tps.getSize()}</p>
<p>3 === tps.getRedoSize() ==> ${3 === tps.getRedoSize()}</p>
<p>0 === tps.getUndoSize() ==> ${0 === tps.getUndoSize()}<p>
`
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans = tps.undoTransaction();
if (trans !== null) {
    trans.undoTransaction();
    num = trans.num;
}
var markUp = `
<br>
<p>var trans=tps.undoTransaction()<br>
trans.undoTransaction()<br>
num=trans.num;</p>
<p>false === tps.hasTransactionToUndo() ==> ${false === tps.hasTransactionToUndo()}</p>
<p>true === tps.hasTransactionToRedo() ==> ${true === tps.hasTransactionToRedo()}</p>
<p>0 === num.getNum() ==> ${0 === num.getNum()}</p>
<p>3 === tps.getSize() ==> ${3 === tps.getSize()}</p>
<p>3 === tps.getRedoSize() ==> ${3 === tps.getRedoSize()}</p>
<p>0 === tps.getUndoSize() ==> ${0 === tps.getUndoSize()}<p>
`
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var tps = new jtps();
var num = new Num();

var markUp = `
<br>
<h2>Redo</h2>
<p>0 === num.getNum() ==> ${0 === num.getNum()}</p>
`;
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans = new AddToNum_Transaction(num, 5);
num = trans.num;
tps.addTransaction(trans);
var trans = new AddToNum_Transaction(num, 10);
num = trans.num;
tps.addTransaction(trans);
var trans = new AddToNum_Transaction(num, 20);
num = trans.num;
tps.addTransaction(trans);

var markUp = `
<p>var trans=new AddToNum_Transaction(num,5)<br>
num=trans.num<br>
tps.addTransaction(trans)<br>
var trans=new AddToNum_Transaction(num,10)<br>
num=trans.num<br>
tps.addTransaction(trans)<br>
var trans=new AddToNum_Transaction(num,20)<br>
num=trans.num<br>
tps.addTransaction(trans);</p>
<p>true === tps.hasTransactionToUndo() ==> ${true === tps.hasTransactionToUndo()}</p>
<p>false === tps.hasTransactionToRedo() ==> ${false === tps.hasTransactionToRedo()}</p>
<p>35 === num.getNum() ==> ${35 === num.getNum()}</p>
<p>3 === tps.getSize() ==> ${3 === tps.getSize()}</p>
<p>0 === tps.getRedoSize() ==> ${0 === tps.getRedoSize()}</p>
<p>3 === tps.getUndoSize() ==> ${3 === tps.getUndoSize()}</p>
`;

document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans = tps.undoTransaction();
if (trans !== null) {
    trans.undoTransaction();
    num = trans.num;
}
var trans=tps.doTransaction();
trans.doTransaction()
num=trans.num;

var markUp=`
<p>var trans = tps.undoTransaction()<br>
trans.undoTransaction()<br>
num = trans.num<br>
var trans=tps.doTransaction()<br>
num=trans.num
</p>
<p>true === tps.hasTransactionToUndo() ==> ${true === tps.hasTransactionToUndo()}</p>
<p>false === tps.hasTransactionToRedo() ==> ${false === tps.hasTransactionToRedo()}</p>
<p>35 === num.getNum() ==> ${35 === num.getNum()}</p>
<p>3 === tps.getSize() ==> ${3 === tps.getSize()}</p>
<p>0 === tps.getRedoSize() ==> ${0 === tps.getRedoSize()}</p>
<p>3 === typs.getUndoSize() ==>${3===tps.getUndoSize()}</p>
`
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans=tps.undoTransaction();
if (trans !== null) {
    trans.undoTransaction();
    num = trans.num;
}
var trans=tps.undoTransaction();
if (trans !== null) {
    trans.undoTransaction();
    num = trans.num;
}
var trans=tps.doTransaction();
trans.doTransaction();
num=trans.num;
var trans=tps.doTransaction();
trans.doTransaction();
num=trans.num;

var markUp=`
<p>var trans=tps.undoTransaction()<br>
trans.undoTransaction()<br>
num = trans.num<br>
var trans=tps.undoTransaction()<br>
trans.undoTransaction()<br>
num = trans.num<br>
var trans=tps.doTransaction()<br>
trans.doTransaction()<br>
num=trans.num<br>
var trans=tps.doTransaction()<br>
trans.doTransaction()<br>
num=trans.num
</p>
<p>true === tps.hasTransactionToUndo() ==> ${true === tps.hasTransactionToUndo()}</p>
<p>false === tps.hasTransactionToRedo() ==> ${false === tps.hasTransactionToRedo()}</p>
<p>35 === num.getNum() ==> ${35 === num.getNum()}</p>
<p>3 === tps.getSize() ==> ${3 === tps.getSize()}</p>
<p>0 === tps.getRedoSize() ==> ${0 === tps.getRedoSize()}</p>
<p>3 === tps.getUndoSize() ==> ${3===tps.getUndoSize()}</p>
`;
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans=tps.undoTransaction();
if (trans !== null) {
    trans.undoTransaction();
    num = trans.num;
}
var trans=tps.undoTransaction();
if (trans !== null) {
    trans.undoTransaction();
    num = trans.num;
}
var trans=tps.undoTransaction();
if (trans !== null) {
    trans.undoTransaction();
    num = trans.num;
}
var trans=tps.doTransaction();
trans.doTransaction();
num=trans.num;
var trans=tps.doTransaction();
trans.doTransaction();
num=trans.num;
var trans=tps.doTransaction();
trans.doTransaction();
num=trans.num;

var markUp=`
<p>var trans=tps.undoTransaction()<br>
trans.undoTransaction()<br>
num = trans.num<br>
var trans=tps.undoTransaction()<br>
trans.undoTransaction()<br>
num = trans.num<br>
var trans=tps.undoTransaction()<br>
trans.undoTransaction()<br>
num = trans.num<br>
var trans=tps.doTransaction()<br>
trans.doTransaction()<br>
num=trans.num<br>
var trans=tps.doTransaction()<br>
trans.doTransaction()<br>
num=trans.num<br>
var trans=tps.doTransaction()<br>
trans.doTransaction()<br>
num=trans.num</p>
<p>true === tps.hasTransactionToUndo() ==> ${true === tps.hasTransactionToUndo()}</p>
<p>false === tps.hasTransactionToRedo() ==> ${false === tps.hasTransactionToRedo()}</p>
<p>35 === num.getNum() ==> ${35 === num.getNum()}</p>
<p>3 === tps.getSize() ==> ${3===tps.getSize()}</p>
<p>0 === tps.getRedoSize() ==> ${0 === tps.getRedoSize()}</p>
<p>3 === tps.getUndoSize() ==> ${3 === tps.getUndoSize()}</p>
`
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans=tps.undoTransaction();
if (trans !== null) {
    trans.undoTransaction();
    num = trans.num;
}
var trans=tps.undoTransaction();
if (trans !== null) {
    trans.undoTransaction();
    num = trans.num;
}
var trans=tps.undoTransaction();
if (trans !== null) {
    trans.undoTransaction();
    num = trans.num;
}
var trans=tps.doTransaction();
trans.doTransaction();
num=trans.num;
var trans=tps.doTransaction();
trans.doTransaction();
num=trans.num;

var markUp=`
<p>var trans=tps.undoTransaction()<br>
trans.undoTransaction()<br>
num = trans.num<br>
var trans=tps.undoTransaction()<br>
trans.undoTransaction()<br>
num = trans.num<br>
var trans=tps.undoTransaction()<br>
trans.undoTransaction()<br>
num = trans.num<br>
var trans=tps.doTransaction()<br>
trans.doTransaction()<br>
num=trans.num<br>
var trans=tps.doTransaction()<br>
trans.doTransaction()<br>
num=trans.num;</p>
<p>true === tps.hasTransactionToUndo() ==> ${true === tps.hasTransactionToUndo()}</p>
<p>true === tps.hasTransactionToRedo() ==> ${true === tps.hasTransactionToRedo()}</p>
<p>15 === num.getNum() ==> ${15 === num.getNum()}</p>
<p>3 === tps.getSize() ==> ${3 === tps.getSize()}</p>
<p>1 === tps.getRedoSize() ==> ${1 === tps.getRedoSize()}</p>
<p>2 === tps.getUndoSize() ==> ${2===tps.getUndoSize()}</p>
`
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans=tps.undoTransaction();
if (trans !== null) {
    trans.undoTransaction();
    num = trans.num;
}
var trans=tps.undoTransaction();
if (trans !== null) {
    trans.undoTransaction();
    num = trans.num;
}
var trans=tps.undoTransaction();
if (trans !== null) {
    trans.undoTransaction();
    num = trans.num;
}
var trans=tps.doTransaction();
trans.doTransaction();
num=trans.num;
var trans=tps.doTransaction();
trans.doTransaction();
num=trans.num;
var trans=tps.doTransaction();
trans.doTransaction();
num=trans.num;
var trans=tps.doTransaction();
if(trans!==null){trans.doTransaction();
num=trans.num;}

var markUp=`
<p>var trans=tps.undoTransaction()<br>
trans.undoTransaction()<br>
num = trans.num<br>
var trans=tps.undoTransaction()<br>
trans.undoTransaction()<br>
num = trans.num<br>
var trans=tps.undoTransaction()<br>
trans.undoTransaction()<br>
num = trans.num<br>
var trans=tps.doTransaction()<br>
trans.doTransaction()<br>
num=trans.num<br>
var trans=tps.doTransaction()<br>
trans.doTransaction()<br>
num=trans.num<br>
var trans=tps.doTransaction()<br>
trans.doTransaction()<br>
num=trans.num<br>
var trans=tps.doTransaction()<br>
trans.doTransaction()<br>
num=trans.num</p>
<p>true === tps.hasTransactionToUndo() ==> ${true === tps.hasTransactionToUndo()}</p>
<p>false === tps.hasTransactionToRedo() ==> ${false === tps.hasTransactionToRedo()}</p>
<p>35 === num.getNum() ==> ${35 === num.getNum()}</p>
<p>3 === tps.getSize() ==> ${3===tps.getSize()}</p>
<p>0 === tps.getRedoSize() ==> ${0===tps.getRedoSize()}</p>
<p>3 === tps.getUndoSize() ==> ${3===tps.getUndoSize()}</p>
`
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var tps = new jtps();
var num = new Num();

var markUp = `
<br>
<h2>Clear</h2>
<p>0 === num.getNum() ==> ${0 === num.getNum()}</p>
`;
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans = new AddToNum_Transaction(num, 5);
num = trans.num;
tps.addTransaction(trans);
var trans = new AddToNum_Transaction(num, 10);
num = trans.num;
tps.addTransaction(trans);
var trans = new AddToNum_Transaction(num, 20);
num = trans.num;
tps.addTransaction(trans);

var markUp=`
<p>var trans = new AddToNum_Transaction(num, 5)<br>
num = trans.num<br>
tps.addTransaction(trans)<br>
var trans = new AddToNum_Transaction(num, 10)<br>
num = trans.num<br>
tps.addTransaction(trans)<br>
var trans = new AddToNum_Transaction(num, 20)<br>
num = trans.num<br>
tps.addTransaction(trans)</p>
<p>35 === num.getNum() ==> ${35===num.getNum()}</p>
<p>3 === tps.getSize() ==> ${3===tps.getSize()}</p>
<p>0 === tps.getRedoSize() ==> ${0===tps.getRedoSize()}</p>
<p>3 === tps.getUndoSize() ==> ${3===tps.getUndoSize()}</p>
`;
document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

tps.clearAllTransaction();

var markUp=`
<p>tps.clearAllTransaction()</p>
<p>35 === num.getNum() ==> ${35===num.getNum()}</p>
<p>0 === tps.getSize() ==> ${0===tps.getSize()}</p>
<p>0 === tps.getRedoSize() ==> ${0===tps.getRedoSize()}</p>
<p>0 === tps.getUndoSize() ==> ${0===tps.getUndoSize()}</p>
`

document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans = new AddToNum_Transaction(num, 5);
num = trans.num;
tps.addTransaction(trans);
var trans = new AddToNum_Transaction(num, 10);
num = trans.num;
tps.addTransaction(trans);
var trans = new AddToNum_Transaction(num, 20);
num = trans.num;
tps.addTransaction(trans);

var markUp=`
<p>var trans = new AddToNum_Transaction(num, 5)<br>
num = trans.num<br>
tps.addTransaction(trans)<br>
var trans = new AddToNum_Transaction(num, 10)<br>
num = trans.num<br>
tps.addTransaction(trans)<br>
var trans = new AddToNum_Transaction(num, 20)<br>
num = trans.num<br>
tps.addTransaction(trans)</p>
<p>70 === num.getNum() ==> ${70===num.getNum()}</p>
<p>3 === tps.getSize() ==> ${3===tps.getSize()}</p>
<p>0 === tps.getRedoSize() ==> ${0===tps.getRedoSize()}</p>
<p>3 === tps.getUndoSize() ==> ${3===tps.getUndoSize()}</p>
`;

document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

tps.clearAllTransaction();

var markUp=`
<p>tps.clearAllTransaction()</p>
<p>70 === num.getNum() ==> ${70===num.getNum()}</p>
<p>0 === tps.getSize() ==> ${0===tps.getSize()}</p>
<p>0 === tps.getRedoSize() ==> ${0===tps.getRedoSize()}</p>
<p>0 === tps.getUndoSize() ==> ${0===tps.getUndoSize()}</p>
`

document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);

var trans = new AddToNum_Transaction(num, 5);
num = trans.num;
tps.addTransaction(trans);
var trans = new AddToNum_Transaction(num, 10);
num = trans.num;
tps.addTransaction(trans);
var trans = new AddToNum_Transaction(num, 20);
num = trans.num;
tps.addTransaction(trans);

var markUp=`
<p>var trans = new AddToNum_Transaction(num, 5)<br>
num = trans.num<br>
tps.addTransaction(trans)<br>
var trans = new AddToNum_Transaction(num, 10)<br>
num = trans.num<br>
tps.addTransaction(trans)<br>
var trans = new AddToNum_Transaction(num, 20)<br>
num = trans.num<br>
tps.addTransaction(trans)</p>
<p>105 === num.getNum() ==> ${105===num.getNum()}</p>
<p>3 === tps.getSize() ==> ${3===tps.getSize()}</p>
<p>0 === tps.getRedoSize() ==> ${0===tps.getRedoSize()}</p>
<p>3 === tps.getUndoSize() ==> ${3===tps.getUndoSize()}</p>
`;

document.getElementById('unit-test-container').insertAdjacentHTML('beforeend', markUp);



