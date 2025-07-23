document.addEventListener('DOMContentLoaded', () => {
    const millisecondsInput = document.getElementById('millisecondsInput');
    const convertButton = document.getElementById('convert-button2');
    const outputDiv = document.querySelector('.output-date');

    convertButton.addEventListener('click', (event) => {
        event.preventDefault(); 

        const milliseconds = parseInt(millisecondsInput.value, 10);

        if (isNaN(milliseconds) || milliseconds < 0) {
            outputDiv.textContent = "Valor inválido";
            return; 
        }

        const date = new Date(milliseconds);

        if (isNaN(date.getTime())) {
            outputDiv.textContent = "Valor inválido";
            return;
        }

        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear(); 
        const hours = String(date.getHours()).padStart(2, '0'); 
        const minutes = String(date.getMinutes()).padStart(2, '0'); 

        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

        outputDiv.textContent = formattedDate;
    });
});