const express = require('express');
const app = express();

// realizar la conexión a la BD
const bd = require('./infrastructure/bd');
bd.conectar();

const PUERTO = 3020;

app.listen(PUERTO, () => {
    console.log(`Servicio iniciado a través de la url http://localhost:${PUERTO}`);
})