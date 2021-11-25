const Proyectos = require('../model/proyecto.model');

const obtenerProyectos = async () => {
    return await Proyectos.find({}).populate("lider")
        .populate("estudiantesInscritos.estudiante")
        .populate("estudiantesInscritos.proyecto", "nombreProyecto")
}

module.exports = {
    obtenerProyectos
}