const { Schema } = require('mongoose');

const estudianteInscrito = new Schema({

    /*idEstudianteInscrito: {
        type:String,
        require: true,
        unique: true
    },*/
    estudiante: {
        type: String,
        ref:"usuarios"
    },
    proyecto: {
        type: String,
        ref: "proyectos"
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