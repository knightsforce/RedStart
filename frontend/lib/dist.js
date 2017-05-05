function parseCafeList(dataObj) {
	let dataArr = dataObj.data;
	return dataArr.map((item)=>{
		return {
			id: item.id,
			name: item.name,
			logo: "https://batutto.com"+item.logo,
			revGood: item.review_good_all+"",
			revBad: item.review_bad_all+"",
			filters: item.filter,
		};
	});
}

export {parseCafeList};