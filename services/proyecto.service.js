const Proyectos = require('../model/proyecto.model');

var mongoose = require('mongoose');
const { UniqueTypeNamesRule } = require('graphql');
//const bson = require('bson');

const verAvances = async (idProyecto, estudiante) => {
    let comprobarProyecto = await Proyectos.find({ _id: idProyecto }).then(function (res) {
        
        if (typeof res[0].estudiantesInscritos.length !== 0) {
            for (let i = 0; i < res[0].estudiantesInscritos.length; i++) {
                if (res[0].estudiantesInscritos[i].estudiante === estudiante) {
                    if (res[0].estudiantesInscritos[i].estado === "Activo") {
                        return true;
                    }

                }
            }
        }
    })
    if (comprobarProyecto) {
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
    }else{
        return "no esta inscrito"
    }
}


const RegistrarAvances = async (idProyecto, fechaAvance, descripcion, idUsuario) => {
    let comprobarProyecto = await Proyectos.find({ _id: idProyecto }).then(function (res) {
        console.log(res[0].estudiantesInscritos);
        if (res[0].estado === "Activo" && res[0].fase !== "Terminado" && typeof res[0].estudiantesInscritos.length !== 0) {
            for (let i = 0; i < res[0].estudiantesInscritos.length; i++) {
                if (res[0].estudiantesInscritos[i].estudiante === idUsuario) {
                    if (res[0].estudiantesInscritos[i].estado === "Activo") {
                        return true;
                    }

                }
            }
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
            }) })

        
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
    } else {
        return "proyecto en estado inactivo o terminado o ustes no esta inscrito"
    }
}
const ModificarAvances = async (idProyecto, idAvance, descripcion, idUsuario) => {
    let comprobarProyecto = await Proyectos.find({ _id: idProyecto }).then(function (res) {
        console.log(res[0].estudiantesInscritos);
        if (res[0].estado === "Activo" && res[0].fase !== "Terminado" && typeof res[0].estudiantesInscritos.length !== 0) {
            for (let i = 0; i < res[0].estudiantesInscritos.length; i++) {
                if (res[0].estudiantesInscritos[i].estudiante === idUsuario) {
                    if (res[0].estudiantesInscritos[i].estado === "Activo") {
                        return true;
                   }
                }
        } }})
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
                { _id: idProyecto, "avances._id": idAvance },
                {
                    $set: {
                        "avances.$.descripcion": descripcion

                    }
                }).then(res => "se modifico el avance correctamente")
                .catch(err => "Falló al modificar avance")
        } else {
            return "no esta inscrito"
        }
    } else {
        return "proyecto en estado inactivo o terminado o no esta inscrito"
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
    InscribirmeProyecto,
    verAvances,
    RegistrarAvances,
    ModificarAvances
}