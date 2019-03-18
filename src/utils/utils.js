export function getData(timeInterval, currency) {
	const promiseData = fetch("https://www.fxempire.com/api/v1/en/markets/" + currency + "/chart?time=" + timeInterval )
		.then(response => response.text())
        .then((data) => {
            const dataArr = JSON.parse(data);
            return dataArr.map(data => ({...data, date: new Date(data.date) })).reverse();
        });
    return promiseData;
    
}
