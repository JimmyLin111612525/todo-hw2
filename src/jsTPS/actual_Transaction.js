import jsTPS_Transaction from "./jsTPS_Transaction.js";

export class actual_Transaction extends jsTPS_Transaction{
    doTransaction=(transaction)=>{
        if(transaction.newListName){
            transaction.currentList.name=transaction.newListName;
            return transaction.currentList;
        }
        if(transaction.newOwnerName){
            transaction.currentList.owner=transaction.newOwnerName;
            return transaction.currentList;
        }
        if(transaction.upBtn){
            var prev=transaction.newKey;
            var cur=transaction.oldKey;
            const temp = transaction.currentList.items[prev];
            transaction.currentList.items[prev] = transaction.currentList.items[cur];
            transaction.currentList.items[cur] = temp;

            for(var i=0;i<transaction.currentList.items.length;i++){
                transaction.currentList.items[i].key=i;
            }

            return transaction.currentList;
        }
        if(transaction.downBtn){
            var next=transaction.newKey;
            var cur=transaction.oldKey;
            const temp=transaction.currentList.items[next];
            transaction.currentList.items[next]=transaction.currentList.items[cur];
            transaction.currentList.items[cur]=temp;


            for(var i=0;i<transaction.currentList.items.length;i++){
                transaction.currentList.items[i].key=i;
            }

            return transaction.currentList;
        }
        if('delete' in transaction){
            var key=transaction.key;
            transaction.currentList.items.splice(key, 1);
            var counter = 0;
            transaction.currentList.items.map(list => {
                list.key = counter;
                counter++;
            });
            return transaction.currentList;
        }
        if(transaction.new_ass){
            transaction.originalItem.description=transaction.new_desc;
            transaction.originalItem.assigned_to=transaction.new_ass;
            transaction.originalItem.due_date=transaction.new_date;
            transaction.originalItem.completed=transaction.new_completed;

            return transaction.currentList;

        }else{
            return transaction;
        }
        console.log('done');
    }

    undoTransaction=(transaction)=>{
        //transaction.currentList.name=transaction.oldListName;
        console.log('undo');
        if(transaction.oldListName){
            transaction.currentList.name=transaction.oldListName;
            return transaction.currentList;
        }
        if(transaction.oldOwnerName){
            transaction.currentList.owner=transaction.oldOwnerName;
            return transaction.currentList;
        }
        if(transaction.upBtn){
            var prev=transaction.newKey;
            var cur=transaction.oldKey;
            const temp = transaction.currentList.items[prev];
            transaction.currentList.items[prev] = transaction.currentList.items[cur];
            transaction.currentList.items[cur] = temp;

            for(var i=0;i<transaction.currentList.items.length;i++){
                transaction.currentList.items[i].key=i;
            }

            return transaction.currentList;
        }
        if(transaction.downBtn){
            var next=transaction.newKey;
            var cur=transaction.oldKey;
            const temp=transaction.currentList.items[next];
            transaction.currentList.items[next]=transaction.currentList.items[cur];
            transaction.currentList.items[cur]=temp;


            for(var i=0;i<transaction.currentList.items.length;i++){
                transaction.currentList.items[i].key=i;
            }

            return transaction.currentList;
        }
        if(transaction.delete){
            var key=transaction.key;
            var item=transaction.item;
            transaction.currentList.items.splice(key, 0,item);
            var counter = 0;
            transaction.currentList.items.map(list => {
                list.key = counter;
                counter++;
            });
            return transaction.currentList;
        }
        if(transaction.new_ass){
            transaction.originalItem.description=transaction.old_desc;
            transaction.originalItem.assigned_to=transaction.old_ass;
            transaction.originalItem.due_date=transaction.old_date;
            transaction.originalItem.completed=transaction.old_completed;

            return transaction.currentList;

        }else{
            return transaction;
        }
        
    }
}

export default actual_Transaction