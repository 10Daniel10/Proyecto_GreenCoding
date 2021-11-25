const { Schema } = require('mongoose');

const avance = new Schema({

    idProyecto: {
        type: Schema.Types.ObjectId,
        ref: "proyectos"
    },
    fechaAvance: {
        type: Date,
        default: new Date()
    },
    descripcion: {
        type: String
    },
    observacion: {
        type: String
    }

})

module.exports = avance;