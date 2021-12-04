//const { argsToArgsConfig } = require('graphql/type/definition');
const Proyectos = require('../model/proyecto.model');
const Usuarios = require('../model/usuario.model');
const Obs = require ('../model/obs.model');

//HU_006
const obtenerProyectos = async () => {
    return await Proyectos.find({}).populate("lider")
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
    return Proyectos.updateOne({'idProyecto':idMiProyecto, 'avances._id': idAvance}, { $set:{'avances.$.observacion': obs}})
                .then(u => "Observación agregada exitosamente")
                .catch(err => "No se pudo agregar la observacion");
}


const obtenerProyecto = async (idProyecto) => {
    return await Proyectos.findOne({idProyecto}).populate("lider")
        .populate("estudiantesInscritos.estudiante")
}

//HU_013
const obtenerProyectosLider = async (lider1) => {
    return await Proyectos.find({lider: lider1 })
}

//HU_007 y HU_008
const setEstadoProyecto = async (idProyecto, estado) => {
    console.log(`Se está modificando el proyecto con id: ${idProyecto}`);
    const proyecto = await Proyectos.findOne({idProyecto});
    if (proyecto){
        if (proyecto.estado === "Inactivo" && proyecto.fase === "Nulo" && estado === "Activo") {
            // Aprobación del proyecto
            return Proyectos.updateOne({idProyecto}, {$set:{estado, fase: "Iniciado", fechaInicio: new Date()}})
                .then(res => `Proyecto aprobado e iniciado`)
                .catch(err => `Falló el cambio de estado: ${err}`)
        } else if (proyecto.estado === "Inactivo" && proyecto.fase !== "Terminado" && estado === "Activo") {
            // Reactivar proyecto
            return Proyectos.updateOne({idProyecto}, {estado})
                .then(res => `Proyecto reactivado`)
                .catch(err => `Falló el cambio de estado: ${err}`)
        } else if (proyecto.estado === "Activo" && estado === "Inactivo"){
            if(proyecto.fase === "Iniciado" || proyecto.fase === "EnDesarrollo"){
                // Inactivación de proyecto
                return Proyectos.updateOne({idProyecto: idProyecto}, {$set:{estado: estado, 'estudiantesInscritos.$[obj].fechaEgreso': new Date()}},{multi: true, arrayFilters:[{'obj.fechaEgreso':{$exists: false}, 'obj.estado': 'Activo'}]})
                    .then(res => `Proyecto desactivado`)
                    .catch(err => `Falló el cambio de estado: ${err}`)
            } else {
                return "No se puede desactivar el proyecto"
            }
        } else {
            return "Falló cambio de estado del proyecto"
        }
        
    } else {
        return "Proyecto no válido"
    }
}

//HU_009
const setFaseProyecto = async (idProyecto, fase) => {
    console.log(`Se está modificando el proyecto con id: ${idProyecto}`);
    const proyecto = await Proyectos.findOne({idProyecto});
    if ( proyecto ) {
        if (proyecto.estado === "Activo" && proyecto.fase === "EnDesarrollo" && fase === "Terminado") {
            // Proyecto terminado
            return Proyectos.updateOne({idProyecto}, {$set:{fase, estado:"Inactivo", fechaTermina: new Date()}})
                .then(res => `Proyecto terminado`)
                .catch(err => `Falló el cambio de fase: ${err}`)
        }
    } else {
        return "Proyecto no válido"
    }
}

//HU_012
const SetCrearProyecto = (project) => {
    const nuevoProyecto = new Proyectos(project);
    return nuevoProyecto.save()
        .then(u => "Proyecto creado")
        .catch(err => console.log(err));
}

//HU_014
const SetModificarProyecto = async (lider1, idProyecto, nombreProyecto1, objGeneral1, objEspecifico1, presupuesto1) => {
    const proyecto = await Proyectos.find({lider: lider1 });
    if ( proyecto ) {
        const proyecto2 = await Proyectos.findOne({idProyecto});
        if (proyecto2.estado === "Activo") {
            return Proyectos.updateOne({idProyecto}, {$set:{nombreProyecto: nombreProyecto1, objGeneral: objGeneral1, objEspecifico: objEspecifico1, presupuesto: presupuesto1}})
                .then(res => `Proyecto actualizado`)
                .catch(err => `Falló la actualización: ${err}`)
        }
    } else {
        return res => "Proyecto no válido para actualiación"
    }
}

module.exports = {
    obtenerProyectos,
    obtenerProyecto,
    setEstadoProyecto,
    setFaseProyecto,
    SetCrearProyecto,
    obtenerProyectosLider,
    SetModificarProyecto,
    obtenerMisSolicitudes,
    obtenerMisProyectos,
    inscribirEstudiante,
    agregarObservacion
}