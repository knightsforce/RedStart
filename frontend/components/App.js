/*

	Чтобы вам было проще понять почему я действовал так, а не иначе
	я оставил в коде комментарии с пояснениями.

*/


/*

	Сложные компоненты - классы.
	Простые, которые не нуждаются в управлении Redux Store
	и состоянии - функции.

	Классы с маленькой буквы у простых компонетов (не классы или функции),
	у остальных с большой

*/


import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import rootReducer from '../lib/reducers';
import * as actions from '../lib/actions';
import flags, {statuses} from "../lib/flags";
import resources from '../lib/resources';

import thunk from 'redux-thunk';

import LoadScreen from './LoadScreen';
import MainScreen from './MainScreen';

/*
	Просто отлавливаю нажатую клавишу на документе
*/

var initState = {
	cafeList: {
		userName: resources.initUserName,
		status: statuses.loadApp,
		listPlaces: [],
		filtersList: null,
		selectFilters: {},
	}
}

const store = createStore(rootReducer, initState, applyMiddleware(thunk));

class App extends Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		let {storeCafeList, getCafeList, getFilters, changeName, setFilters} = this.props;

		let Screen = null;
		
		switch(storeCafeList.status) {
			case statuses.loadApp:
				Screen = <LoadScreen getCafeList={getCafeList} getFilters={getFilters}/>;
				break;

			case statuses.showMainScreen:
				if(storeCafeList.filtersList) {
					Screen = <MainScreen
						store={storeCafeList}
						changeName={changeName}
						setFilters={setFilters}
					/>;
				} else {
					Screen = <LoadScreen getCafeList={getCafeList} getFilters={getFilters}/>;
				}
				break;
		}

		return (
			<div className="App">
				{Screen}
			</div>
		);
  }
}

function mapStateToProps(state) {
	return {storeCafeList: state.cafeList};
}

function mapDispatchToProps(dispatch) {
	return {
		getCafeList: ()=>{
			dispatch(actions.getCafeList);
		},
		getFilters: ()=>{
			dispatch(actions.getFiters);
		},
		changeName: (name)=>{
			dispatch(actions.changeName(name));
		},
		setFilters: (filters)=>{
			dispatch(actions.setFilters(filters));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {store};