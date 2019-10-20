import React, { Component } from 'react'

export class ListItemCard extends Component {
    status = {
        true: 'Completed',
        false: 'Not Completed',
        classNameUp: '',
        classNameDown: ''
    }

    status_div = {
        true: 'list_item_card_completed',
        false: 'list_item_card_not_completed'
    }

    upItem = (e) => {
        e.stopPropagation();
        const oldKey = this.props.listItem.key;

        //const newKey=this.props.listItem.key-1;
        if (oldKey !== 0) {
            var trans = {
                currentList: this.props.todoList,
                upBtn: true,
                oldKey: this.props.listItem.key,
                newKey: this.props.listItem.key - 1,
            }
            this.props.tps.addTransaction(trans);
        }


        //console.log(trans);
        this.props.loadList(this.props.todoList);

    }

    downItem = (e) => {
        e.stopPropagation();
        //console.log(this.props.todoList.items.length);
        const oldKey = this.props.listItem.key;
        const newKey = this.props.listItem.key + 1;
        if (oldKey !== this.props.todoList.items.length - 1) {
            var trans = {
                currentList: this.props.todoList,
                downBtn: true,
                oldKey: this.props.listItem.key,
                newKey: this.props.listItem.key + 1,
            }
            this.props.tps.addTransaction(trans);
        }

        this.props.loadList(this.props.todoList);
    }

    delItem = (e) => {
        e.stopPropagation();
        const key = this.props.listItem.key;
        var trans = {
            currentList: this.props.todoList,
            delete: true,
            key: this.props.listItem.key,
            item: this.props.todoList.items[key]
        }
        this.props.tps.addTransaction(trans);
        this.props.loadList(this.props.todoList);
    }

    setOpacityUp = () => {
        if (this.props.listItem.key === 0) {
            this.status.classNameUp = 'list_item_card_up_button dis';
        } else {
            this.status.classNameUp = 'list_item_card_up_button';
        }
    }

    setOpacityDown = () => {
        if (this.props.listItem.key === this.props.todoList.items.length - 1) {
            this.status.classNameDown = 'list_item_card_down_button dis';
        } else {
            this.status.classNameDown = 'list_item_card_down_button';
        }
    }

    change = () => {
        document.removeEventListener('keydown', this.props.undo_redo)
        
        this.props.editItem(this.props.listItem,false);
    }

    render() {
       // console.log(this.props);
        const item = this.props.listItem;
        this.setOpacityUp();
        this.setOpacityDown();
        //document.addEventListener('keydown',this.props.undo_redo);
        return (
            <div className='list_item_card' onClick={this.change} >
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <div className={this.status_div[this.props.listItem.completed]}>
                    {this.status[this.props.listItem.completed]}
                </div>
                <div className='list_item_card_buttons'>
                    <div className='list_item_card_up_button_container'>
                        <div className={this.status.classNameUp} onClick={this.upItem}>&#8679;</div>
                    </div>
                    <div className='list_item_card_down_button_container'>
                        <div className={this.status.classNameDown} onClick={this.downItem}>&#8681;</div>
                    </div>
                    <div className='list_item_card_delete_button_container'>
                        <div className='list_item_card_delete_button' onClick={this.delItem}>&#8861;</div>
                    </div>
                </div>
            </div>
        )
    }
}



export default ListItemCard
