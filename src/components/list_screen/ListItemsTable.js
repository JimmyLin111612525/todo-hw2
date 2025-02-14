import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    state = {
        todoList: this.props.todoList,
        clicked: false
    }
    newListItem = () => {
        let item = {
            key: this.props.todoList.items.length,
            description: 'Unknown',
            due_date: '0000-00-00',
            assigned_to: 'Unknown',
            completed: false,
        }

        /***** */
        /*var newItem=JSON.parse(JSON.stringify(this.props.todoList.items));
        newItem.push(item);
        let trans={
            currentList:this.props.todoList,
            oldItems:JSON.stringify(this.props.todoList.items),
            newItems:newItem,
            new:true
        }*/

        //this.props.tps.addTransaction(trans);

        /*** */
        
        //this.props.todoList.items.push(item);

        /*for(var i=0;i<this.props.todoList.items.length;i++){
            this.props.todoList.items[i].key=i;
        }*/
        this.props.editItem(item,true);
    }
    sortTask = () => {
        this.setState({ clicked: !this.state.clicked });
        console.log(this.state.clicked);
        let newList = JSON.parse(JSON.stringify(this.props.todoList.items));
        let oldList = JSON.stringify(this.props.todoList.items);
        newList.sort(function (a, b) {
            if (a.description < b.description) {
                return 1;
            }
            if (a.description > b.description) {
                return -1;
            } else {
                return 0;
            }
        });

        if (!this.state.clicked) {
            newList.reverse();
        }

        for (var i = 0; i < newList.length; i++) {
            newList[i].key = i;
        }

        var trans = {
            currentList: this.props.todoList,
            oldItem: oldList,
            newItem: newList,
            //taskSort:true,
            //clicked:this.state.clicked,
            sort: true
        }
        this.props.tps.addTransaction(trans);

        this.props.loadList(this.props.todoList);
    }

    sortDate = () => {
        this.setState({ clicked: !this.state.clicked });
        let newList = JSON.parse(JSON.stringify(this.props.todoList.items));
        let oldList = JSON.stringify(this.props.todoList.items);
        newList.sort(function (a, b) {
            if (a.due_date < b.due_date) {
                return 1;
            }
            if (a.due_date > b.due_date) {
                return -1;
            } else {
                return 0;
            }
        });

        if (!this.state.clicked) {
            newList.reverse();
        }

        for (var i = 0; i < newList.length; i++) {
            newList[i].key = i;
        }

        var trans = {
            currentList: this.props.todoList,
            oldItem: oldList,
            newItem: newList,
            //dateSort:true,
            //clicked:this.state.clicked,
            sort: true
        }
        this.props.tps.addTransaction(trans);

        //this.props.todoList.items=lst.items;

        /*if (!this.state.clicked) {
            this.props.todoList.items.reverse();
        }*/

        this.props.loadList(this.props.todoList);
    }

    sortComp = () => {
        this.setState({ clicked: !this.state.clicked });
        let newList = JSON.parse(JSON.stringify(this.props.todoList.items));
        let oldList = JSON.stringify(this.props.todoList.items);
        newList.sort(function (a, b) {
            if (a.completed === true && b.completed === false) {
                return 1;
            }
            if (a.completed === false && b.completed === true) {
                return -1;
            } else {
                return 0;
            }
        });
        if (!this.state.clicked) {
            newList.reverse();
        }

        for (var i = 0; i < newList.length; i++) {
            newList[i].key = i;
        }

        var trans = {
            currentList: this.props.todoList,
            oldItem: oldList,
            newItem: newList,
            //dateSort:true,
            //clicked:this.state.clicked,
            sort: true
        }
        this.props.tps.addTransaction(trans);

        this.props.loadList(this.props.todoList);
    }

    render() {
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">
                    <div className="list_item_task_header" onClick={this.sortTask}>Task</div>
                    <div className="list_item_due_date_header" onClick={this.sortDate}>Due Date</div>
                    <div className="list_item_status_header" onClick={this.sortComp}>Status</div>
                </div>
                {
                    this.props.todoList.items.map((todoItem) => (
                        <ListItemCard
                            key={todoItem.key}
                            listItem={todoItem}
                            editItem={this.props.editItem}
                            todoList={this.props.todoList}
                            loadList={this.props.loadList}
                            tps={this.props.tps}

                        />
                    ))
                }
                <div className='list_item_add_card' onClick={this.newListItem}>&#8853;</div>
            </div>

        )
    }
}

export default ListItemsTable
