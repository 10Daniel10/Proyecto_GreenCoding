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
    lider: {
        type: Schema.Types.ObjectId,
        ref: "usuarios",
        require: true
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Inactivo'
    },
    fase: {
        type: String,
        enum: ['Iniciado', 'EnDesarrollo', 'Terminado', 'Nulo'],
        default: 'Nulo'
    },
    estudiantesInscritos: [
        estudianteInscrito
    ],
    avances: [
        avance
    ]

});

module.exports = model('proyectos', proyectos)