const User = require('./model/usuarioModels')
let aes256 = require('aes256');
const { isLider } = require('./middleware/authjwt');
const jwt = require('jsonwebtoken')


const listUsuarios = [
    {
        nombre: 'Renzo Montoya',
        identificacion: 123456789,
        email: 'renzomontoya9@gmail.com',
        clave: 'claveEstudiante',
        perfil: 'estudiante',
        estado: 'activo'
    },
    {
        nombre: 'Jose alejandro',
        identificacion: 98765,
        email: 'josesito@gmail.com',
        clave: 'ClaveAdmin',
        perfil: 'estudiante',
        estado: 'inactivo'
    },
]

const key = 'CLAVEADMIN';

const resolvers = {
    Query: {
        usuarios: () => listUsuarios,
        usuario: (parent, args, context, info) => buscarUsuarioPorIdentificacion(args.identificacion),
        
    }
}

Mutation:{
    createUser: (parent, args, context, info) => {
        const { clave } = args.user;
        const nuevoUsuario = new User(args.user);
        const encryptedPlainText = aes256.encrypt(key, clave);
        nuevoUsuario.clave = encryptedPlainText
        return nuevoUsuario.save()
            .then(u => "usuario creado")
            .catch(err => console.log(err));
       
}
    activeUser: (parent, args, context, info) => {
        return User.updateOne({ identificacion: args.identificacion }, { estado: "Activo" })
            .then(u => "Usuario activo")
            .catch(err => "Fallo la activacion");
    }
    

    createUser: (parent, args, context, info) => {
        const { clave } = args.user;
        const nuevoUsuario = new User(args.user);
        const encryptedPlainText = aes256.encrypt(key, clave);
        nuevoUsuario.clave = encryptedPlainText
        return nuevoUsuario.save()
            .then(u => "usuario creado")
            .catch(err => console.log(err));
    }
    updateUser: (parent, args, context, info) => {
        return User.updateOne({ identificacion: args.identificacion }, { estado: "Activo" },{rol:"estudiante"},)
            .then(u => "Datos Actualizados")
            .catch(err => "No se pudo Actualizar Usuario");
    }


}   



module.exports = resolvers