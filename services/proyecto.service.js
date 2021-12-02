const { argsToArgsConfig } = require('graphql/type/definition');
const Proyectos = require('../model/proyecto.model');
const Usuarios = require('../model/usuario.model');
const Obs = require ('../model/obs.model');

const obtenerProyectos = async () => {
    return await Proyectos.find({})
        .populate("lider")
        .populate("estudiantesInscritos.estudiante")
        .populate("estudiantesInscritos.proyecto", "nombreProyecto")
}

//HU_015
const obtenerMisSolicitudes = async (id) => {
    const lider = await Usuarios.findOne({id})
    return await Proyectos.find({'estudiantesInscritos.estado': "Inactivo", 'lider' : lider._id })
        .populate("lider")
        .populate("estudiantesInscritos.estudiante")
        .populate("estudiantesInscritos.proyecto", "nombreProyecto")
}


//HU_016
const inscribirEstudiante = async (id, idMiProyecto) => {
    const estudiante = await Usuarios.findOne({id})
    return Proyectos.updateOne({ 'estudiantesInscritos.estudiante': estudiante._id, 'idProyecto':idMiProyecto }, { $set:{'estudiantesInscritos.$.estado': 'Activo'}})
                .then(u => "Estudiante incrito en el proyecto seleccionado")
                .catch(err => "Fallo la inscripción");
}


//HU_017
const obtenerMisProyectos = async (id) => {
    const lider = await Usuarios.findOne({id})
    return await Proyectos.find({'lider' : lider._id })
        .populate("lider")
        .populate("estudiantesInscritos.estudiante")
        .populate("estudiantesInscritos.proyecto", "nombreProyecto")
        .populate("avances")
}

//HU_018
const agregarObservacion = async (idMiProyecto, idAvance, obs) => {
    //const nuevaObservacion = new Obs(obs);
    return Proyectos.updateOne({'idProyecto':idMiProyecto, 'avances._id': idAvance}, { $set:{'avances.$.observacion': obs}})
                .then(u => "Observación agregada exitosamente")
                .catch(err => "No se pudo agregar la observacion");
                //{ $set:{'avances.$.observacion': obs}

                /*
                 { $addToSet:
                    {avances: 
                        {observacion : obs
                        },
                        },
                    }
                */ 
}


module.exports = {
    obtenerProyectos,
    obtenerMisSolicitudes,
    obtenerMisProyectos,
    inscribirEstudiante,
    agregarObservacion
}