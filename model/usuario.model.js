const { Schema, model } = require('mongoose');

const usuarios = new Schema({

    id: {
        type: String,
        require: true,
        unique: true
    },
    identificacion: {
        type: Number,
        unique: true,
        required: true
    },
    nombre: {
        type: String,
        require: true
    },
    estado: {
        type: String,
        enum: ['Autorizado', 'NoAutorizado', 'Pendiente'],
        default: 'Pendiente'
    },
    perfil: {
        type: String,
        default: "Inactivo"
    },
    correo: {
        type: String,
        require: true
    },
    email:{
        type:String,
        unique:true,

    },
    clave: {
        type: String,
        require: true
    },
    rol:{
        type: String,
        require:true,

    },
    tipo: {
        type: String,
        enum: ['Administrador', 'Estudiante', 'Lider'],
        require: true
    }
});

module.exports = model('usuarios', usuarios)