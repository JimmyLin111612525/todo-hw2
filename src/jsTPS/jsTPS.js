import actual_Transaction from "./actual_Transaction.js";

export default class jsTPS {
    transactions = [];
    mostRecentTransaction = -1;

    actTrans = new actual_Transaction();

    performingDo = false;
    performingUndo = false;

    isPerformingDo = () => {
        return this.performingDo;
    }

    isPerformingUndo = () => {
        return this.performingUndo;
    }

    addTransaction = (transaction) => {


        if ((this.mostRecentTransaction < 0) || (this.mostRecentTransaction < (this.transactions.length - 1))) {
            for (var i = this.transactions.length; i > this.mostRecentTransaction; i--) {
                this.transactions.splice(i, 1);
            }
        }
        this.transactions.push(transaction);
        this.doTransaction();
        console.log(this.transactions);
    }

    doTransaction = () => {
        var lst = null;
        if (this.hasTransactionToRedo()) {
            this.performingDo = true;
            var transaction = this.transactions[this.mostRecentTransaction + 1];
            console.log(transaction);
            lst = this.actTrans.doTransaction(transaction);
            if (lst !== null) {
                this.mostRecentTransaction++;
            }
            this.performingDo = false
        }
        return lst;

    }

    peekUndo = () => {
        if (this.hasTransactionToUndo()) {
            return this.transactions[this.mostRecentTransaction];
        } else {
            return null;
        }
    }

    peekDo = () => {
        if (this.hasTransactionToRedo()) {
            return this.transactions[this.mostRecentTransaction + 1];
        }
        else {
            return null;
        }
    }

    undoTransaction = () => {
        var lst = null;
        if (this.hasTransactionToUndo()) {
            this.performingUndo = true;
            var transaction = this.transactions[this.mostRecentTransaction];
            console.log(this.transactions);
            console.log(transaction);
            lst = this.actTrans.undoTransaction(transaction);
            this.mostRecentTransaction--;
            this.performingUndo = false;
        }
        return lst;
    }

    clearAllTransaction = () => {
        this.transactions.splice(0, this.transactions.length);
        this.mostRecentTransaction = -1;
    }

    getSize = () => {
        return this.transactions.length;
    }

    getRedoSize = () => {
        return this.getSize() - this.mostRecentTransaction - 1;
    }

    getUndoSize = () => {
        return this.mostRecentTransaction + 1;
    }

    hasTransactionToRedo = () => {
        return this.mostRecentTransaction < (this.transactions.length - 1);
    }

    hasTransactionToUndo = () => {
        return this.mostRecentTransaction >= 0;
    }

    toString = () => {
        var text = '--Number of Transactions: ' + this.transactions.length + '<br>';
        text += '--Current Index on Stack: ' + this.mostRecentTransaction + '<br>';
        text += '--Current Transaction Stack:' + '<br>';
        for (var i = 0; i <= this.mostRecentTransaction; i++) {
            var jT = this.transactions[i];
            text += '----' + jT.toString() + '<br>';
        }
        return text;
    }
}