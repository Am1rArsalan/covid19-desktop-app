export function getRandomBorderColor(len) {
    const materialColors = [
        '#C62828',
        '#1565C0',
        '#FF6F00',
        '#33691E',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        '#D81B60',
        '#4527A0',
        '#1A237E',
        '#01579B',
        '#1B5E20',
        '#827717',
        '#F9A825',
        '#37474F',
        '#004D40'
    ]

    const colors = [];
    for (let idx = 0; idx < len; idx++) {
        colors.push(materialColors[Math.round(Math.random(14) * 10)]);
    }
    return colors;
}



export function getRandomBackgroundColor(len) {
    const materialColors = [
        '#EF9A9A',
        '#64B5F6',
        '#FFECB3',
        '#DCEDC8',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        '#E57373',
        '#E1BEE7',
        '#9FA8DA',
        '#81D4FA',
        '#81C784',
        '#E6EE9C',
        '#FFEE58',
        '#CFD8DC',
        '#A7FFEB']

    const colors = [];
    for (let idx = 0; idx < len; idx++) {
        colors.push(materialColors[Math.round(Math.random(14) * 10)]);
    }
    return colors;
}

export function formatDate(date) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + (date.getDate());
    let year = '' + (date.getFullYear());

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-')
}


export function parseDate(dateStr) {
    const ymd = dateStr.split('-');
    return new Date(ymd[0], ymd[1] - 1, ymd[2]);
}


export function datedDiff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

export function extractDataSet(data) {
    let resultPerDate = {} ; 
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            for (let item of data[key]) {
                if (resultPerDate[item.date]) {
                    resultPerDate = {
                        ...resultPerDate,
                        [item.date]: resultPerDate[item.date] + item.confirmed
                    }
                } else {
                    resultPerDate = {
                        ...resultPerDate,
                        [item.date]: item.confirmed
                    }
                }

            }
        }
    }

    return resultPerDate ; 
}

export function extractDatesAndConfirmed(data){ 
    const dates = [] ;
    const confirmed = [] ; 
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const conf = data[key];
            dates.push(key);
            confirmed.push(conf)
        }
    }
    return { 
        dates  , confirmed 
    }
}


export function getCanvasConfig(alldays ,allCases , confirmedLength ) {
    return {
        type: "bar",
        data: {
            labels: alldays,
            datasets: [
                {
                    label: "Total Corona Cases That Confirmed ",
                    data: allCases,
                    backgroundColor: getRandomBackgroundColor(confirmedLength),
                    borderColor: getRandomBorderColor(confirmedLength),
                    borderWidth: 1
                }
            ]
        },
        options: {
            onHover: (event) => {
                event.target.style.cursor = 'pointer'
            }
        }
    }
}