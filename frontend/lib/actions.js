import flags, {statuses} from "./flags";
import resources from '../lib/resources';
import {cafeList, listFilters} from '../lib/localData';
import {parseCafeList} from '../lib/dist';

function changeName(name) {
	return {
		type: flags.changeName,
		payload: {userName: name},
	}
}

export {changeName};

function getCafeList(dispatch) {

	/*
		Не стал использовать fetch из-за проблем скоупа window
	*/

	(function queryCafeList($) {
		setTimeout(()=>{
			dispatch(compLoadCafeList(parseCafeList(cafeList)));
		}, 2000);//Эмитация запроса
		/*$.ajax(resources.queryCafeList, {
			crossDomain: true,
			success: (data)=>{
				console.log(data);
				//dispatch(compLoadCafeList(flags.compCafeList, data));
			},//Пробросить данные
			error: ()=>{
				setTimeout(()=>{
					queryCafeList($);
				}, 1000);
			},
			cache: false,
		});*/
	})(jQuery);
	
	//dispatch()
}

export {getCafeList};

function compLoadCafeList(data) {
	return {
		type: flags.compCafeList,
		payload: {
			status: statuses.showMainScreen,
			listPlaces: data,
		}
	}
}

export {compLoadCafeList};

function getFiters(dispatch) {
	dispatch(compLoadFilters(listFilters));
}

export {getFiters};

function compLoadFilters(data) {
	return {
		type: flags.loadFilters,
		payload: {
			filtersList: data,
		}
	}
}

export {compLoadFilters};

function setFilters(filters) {
	return {
		type: flags.setFilters,
		payload: {
			selectFilters: filters,
		}
	}
}

export {setFilters};