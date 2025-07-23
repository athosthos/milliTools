document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCreateRules');
    const outputDiv = document.querySelector('.outputHTML');
    const convertButton = document.getElementById('convert-button1');

    const horizontalRadio = document.querySelector('input[name="globalOrientacao"][value="horizontal"]');
    const verticalRadio = document.querySelector('input[name="globalOrientacao"][value="vertical"]');
    const noTableRadio = document.querySelector('input[name="globalOrientacao"][value="noTable"]');

    function generateID(prefix = '') {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return `${prefix}${crypto.randomUUID()}`;
        } else {
            return `${prefix}${Date.now()}-${Math.floor(Math.random() * 100000)}`;
        }
    }

    function collectAllRuleData() {
        const allRulesData = [];
        const ruleBlocks = form.querySelectorAll('.createRules');

        const selectedGlobalOrientation = document.querySelector('input[name="globalOrientacao"]:checked');
        const globalOrientationValue = selectedGlobalOrientation ? selectedGlobalOrientation.value : 'horizontal';

        const isNoTableMode = globalOrientationValue === 'noTable'; 

        ruleBlocks.forEach(block => {
            const titleInput = block.querySelector('.titleInput');
            const descInput = block.querySelector('.descInput');
            const mainRuleCheckbox = block.querySelector('.mainRuleCheckbox');

            allRulesData.push({
                title: titleInput ? titleInput.value : '',
                description: descInput ? descInput.value : '',
                orientation: globalOrientationValue,
                isMainRule: isNoTableMode ? true : (mainRuleCheckbox ? mainRuleCheckbox.checked : false)
            });
        });
        return allRulesData;
    }

    function renderOutput() {
        const rulesData = collectAllRuleData();
        let generatedHtml = '';

        if (rulesData.length === 0) {
            generatedHtml = '<p>Nenhuma regra para gerar.</p>';
        } else {
            const globalOrientation = rulesData[0].orientation;
            let mainRulesContent = ''; 

            let nonMainRules = [];

            rulesData.forEach(rule => {
                if (globalOrientation === 'noTable' || rule.isMainRule) { 
                    mainRulesContent += `<b>${rule.title || 'Regra Sem Título'}:</b> ${rule.description || 'Regra Sem Descrição'}<br>\n`;
                } else {
                    nonMainRules.push(rule);
                }
            });

            if (mainRulesContent === '') {
                mainRulesContent = '';
            } else {
                mainRulesContent = mainRulesContent.trim().replace(/<br>\n$/, '');
            }

            generatedHtml += `
<style type="text/css">
    
.althelp {
max-height: 230px;
max-width: 1500px;
overflow-y: auto;
}

.phelp {
font-size: 12px;
}

.divhelp {
overflow-x: auto;
}

.tablehelp th {
background-color: #EEEEEE;
}

.tablehelp {
border-collapse: collapse;
}

.tablehelp td {
max-width: 180px;
min-width: 120px;
word-wrap: break-word;
padding: 6px;
font-size: 11px;
border: 1px solid black;
}

.tablehelp th {
max-width: 180px;
word-wrap: break-word;
padding: 6px;
font-size: 11px;
border: 1px solid black;
}

</style>

<body class="bodyhelp">

<div class="althelp">

<p class="phelp">
${mainRulesContent}
</p>
`;
            if (globalOrientation !== 'noTable') {
                generatedHtml += `
<div class="divhelp">
<table class="tablehelp">

`;
                if (globalOrientation === 'vertical') {
                    if (nonMainRules.length > 0) {
                        nonMainRules.forEach(rule => {
                            generatedHtml += `<tr>\n`;
                            generatedHtml += `<th>${rule.title || 'Título Vazio'}</th>\n`;
                            generatedHtml += `<td>${rule.description || 'Descrição Vazia'}</td>\n`;
                            generatedHtml += `</tr>\n`;
                        });
                    } else {
                        generatedHtml += `<tr><th>Nenhuma regra não-principal.</th><td></td></tr>\n`;
                    }
                } else { 
                    if (nonMainRules.length > 0) {
                        generatedHtml += `<tr>\n`;
                        nonMainRules.forEach(rule => {
                            generatedHtml += `<th>${rule.title || 'Título Vazio'}</th>\n`;
                        });
                        generatedHtml += `</tr>\n`;

                        generatedHtml += `<tr>\n`;
                        nonMainRules.forEach(rule => {
                            generatedHtml += `<td>${rule.description || 'Descrição Vazia'}</td>\n`;
                        });
                        generatedHtml += `</tr>\n`;
                    } else {
                        generatedHtml += `<tr><th>Nenhuma regra não-principal.</th></tr>\n`;
                        generatedHtml += `<tr><td></td></tr>\n\n`;
                    }
                }

                generatedHtml += `
</table>
</div>
</div>
</body>
`; 
            }

            generatedHtml += `
</div>
</body>`; 

        }

        outputDiv.innerHTML = `${escapeHtml(generatedHtml)}`;
    }

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    convertButton.addEventListener('click', (event) => {
        event.preventDefault();
        renderOutput();
    });

    // --- Lógica para mostrar/esconder o checkbox e redefinir a mainRule ---
    form.addEventListener('change', (event) => {
        const target = event.target;

        if (target.name === 'globalOrientacao') {
            const isNoTableMode = target.value === 'noTable';
            const allCheckboxes = form.querySelectorAll('.mainRuleCheckbox');
            const allCheckboxContainers = form.querySelectorAll('.checkbox-container');

            allCheckboxContainers.forEach(container => {
                if (isNoTableMode) {
                    container.style.display = 'none'; // Esconde o container do checkbox
                } else {
                    container.style.display = ''; // Mostra o container (usa o padrão do CSS)
                }
            });

            if (isNoTableMode) {
                allCheckboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });
            }
        }
    });


    form.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('button-add')) {
            event.preventDefault();

            const uniqueId = generateID('rule-block-');
            const selectedGlobalOrientation = document.querySelector('input[name="globalOrientacao"]:checked');
            const isNoTableMode = selectedGlobalOrientation && selectedGlobalOrientation.value === 'noTable';

            const checkboxContainerStyle = isNoTableMode ? 'style="display: none;"' : '';

            const htmlToInsert = `
                <div class="createRules" id="rule-block-${uniqueId}">
                    <div class="description">
                        <div class="inputs">
                            <input type="text" class="titleInput" id="inputNameGeneralRule-${uniqueId}" placeholder="Digite o título."></input>
                            <textarea id="inputDescriptionGeneralRule-${uniqueId}" class="descInput" placeholder="Digite a regra."></textarea>
                        </div>
                        <div class="checkbox-container" ${checkboxContainerStyle}>
                            <label>
                                <input type="checkbox" class="mainRuleCheckbox" id="mainRule-${uniqueId}">Regra Principal
                            </label>
                        </div>
                        <div class="buttons">
                            <button type="button" class="button-add">+</button>
                            <button type="button" class="button-del">🗑</button>
                        </div>
                    </div>
                </div>
            `;

            const currentRuleBlock = target.closest('.createRules');
            if (currentRuleBlock) {
                currentRuleBlock.insertAdjacentHTML('afterend', htmlToInsert);
            } else {
                const leftDiv = document.querySelector('.left');
                if (leftDiv) {
                    leftDiv.querySelector('form').insertAdjacentHTML('beforeend', htmlToInsert);
                } else {
                    form.insertAdjacentHTML('beforeend', htmlToInsert);
                }
            }
        }

        if (target.classList.contains('button-del')) {
            event.preventDefault();

            const allRuleBlocks = document.querySelectorAll('.createRules');

            if (allRuleBlocks.length <= 1) {
                alert("Você não pode excluir o último campo de regra.");
                return;
            }

            const ruleBlockToRemove = target.closest('.createRules');
            if (ruleBlockToRemove) {
                ruleBlockToRemove.remove();
            }
        }
    });

    const initialSelectedRadio = document.querySelector('input[name="globalOrientacao"]:checked');
    if (initialSelectedRadio) {
        const event = new Event('change');
        initialSelectedRadio.dispatchEvent(event);
    }

    outputDiv.innerHTML = '';
});