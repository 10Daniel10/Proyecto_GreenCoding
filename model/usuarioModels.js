const { Schema, model } = require('mongoose')

const usuario = new Schema({
    nombre: {
        type: String,
        required: true
    },
    identificacion: {
        type: Number,
        unique: true,
        required: true
    },
    correo:{
        type:String,
        unique:true,

    },
    clave: {
        type: String,
        required: true
    },
    perfil: {
        type: String,
        default: "activo"
    },
    rol:{
        type: String,
        require:true,

    },
})
module.exports = model('usuarios', usuario,"usuarios")