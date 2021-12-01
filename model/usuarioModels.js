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
    email:{
        type:String,
        unique:true,

    },
    clave: {
        type: String,
        required: true
    },
    perfil: {
        type: String,
        default: "Inactivo"
    },
    clave: {
        type: String,
        required: true
    }
})
module.exports = model('usuarios', usuario,"usuarios")