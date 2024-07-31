const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear cuerpos de solicitud
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Almacenamiento de datos en memoria
let dataStore = [];

// Ruta para servir el archivo formulario.html
app.get('/formulario.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'formulario.html'));
});

// Ruta para obtener datos
app.get('/data', (req, res) => {
    res.json(dataStore);
});

// Ruta para recibir datos del formulario
app.post('/submit-form', (req, res) => {
    const { codpro, nompro, ggn } = req.body;
    if (codpro && nompro && ggn) {
        const newData = { id: Date.now().toString(), codpro, nompro, ggn };
        dataStore.push(newData);
        res.sendStatus(200); // Éxito
    } else {
        res.sendStatus(400); // Datos incompletos
    }
});

// Ruta para editar datos
app.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { codpro, nompro, ggn } = req.body;
    const index = dataStore.findIndex(item => item.id === id);
    if (index !== -1) {
        dataStore[index] = { id, codpro, nompro, ggn };
        res.sendStatus(200); // Éxito
    } else {
        res.sendStatus(404); // Dato no encontrado
    }
});

// Ruta para eliminar datos
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const index = dataStore.findIndex(item => item.id === id);
    if (index !== -1) {
        dataStore.splice(index, 1);
        res.sendStatus(200); // Éxito
    } else {
        res.sendStatus(404); // Dato no encontrado
    }
});

// Puerto en el que el servidor escucha las solicitudes
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
