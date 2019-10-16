import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    state = {
        todoList: this.props.todoList,
        clickedTask: false
    }
    newListItem = () => {
        let item = {
            key: this.props.todoList.items.length,
            description: '',
            due_date: '',
            assigned_to: '',
            completed: false,
            new:true
        }
        this.props.todoList.items.push(item);
        /*for(var i=0;i<this.props.todoList.items.length;i++){
            this.props.todoList.items[i].key=i;
        }*/
        this.props.editItem(item);
    }
    sortTask = () => {
        this.setState({ clicked: !this.state.clicked });
        console.log(this.state.clicked);
        this.props.todoList.items.sort(function (a, b) {
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
            this.props.todoList.items.reverse();
        }

        for(var i=0;i<this.props.todoList.items.length;i++){
            this.props.todoList.items[i].key=i;
        }

        this.props.loadList(this.props.todoList);
    }

    sortDate = () => {
        this.setState({ clicked: !this.state.clicked });
        this.props.todoList.items.sort(function (a, b) {
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
            this.props.todoList.items.reverse();
        }

        for(var i=0;i<this.props.todoList.items.length;i++){
            this.props.todoList.items[i].key=i;
        }

        this.props.loadList(this.props.todoList);
    }

    sortComp = () => {
        this.setState({ clicked: !this.state.clicked });
        this.props.todoList.items.sort(function (a, b) {
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
            this.props.todoList.items.reverse();
        }

        for(var i=0;i<this.props.todoList.items.length;i++){
            this.props.todoList.items[i].key=i;
        }
        
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
