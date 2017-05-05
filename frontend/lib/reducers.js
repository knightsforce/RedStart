import { combineReducers } from 'redux';
import flags from "./flags";

/*
	Многие флаги повторяют функционал, в контексте теста - бесмсленно,
	но если добавится определенный функционал к какому-то действию, то не придется переписывать
	в разных файлах, добавляя флаги, а просто здесь вставить еще один case: break.
*/

function cafeList(storeCafeList={}, action) {
	switch(action.type) {
		case flags.compCafeList:
			storeCafeList = Object.assign({}, storeCafeList, {
				status: action.payload.status,
				listPlaces: action.payload.listPlaces,
			});
			break;
		case flags.loadFilters:	
		case flags.changeName:
		case flags.setFilters:
			storeCafeList = Object.assign({}, storeCafeList, action.payload);
			break;

		default:
			break;
	}
	return storeCafeList;
}

let rootReducer = combineReducers({
	cafeList,
});

export default rootReducer;