const timeConverterForm = document.getElementById('formTimeCoverter');
const invertButton = document.getElementById('invertTime'); 

function convertTime() {
    const selectInput = document.querySelector('#timeSelecionLeft');
    const timeInput = document.querySelector('#timeInput');
    const selectOutput = document.querySelector('#timeSelecionRight');
    const timeOutput = document.querySelector('.timeOutput');

    const units = ['millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'year', 'decade'];

    const conversionRates = {
        'millisecond': 1000, 
        'second': 60,      
        'minute': 60,      
        'hour': 24,        
        'day': 7,          
        'week': 4.345,     
        'month': 12,       
        'year': 10,        
        'decade': null     
    };

    const specialConversion = {
        'month-year': 12, 
        'month-decade': 120, 
        'year-month': 12, 
        'decade-month': 120 
    };

    const inputValue = parseFloat(timeInput.value);
    const unitInput = selectInput.value;
    const unitOutput = selectOutput.value;

    if (isNaN(inputValue)) {
        timeOutput.textContent = 'Por favor, insira um número válido.';
        return;
    }

    let convertedTime = 0;

    if (unitInput === 'month' && (unitOutput === 'year' || unitOutput === 'decade')) {
        if (unitOutput === 'year') {
            convertedTime = inputValue / specialConversion['month-year'];
        } else {
            convertedTime = inputValue / specialConversion['month-decade'];
        }
    } else if ((unitInput === 'year' || unitInput === 'decade') && unitOutput === 'month') {
        if (unitInput === 'year') {
            convertedTime = inputValue * specialConversion['year-month'];
        } else {
            convertedTime = inputValue * specialConversion['decade-month'];
        }
    } else {
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

        if (!conversionRatesToMs[unitInput] || !conversionRatesToMs[unitOutput]) {
            timeOutput.textContent = 'Selecione unidades válidas.';
            return;
        }

        const timeInMilliseconds = inputValue * conversionRatesToMs[unitInput];
        convertedTime = timeInMilliseconds / conversionRatesToMs[unitOutput];
    }
    
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