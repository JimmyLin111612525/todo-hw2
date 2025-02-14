import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import jsTPS from './jsTPS/jsTPS.js'


const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    currentItem: null,
    tps: new jsTPS(),
    name: null,
    owner: null,
    newOrNot:null,
  }

  goHome = () => {
    this.state.tps.clearAllTransaction();
    this.setState({ currentScreen: AppScreen.HOME_SCREEN });
    this.setState({ currentList: null });
  }

  goToList = () => {
    this.setState({ currentScreen: AppScreen.LIST_SCREEN });
  }

  loadList = (todoListToLoad) => {
    this.setState({ currentScreen: AppScreen.LIST_SCREEN });
    this.setState({ currentList: todoListToLoad });
    this.setState({ name: todoListToLoad.name });
    this.setState({ owner: todoListToLoad.owner });
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }


  newList = () => {
    let list = {
      key: this.state.todoLists.length,
      name: 'Unknown',
      owner: 'Unknown',
      items: []
    }
    this.setState({ todoLists: [...this.state.todoLists, list] });
    this.setState({ currentScreen: AppScreen.LIST_SCREEN });
    this.setState({ currentList: list });
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
    console.log(list);
  }

  deleteList = () => {

    let counter = 0;
    let lists = this.state.todoLists;
    lists.splice(this.state.currentList.key, 1);
    lists.map(list => {
      if (list.key !== counter) {
        list.key = counter;
      }
      counter++;
    })
    this.setState({ todoLists: lists });
    this.goHome();
  }

  editItem = (item,newItem) => {
    //console.log(item);
    this.setState({ currentScreen: AppScreen.ITEM_SCREEN });
    this.setState({ currentItem: item });
    this.setState({newOrNot:newItem});
  }

  undo_redo = (e) => {
    let tPs = this.state.tps;
    if (e.keyCode === 90) {
      if (tPs.peekUndo() !== null) {
        var lst = tPs.undoTransaction();
        //if(lst!==null ){
        console.log('undo caught!');
        this.setState({ name: lst.name });
        this.setState({ owner: lst.owner });
        var newLst = this.state.currentList;
        newLst.name = lst.name;
        newLst.owner = lst.owner;
        newLst.items = lst.items;
        for (var i = 0; i < newLst.items.length; i++) {
          newLst.items[i].key = i;
        }
        console.log(newLst.items);
        this.setState({ currentList: newLst });

        this.setState({ tps: tPs });
        this.loadList(this.state.currentList);
        //console.log(this.props.tps);
        //return this.state.currentList;
        //}
      }
    } else if (e.keyCode === 89) {
      if (tPs.peekDo() !== null) {
        var lst = tPs.doTransaction();
        //if(lst!==null ){
        this.setState({ name: lst.name });
        this.setState({ owner: lst.owner });

        var newLst = this.state.currentList;
        newLst.name = lst.name;
        newLst.owner = lst.owner;
        //newLst.items=lst.items;

        /*for(var i=0;i<newLst.items.length;i++){
          newLst.items[i].key=i;
        }*/

        this.setState({ currentList: newLst });

        this.setState({ tps: tPs });
        this.goToList();
        //this.loadList(this.state.currentList);
        //return this.state.currentList;
        //}
      }
    }
  }

  onChangeName = (e) => {
    this.setState({ name: e.target.value });

    var oldListName = this.state.currentList.name;

    if (e.target.value.trim() === '') {
      //edit-------------------------------------
      let trans = {
        currentList: this.state.currentList,
        oldListName: this.state.currentList.name,
        newListName: 'Unknown'
      };

      this.state.tps.addTransaction(trans);
      //edit----------------------------------------

      //this.props.todoList.name = 'Unknown';
    } else {

      //edit-------------------------------------
      let trans = {
        currentList: this.state.currentList,
        oldListName: this.state.currentList.name,
        newListName: e.target.value
      };

      this.state.tps.addTransaction(trans);
      //edit----------------------------------------

      //this.props.todoList.name = e.target.value;
    }
  }

  onChangeOwner = (e) => {
    this.setState({ owner: e.target.value });
    var oldOwnerName = this.state.currentList.owner;
    if (e.target.value.trim() === '') {

      //edit-------------------------------------
      let trans = {
        currentList: this.state.currentList,
        oldOwnerName: oldOwnerName,
        newOwnerName: 'Unknown'
      };

      this.state.tps.addTransaction(trans);
      //edit----------------------------------------

      //this.props.todoList.owner = 'Unknown';
    } else {

      //edit-------------------------------------
      let trans = {
        currentList: this.state.currentList,
        oldOwnerName: oldOwnerName,
        newOwnerName: e.target.value
      };

      this.state.tps.addTransaction(trans);
      //edit----------------------------------------

      //this.props.todoList.owner = e.target.value;
    }
  }

  render() {
    switch (this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen
          loadList={this.loadList.bind(this)}
          todoLists={this.state.todoLists}
          newList={this.newList.bind(this)} />;
      case AppScreen.LIST_SCREEN:
        return <ListScreen
          goHome={this.goHome}
          todoList={this.state.currentList}
          editItem={this.editItem}
          deleteList={this.deleteList}
          loadList={this.loadList}
          tps={this.state.tps}
          goToList={this.goToList}
          undo_redo={this.undo_redo}
          name={this.state.name}
          owner={this.state.owner}
          onChangeName={this.onChangeName}
          onChangeOwner={this.onChangeOwner}
        />;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen
          currentScreen={this.state.currentScreen}
          todoItem={this.state.currentItem}
          goToList={this.goToList}
          todoList={this.state.currentList}
          loadList={this.loadList}
          tps={this.state.tps}
          newOrNot={this.state.newOrNot}
        />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;