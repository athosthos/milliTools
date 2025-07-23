const dateConverterForm = document.querySelector('#dateConverterForm');

dateConverterForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const dataini = document.querySelector('#dateInput1').value; 
    const datafim = document.querySelector('#dateInput2').value; 

    const mili1 = new Date(dataini).getTime();
    const mili2 = new Date(datafim).getTime();

    const result = `BETWEEN ${mili1} AND ${mili2 + 59999}`;

    const output1 = document.querySelector('.output-mili');
    output1.innerHTML = result;
});

document.addEventListener('DOMContentLoaded', () => {
    const dateInput1 = document.querySelector('#dateInput1');
    const dateInput2 = document.querySelector('#dateInput2');

    function formatDateTimeLocal(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); 
    dateInput1.value = formatDateTimeLocal(todayStart);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 0, 0); 
    dateInput2.value = formatDateTimeLocal(todayEnd);
});