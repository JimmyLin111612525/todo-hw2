import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ItemScreen extends Component {
    state = {
        desc: this.props.todoItem.description,
        ass: this.props.todoItem.assigned_to,
        date: this.props.todoItem.due_date,
        check: this.props.todoItem.completed,
        new:null
    }

    onChangeDescription = (e) => {
        this.setState({ desc: e.target.value });
        this.setState({new:false});
        /*if(e.target.value===''){
            this.props.todoItem.description='Unknown';
        }else{
            this.props.todoItem.description=e.target.value;
        }*/
    }

    onChangeAssignment = (e) => {
        this.setState({ ass: e.target.value });
        this.setState({new:false});
        /*if(e.target.value==''){
            this.props.todoItem.assigned_to='Unknown';
        }else{
            this.props.todoItem.assigned_to=e.target.value;
        }*/
    }

    onChangeDate = (e) => {
        this.setState({ date: e.target.value });
        this.setState({new:false});
        //this.props.todoItem.due_date=e.target.value;
    }

    onChangeComplete = (e) => {
        //console.log(e.target.checked);
        this.setState({ check: e.target.checked });
        console.log(e.target.checked);
        this.setState({new:false});
        //this.props.todoItem.completed=e.target.checked;
    }

    submitChanges = () => {
        var newItemS=JSON.parse(JSON.stringify(this.props.todoList.items));
        newItemS.push(this.props.todoItem);

        let trans1={
            currentList:this.props.todoList,
            oldItems:JSON.stringify(this.props.todoList.items),
            newItems:newItemS,
            new:true
        }

        if(this.props.newOrNot===true){
            console.log('new');
            this.setState({new:true});
            this.props.tps.addTransaction(trans1);
        }

        console.log(this.props.tps.transactions);

        var trans2 = {
            currentList: this.props.todoList,
            originalItem: this.props.todoItem,
            old_desc: this.props.todoItem.description,
            old_ass: this.props.todoItem.assigned_to,
            old_date: this.props.todoItem.due_date,
            old_completed: this.props.todoItem.completed,
            new_desc: null,
            new_ass: null,
            new_date: null,
            new_completed: this.state.check
        };

        /*this.state.desc === '' ? this.props.todoItem.description = 'Unknown' : this.props.todoItem.description = this.state.desc;
        this.state.ass === '' ? this.props.todoItem.assigned_to = 'Unknown' : this.props.todoItem.assigned_to = this.state.ass;
        this.state.date === '' ? this.props.todoItem.due_date = '0000-00-00' : this.props.todoItem.due_date = this.state.date;
        this.props.todoItem.completed = this.state.check;*/

        this.state.desc === '' ? trans2.new_desc = 'Unknown' : trans2.new_desc = this.state.desc;
        this.state.ass === '' ? trans2.new_ass = 'Unknown' : trans2.new_ass = this.state.ass;
        this.state.date === '' ? trans2.new_date = '0000-00-00' : trans2.new_date = this.state.date;

        if (this.props.newOrNot===false || this.state.new===false) {
        //if(this.state.desc!=='Unknown' && this.state.ass!=='Unknown'&&this.state.date!=='0000-00-00'&&this.state.check!==false){
            if((this.state.desc!==this.props.todoItem.description || this.state.ass!==this.props.todoItem.assigned_to || this.state.date!==this.props.todoItem.due_date || this.state.check!==this.props.todoItem.completed)){
                console.log('different');
                var item = this.props.tps.addTransaction(trans2);
            }else{
                console.log('same');
            }
            
            console.log(item);
            //}
        }   
        if(this.state.desc==='Unknown' && this.state.ass==='Unknown'&&this.state.date==='0000-00-00'&&this.state.check===false){
            console.log('NEW');
        }
        /*} else {
            console.log('new')
            this.props.todoItem.description = trans.new_desc;
            this.props.todoItem.assigned_to = trans.new_ass;
            this.props.todoItem.due_date = trans.new_date;
            this.props.todoItem.completed = trans.new_completed;
            this.props.todoItem.new = false;
            console.log(this.props.tps.transactions);
        }*/


        //console.log(this.props.todoItem);
        this.props.loadList(this.props.todoList);
        console.log(this.props.todoList);
    }

    cancelChanges = () => {
        //if (this.props.todoItem.new===true) {
            /*var item = this.props.tps.undoTransaction();
            console.log(item);*/
            //this.props.tps.transactions
           // this.props.todoList.items.splice(this.props.todoList.items.length - 1, 1);
        //}
        this.props.goToList();
    }

    render() {
        console.log(this.props.todoItem);
        return (
            <div id='item_form_container'>
                <div id='item_heading'>
                    <h1>Item</h1>
                </div>
                <div id="item_content">
                    <span id="item_description_prompt" className='item_prompt'>Description:</span>
                    <input
                        type="text"
                        id="item_description_textfield"
                        className=".item_input"
                        value={this.state.desc}
                        placeholder="Unknown"
                        onChange={this.onChangeDescription}
                    ></input>
                    <br></br>
                    <span id="item_assigned_to_prompt" className='item_prompt'>Assigned To:</span>
                    <input
                        type="text"
                        id="item_assigned_to_textfield"
                        className=".item_input"
                        value={this.state.ass}
                        placeholder="Unknown"
                        onChange={this.onChangeAssignment}
                    ></input>
                    <br></br>
                    <span id="item_due_date_prompt" className='item_prompt'>Due Date:</span>
                    <input
                        type="date"
                        id="item_due_date_picker"
                        className=".item_input"
                        value={this.state.date}
                        onChange={this.onChangeDate}
                    ></input>
                    <br></br>
                    <span id="item_completed_prompt" className='item_prompt'>Completed</span>
                    <input
                        type="checkbox"
                        id="item_completed_checkbox"
                        className=".item_input"
                        checked={this.state.check}
                        onChange={this.onChangeComplete}
                    ></input>
                    <div className="item_button">
                        <button onClick={this.submitChanges}>Submit</button>
                        <button onClick={this.cancelChanges}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
