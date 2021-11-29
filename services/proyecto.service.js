const Proyectos = require('../model/proyecto.model');
const estudianteInscrito = require('../model/estudianteInscrito.model');
const Usuario = require('../model/usuario.model');
var mongoose = require('mongoose');
const { UniqueTypeNamesRule } = require('graphql');
//const bson = require('bson');
const obtenerProyectos = async () => {
    return await Proyectos.find({}).populate("lider")
        .populate("estudiantesInscritos.estudiante")
        .populate("estudiantesInscritos.proyecto", "nombreProyecto")
}
const limpiarInscritos = async () => {
    return Proyectos.update({}, { $set: { estudiantesInscritos: [], avances: [] } }, function (err, affected) {
        console.log('affected: ', affected);
    });
}
const verAvances = async (idProyecto, estudiante) => {
    //para ver los avances el susuario debe estar logeado
    return Proyectos.find({
        'estudiantesInscritos.estudiante': {
            $in: [
                mongoose.Types.ObjectId(estudiante),

            ]
        },

    }).then(function (res) {
        return res.map(function (x) {
            if (x._id == idProyecto) {
                console.log(x.avances)
                return x.avances.toString();
            }
        })
    })


}
/*
string to array object
function malformedJSON2Array (tar) {
    var arr = [];
    tar = tar.replace(/^\{|\}$/g,'').split(',');
    for(var i=0,cur,pair;cur=tar[i];i++){
        arr[i] = {};
        pair = cur.split(':');
        arr[i][pair[0]] = /^\d*$/.test(pair[1]) ? +pair[1] : pair[1];
    }
    return arr;
}

malformedJSON2Array("{a:12, b:c, foo:bar}");
*/ 
const createProyecto = async (nombreProyecto, objGeneral, objEspecifico, presupuesto, fechaInicio,
    fechaTermina, lider, estado, fase, estudiantesInscritos, avances) => {

    let proyecto = new Proyectos({
        nombreProyecto,
        objGeneral,
        objEspecifico,
        presupuesto,
        fechaInicio,
        fechaTermina,
        lider,
        estado,
        fase,
        estudiantesInscritos,
        avances,
    });
    proyecto.save()
        .then(res => `Proyecto insertado`)
        .catch(err => "Falló al insertar")
    return proyecto;
}
const RegistrarAvances = async (idProyecto, fechaAvance, descripcion, idUsuario) => {
    let comprobarProyecto = await Proyectos.find({ _id: idProyecto }).then(function (res) {
        if (res[0].estado === "Activo" && res[0].fase !== "Terminado") {
            return true;
        }
    })
    if (comprobarProyecto) {

        let estainscrito = [false];
        var nickname = null;
        estainscrito = await Proyectos.find({ _id: idProyecto }, { "estudiantesInscritos.estudiante": idUsuario }).then(function (res) {
            return res.map(function (x) {
                if (typeof x.estudiantesInscritos[0] == "undefined") {
                    return false
                } else {
                    nickname = x.estudiantesInscritos.reduce(function (value, nickname) {

                        return nickname.estudiante === idUsuario ? nickname : null;
                    }, null);

                    if (nickname == null) {
                        return false
                    }
                    if (nickname !== null) {
                        return true
                    }
                }
            }
            )
        })
        if (nickname !== null) {
            return Proyectos.findOneAndUpdate(
                { _id: idProyecto },
                {
                    $push: {
                        avances:
                        {
                            idProyecto: idProyecto,
                            fechaAvance: fechaAvance,
                            descripcion: descripcion
                        }
                    }
                }).then(res => "se registro avance correctamente")
                .catch(err => "Falló al registrar avance")
        } else {
            return "no esta inscrito"
        }
    }else {
        return "proyecto en estado inactivo o terminado"
    }
}
const ModificarAvances = async (idProyecto, idAvance, descripcion, idUsuario) => {
    let comprobarProyecto = await Proyectos.find({ _id: idProyecto }).then(function (res) {
        if (res[0].estado === "Activo" && res[0].fase !== "Terminado") {
            return true;
        }
    })
    if (comprobarProyecto) {

        let estainscrito = [false];
        var nickname = null;
        estainscrito = await Proyectos.find({ _id: idProyecto }, { "estudiantesInscritos.estudiante": idUsuario }).then(function (res) {
            return res.map(function (x) {
                if (typeof x.estudiantesInscritos[0] == "undefined") {
                    return false
                } else {
                    nickname = x.estudiantesInscritos.reduce(function (value, nickname) {

                        return nickname.estudiante === idUsuario ? nickname : null;
                    }, null);

                    if (nickname == null) {
                        return false
                    }
                    if (nickname !== null) {
                        return true
                    }
                }
            }
            )
        })
        if (nickname !== null) {
            return Proyectos.updateOne(
                { _id: idProyecto ,"avances._id":idAvance},
                {
                    $set: {
                        "avances.$.descripcion":descripcion
    
                    }
                }).then(res => "se modifico el avance correctamente")
                .catch(err => "Falló al modificar avance")
        } else {
            return "no esta inscrito"
        }
    }else {
        return "proyecto en estado inactivo o terminado"
    }
}



const InscribirmeProyecto = async (idProyecto, idUsuario, estado, fechaIngreso, fechaEgreso) => {
    let comprobarProyecto = await Proyectos.find({ _id: idProyecto }).then(function (res) {
        if (res[0].estado === "Activo" && res[0].fase !== "Terminado") {
            return true;
        }
    })
    if (comprobarProyecto) {
        let estainscrito = [false];
        var nickname = null;
        estainscrito = await Proyectos.find({ _id: idProyecto }, { "estudiantesInscritos.estudiante": idUsuario }).then(function (res) {
            return res.map(function (x) {

                if (typeof x.estudiantesInscritos[0] == "undefined") {
                    return false
                } else {
                    nickname = x.estudiantesInscritos.reduce(function (value, nickname) {
                        return nickname.estudiante === idUsuario ? nickname : null;
                    }, null);
                    if (nickname == null) {
                        return false
                    }
                    if (nickname !== null) {
                        return true
                    }
                }
            }
            )
        })
        if (nickname === null) {
            return Proyectos.findOneAndUpdate(
                { _id: idProyecto },
                {
                    $push: {
                        estudiantesInscritos:
                        {
                            estudiante: idUsuario,
                            proyecto: idProyecto,
                            estado: estado,
                            fechaIngreso: fechaIngreso,
                            fechaEgreso: fechaEgreso
                        }
                    }
                }).then(res => "se inscribio correctamente")
                .catch(err => "Falló al inscribirse")
        } else {
            return "ya se encuentra inscrito a este proyecto"
        }
    } else {
        return "proyecto en estado inactivo o terminado"
    }
}

module.exports = {
    obtenerProyectos,
    InscribirmeProyecto,
    createProyecto,
    limpiarInscritos,
    verAvances,
    RegistrarAvances,
    ModificarAvances
}