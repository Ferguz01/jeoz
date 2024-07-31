document.addEventListener('DOMContentLoaded', () => {
    const dataForm = document.getElementById('dataForm');
    const dataList = document.getElementById('dataList');

    // Función para obtener y mostrar los datos
    function loadData() {
        fetch('/data')
            .then(response => response.json())
            .then(data => {
                dataList.innerHTML = ''; // Limpiar la lista antes de llenarla
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        Código: ${item.codigoProductor}, Nombre: ${item.nombreProductor}, GGN: ${item.ggn}
                        <button onclick="editData('${item.id}')">Editar</button>
                        <button onclick="deleteData('${item.id}')">Eliminar</button>
                    `;
                    dataList.appendChild(li);
                });
            });
    }

    // Enviar el formulario
    dataForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        fetch('/submit-form', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            loadData(); // Actualizar la lista después de enviar el formulario
        })
        .catch(error => console.error('Error:', error));
    });

    // Editar un dato
    window.editData = function (id) {
        const newCodigo = prompt('Nuevo Código de Productor:');
        const newNombre = prompt('Nuevo Nombre de Productor:');
        const newGgn = prompt('Nuevo GGN:');

        fetch(`/edit/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ codigoProductor: newCodigo, nombreProductor: newNombre, ggn: newGgn })
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            loadData(); // Actualizar la lista después de editar
        })
        .catch(error => console.error('Error:', error));
    };

    // Eliminar un dato
    window.deleteData = function (id) {
        fetch(`/delete/${id}`, { method: 'DELETE' })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                loadData(); // Actualizar la lista después de eliminar
            })
            .catch(error => console.error('Error:', error));
    };

    // Cargar datos cuando se carga la página
    loadData();
});
