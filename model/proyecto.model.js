const { Schema, model } = require('mongoose');
const estudianteInscrito = require('./estudianteInscrito.model');
const avance = require('./avance.model');

const proyectos = new Schema({

    nombre: {
        type: String,
        require: true
    },
    objGeneral: {
        type: String,
        require: true
    },
    objEspecifico: {
        type: String,
        require: true
    },
    presupuesto: {
        type: Number,
        require: true
    },
    fechaInicio: {
        type: Date,
        default: new Date()
    },
    fechaTermina: {
        type: Date
    },
    idLider: {
        type: String,
        require: true
    },
    nombreLider: {
        type: String,
        require: true
    },
    estado: {
        type: String,
        default: "inactivo"
    },
    fase: {
        type: String,
        defauld: null
    },
    estudiantesInscritos: [
        estudianteInscrito
    ],
    avances: [
        avance
    ]

});

module.exports = model('proyectos', proyectos)