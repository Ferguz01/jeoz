document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculation-form');
    const addUnidadBtn = document.getElementById('add-unidad');
    const unidadesContainer = document.getElementById('unidades-container');
    const resultadosContainer = document.getElementById('resultados-container');

    addUnidadBtn.addEventListener('click', () => {
        const newUnidadDiv = document.createElement('div');
        newUnidadDiv.className = 'unidad-especifica';
        newUnidadDiv.innerHTML = `
            <label for="unidades-especificas">Unidades Específicas:</label>
            <input type="number" class="unidades-especificas" name="unidades-especificas" required><br><br>
        `;
        unidadesContainer.appendChild(newUnidadDiv);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const totalUnidades = parseFloat(document.getElementById('total-unidades').value);
        const montoTotal = parseFloat(document.getElementById('monto-total').value);
        const unidadesEspecificas = document.querySelectorAll('.unidades-especificas');
        
        resultadosContainer.innerHTML = ''; // Clear previous results
        
        unidadesEspecificas.forEach(unidadInput => {
            const unidades = parseFloat(unidadInput.value);
            const montoCorrespondiente = (unidades / totalUnidades) * montoTotal;
            const resultDiv = document.createElement('div');
            resultDiv.textContent = `Unidades: ${unidades}, Monto Correspondiente: ${montoCorrespondiente.toFixed(2)}`;
            resultadosContainer.appendChild(resultDiv);
        });
    });
});
