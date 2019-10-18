import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types'

export class ListScreen extends Component {
    state = {
        owner: this.getListOwner(),
        name: this.getListName()
    }

    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return name;
        }
        else {
            return "";
        }
    }

    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return owner;
        } else {
            return "";
        }
    }

    onChangeName = (e) => {
        this.setState({ name: e.target.value });

        var oldListName = this.props.todoList.name;

        if (e.target.value.trim() === '') {
            //edit-------------------------------------
            let trans = {
                currentList: this.props.todoList,
                oldListName: oldListName,
                newListName: 'Unknown'
            };

            this.props.tps.addTransaction(trans);
            //edit----------------------------------------

            //this.props.todoList.name = 'Unknown';
        } else {

            //edit-------------------------------------
            let trans = {
                currentList: this.props.todoList,
                oldListName: oldListName,
                newListName: e.target.value
            };

            this.props.tps.addTransaction(trans);
            //edit----------------------------------------

            //this.props.todoList.name = e.target.value;
        }

        console.log(this.props.tps);
    }

    onChangeOwner = (e) => {
        this.setState({ owner: e.target.owner });
        var oldOwnerName = this.props.todoList.owner;
        if (e.target.value.trim() === '') {

            //edit-------------------------------------
            let trans = {
                currentList: this.props.todoList,
                oldOwnerName: oldOwnerName,
                newOwnerName: 'Unknown'
            };

            this.props.tps.addTransaction(trans);
            //edit----------------------------------------

            //this.props.todoList.owner = 'Unknown';
        } else {

            //edit-------------------------------------
            let trans = {
                currentList: this.props.todoList,
                oldOwnerName: oldOwnerName,
                newOwnerName: e.target.value
            };

            this.props.tps.addTransaction(trans);
            //edit----------------------------------------

            //this.props.todoList.owner = e.target.value;
        }
    }

    render() {
        console.log('here too');
        document.addEventListener('keydown', this.props.undo_redo);
        /*var tps=new jsTPS();

        tps.addTransaction(this.props.todoList);
        console.log(tps);*/

        return (
            <div id="todo_list">
                <ListHeading goHome={this.props.goHome} />
                <ListTrash deleteList={this.props.deleteList} undo_redo={this.props.undo_redo} tps={this.props.tps} />
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar" >
                        <span id="list_name_prompt">Name:</span>
                        <input
                            value={this.props.name}
                            type="text"
                            id="list_name_textfield"
                            onChange={this.props.onChangeName}
                            placeholder="Unknown"
                        />
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar" >
                        <span id="list_owner_prompt">Owner:</span>
                        <input
                            value={this.props.owner}
                            type="text"
                            id="list_owner_textfield"
                            onChange={this.props.onChangeOwner}
                            placeholder="Unknown"
                        />
                    </div>

                </div>
                <ListItemsTable todoList={this.props.todoList} undo_redo={this.props.undo_redo} editItem={this.props.editItem} newItem={this.props.newItem} loadList={this.props.loadList} cancel={false} tps={this.props.tps} />
            </div>
        )
    }
}

ListScreen.propTypes = {
    goHome: PropTypes.func.isRequired,
    todoList: PropTypes.object.isRequired,
    editItem: PropTypes.func.isRequired,
    deleteList: PropTypes.func.isRequired,
    loadList: PropTypes.func.isRequired
}

export default ListScreen
