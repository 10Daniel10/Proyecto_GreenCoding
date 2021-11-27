const Proyectos = require('../model/proyecto.model');

const obtenerProyectos = async () => {
    return await Proyectos.find({}).populate("lider")
        .populate("estudiantesInscritos.estudiante")
        .populate("estudiantesInscritos.proyecto", "nombreProyecto")
}

const obtenerProyecto = async (idProyecto) => {
    return await Proyectos.findOne({idProyecto}).populate("lider")
        .populate("estudiantesInscritos.estudiante")
}

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

module.exports = {
    obtenerProyectos,
    obtenerProyecto,
    setEstadoProyecto,
    setFaseProyecto
}