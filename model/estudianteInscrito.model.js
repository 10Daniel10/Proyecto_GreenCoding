const { Schema } = require('mongoose');

const estudianteInscrito = new Schema({

    idProyecto: {
        type: Schema.Types.ObjectId,
        ref: "proyectos"
    },
    estudiante: {
        type: Schema.Types.ObjectId,
        ref:"usuarios"
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Inactivo'
    },
    fechaIngreso: {
        type: Date
    },
    fechaEgreso: {
        type: Date
    }

})

module.exports = estudianteInscrito;