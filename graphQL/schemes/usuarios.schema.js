const { Schema, model } = require('mongoose');

const usuarios = new Schema({
    id: {
        type: String,
        require: true,
        unique: true
    },
    nombre: {
        type: String,
        require: true
    },
    estado: {
        type: String,
        default: 'Inactivo'
    },
    correo: {
        type: String,
        require: true
    },
    clave: {
        type: String,
        require: true
    },
    tipo: {
        type: String,
        require: true
    }
});

module.exports = model('usuarios', usuarios)