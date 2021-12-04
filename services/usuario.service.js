const Usuarios = require('../model/usuario.model');

const obtenerUsuarios = async () => await Usuarios.find()

const obtenerEstudiantes = async () => await Usuarios.find({tipo:"Estudiante"})
const key="claveadmin"
const setEstadoUsuario = async (id, estado) => {
    console.log(id);
    return Usuarios.updateOne({id}, {estado})
        .then(res => `Estado actualizado`)
        .catch(err => "Falló el cambio de estado")
}
const obtenerMisPostulaciones = async (id) => {
    const estudiante = await Usuarios.findOne({id})
        return await Proyectos.find({'estudiantesInscritos.estudiante': estudiante._id })
        .populate("lider")
        .populate("estudiantesInscritos.estudiante")
        .populate("estudiantesInscritos.proyecto", "nombreProyecto")
}
const createUser=async (user) => {
   const{clave}=user;
    

    const nuevoUsuario = new Usuarios(user);
    //encripta al clave

    const encryptedPlainText = aes256.encrypt(key,clave);

    nuevoUsuario.clave = encryptedPlainText;

    return nuevoUsuario.save()
        .then(u => "usuario creado")
        .catch(err => console.log(err));

}

module.exports = {
    obtenerUsuarios,
    setEstadoUsuario,
    obtenerEstudiantes,
    obtenerMisPostulaciones,
    createUser
}