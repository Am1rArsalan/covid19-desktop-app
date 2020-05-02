export const config = {
    type: "bar",
    data: {
        labels: alldays,
        datasets: [
            {
                label: "Total Corona Cases That Confirmed ",
                data: allCases,
                backgroundColor: getRandomBackgroundColor(confirmed.length),
                borderColor: getRandomBorderColor(confirmed.length),
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