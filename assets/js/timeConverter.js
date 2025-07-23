const timeConverterForm = document.getElementById('formTimeCoverter');
const invertButton = document.getElementById('invertTime'); 

function convertTime() {

    const selectInput = document.querySelector('#timeSelecionLeft'); 
    const timeInput = document.querySelector('#timeInput'); 
    const selectOutput = document.querySelector('#timeSelecionRight'); 
    const timeOutput = document.querySelector('.timeOutput');

    const conversionRatesToMs = {
        'millisecond': 1,
        'second': 1000,
        'minute': 60 * 1000,
        'hour': 60 * 60 * 1000,
        'day': 24 * 60 * 60 * 1000,
        'week': 7 * 24 * 60 * 60 * 1000,
        'month': 30 * 24 * 60 * 60 * 1000,
        'year': 365 * 24 * 60 * 60 * 1000,
        'decade': 10 * 365 * 24 * 60 * 60 * 1000
    };

    const inputValue = parseFloat(timeInput.value);

    if (isNaN(inputValue) || !conversionRatesToMs[selectInput.value] || !conversionRatesToMs[selectOutput.value]) {
        timeOutput.textContent = 'Selecione unidades válidas e insira um número.';
        return;
    }

    const timeInMilliseconds = inputValue * conversionRatesToMs[selectInput.value];
    const convertedTime = timeInMilliseconds / conversionRatesToMs[selectOutput.value];

    timeOutput.textContent = parseFloat(convertedTime.toFixed(4));
}

timeConverterForm.addEventListener('submit', function(evento) {
    evento.preventDefault(); 
    convertTime();
});

invertButton.addEventListener('click', function() {

    const selectInput = document.querySelector('#timeSelecionLeft');
    const timeInput = document.querySelector('#timeInput');
    const selectOutput = document.querySelector('#timeSelecionRight');
    const timeOutput = document.querySelector('.timeOutput');

    let tempSelectValue = selectInput.value;
    selectInput.value = selectOutput.value;
    selectOutput.value = tempSelectValue;

    if (timeOutput.textContent) {
        timeInput.value = parseFloat(timeOutput.textContent);
    } else {
        timeInput.value = '';
    }

    timeOutput.textContent = '';

});