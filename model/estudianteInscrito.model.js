const { Schema } = require('mongoose');

const estudianteInscrito = new Schema({

    idProyecto: {
        type: Schema.Types.ObjectId,
        ref: "proyectos"
    },
    idEstudiante: {
        type: String,
        required: true
    },
    nombreEstudiante: {
        type: String,
        require: true
    },
    estado: {
        type: String
    },
    fechaIngreso: {
        type: Date
    },
    fechaEgreso: {
        type: Date
    }

})

module.exports = estudianteInscrito;