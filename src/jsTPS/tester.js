//import jtpsTransaction from './jsTPS_Transaction.js'
import jtps from './jsTPS.js'
import Num from'./Num.js'
import AddToNum_Transaction from './AddToNum_Transaction.js'

console.log('hellU');
var tps = new jtps();
var num=new Num();

console.log(num.getNum());
function init(){
    var str1=tps.toString();
    var str2=`num is ${num.getNum()}`;
    var markUp1=
    `<div id="tps">
        <p id="tps_string">
            ${str1}
        </p>
    </div>`;

    var markUp2=
    `<div id="num">
        <p id="num_string">
            ${str2}
        </p>
    </div>`;

    document.getElementById('tps_info').innerHTML='';
    document.getElementById('tps_info').insertAdjacentHTML('beforeend',markUp1);
    document.getElementById('tps_info').insertAdjacentHTML('beforeend',markUp2);
}

function disableBtns(){
    document.getElementById('container').innerHTML='Bye!!!!';
}

function addTransaction(){
    var amtStr=prompt('Enter an amount to add:');
    var amt=parseInt(amtStr);
    if(amt){
        var trans=new AddToNum_Transaction(num,amt);
        tps.addTransaction(trans);
        //trans.doTransaction();
        num=trans.num;
        init();
    }
}

function undoTransaction(){

    var trans=tps.undoTransaction();
    trans.undoTransaction();
    num=trans.num;
    init();
}

function redoTransaction(){
    var trans=tps.doTransaction();
    trans.doTransaction();
    num=trans.num;
    init();
}

function clearAllTransactions(){
    tps.clearAllTransaction();
    init();
}

function resetAllTransactions(){
    clearAllTransactions();
    num.setNum(0);
    init();
}
init();


document.getElementById('quit').addEventListener('click',disableBtns);
document.getElementById('add').addEventListener('click',addTransaction);
document.getElementById('undo').addEventListener('click',undoTransaction);
document.getElementById('redo').addEventListener('click',redoTransaction);
document.getElementById('clear').addEventListener('click',clearAllTransactions);
document.getElementById('reset').addEventListener('click',resetAllTransactions);

