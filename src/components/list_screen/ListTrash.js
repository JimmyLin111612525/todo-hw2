import React, { Component } from 'react'

export class ListTrash extends Component {
    state = {
        modal: 'modal',
    }

    modalAnim = () => {
        document.removeEventListener('keydown', this.props.undo_redo);
        this.setState({ modal: 'modal is_visible' });
        console.log(this.state);
        //this.props.deleteList();
    }

    cancelDelete = () => {
        document.addEventListener('keydown', this.props.undo_redo);
        this.setState({ modal: 'modal' });
    }

    submitDelete = () => {
        this.props.deleteList();
    }

    render() {
        return (
            <div>
                <div id="list_trash" onClick={this.modalAnim}>&#128465;</div>
                <div className={this.state.modal} data-animation="rotateInOutDown">
                    <div className='modal_dialog'>
                        <p className='modal_header'>
                            Delete List?
                        </p>
                        <strong>Are you sure you want to delete this list?</strong>
                        <br></br>
                        <br></br>
                        <div id='modal_buttons'>
                            <button onClick={this.submitDelete}>Submit</button> <button onClick={this.cancelDelete}>Cancel</button>
                        </div>
                        <p className='modal_footer'>
                            The list will not be retrievable.
                        </p>
                    </div>

                </div>
            </div>
        )
    }
}

export default ListTrash
