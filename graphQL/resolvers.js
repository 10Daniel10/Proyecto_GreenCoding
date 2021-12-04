const { obtenerUsuarios, obtenerEstudiantes, setEstadoUsuario, obtenerMisPostulaciones,createUser } = require('../services/usuario.service');
const { obtenerProyectos, obtenerProyecto, setEstadoProyecto,
    setFaseProyecto, SetCrearProyecto, obtenerProyectosLider, obtenerMisSolicitudes, obtenerMisProyectos, inscribirEstudiante, agregarObservacion,
    SetModificarProyecto, InscribirmeProyecto, verAvances, RegistrarAvances, ModificarAvances } = require('../services/proyecto.service');
const { GraphQLDateTime } = require('graphql-iso-date');

let aes256 = require('aes256');
const { isLider } = require('./middleware/authjwt');
const jwt = require('jsonwebtoken')
const key = 'CLAVEADMIN';


const customScalarResolver = {
    Date: GraphQLDateTime
};

const resolvers = {

    Date: customScalarResolver,

    Query: {
        usuario: (parent, args, context, info) => buscarUsuarioPorIdentificacion(args.identificacion),
        //
        obtenerMisPostulaciones: async (parent, args, context, info) => obtenerMisPostulaciones(args.id),
        obtenerMisSolicitudes: async (parent, args, context, info) => obtenerMisSolicitudes(args.id),
        obtenerUsuarios: async () => obtenerUsuarios(),
        obtenerProyectos: async () => obtenerProyectos(),
        obtenerProyecto: async (parent, args, context, info) => obtenerProyecto(args.idProyecto),
        obtenerProyectosLider: async (parent, args, context, info) => obtenerProyectosLider(args.lider),
        obtenerEstudiantes: async () => obtenerEstudiantes(),
        obtenerMisProyectos: async (parent, args, context, info) => obtenerMisProyectos(args.id),
        verAvances: async (parent, args, context, info) => verAvances(args.idProyecto, args.estudiante),

    },

    Mutation: {
        inscribirEstudiante: async (parent, args, context, info) => inscribirEstudiante(args.id, args.idMiProyecto),
        setEstadoUsuario: async (parent, args, context, info) => setEstadoUsuario(args.id, args.estado),
        setEstadoProyecto: async (parent, args, context, info) => setEstadoProyecto(args.idProyecto, args.estado),
        setFaseProyecto: async (parent, args, context, info) => setFaseProyecto(args.idProyecto, args.fase),
        SetCrearProyecto: async (parent, args, context, info) => SetCrearProyecto(args.project),
        SetModificarProyecto: async (parent, args, context, info) => SetModificarProyecto(args.lider, args.idProyecto, args.nombreProyecto, args.objGeneral, args.objEspecifico, args.presupuesto),
        agregarObservacion: async (parent, args, context, info) => agregarObservacion(args.idMiProyecto, args.idAvance, args.obs),
        ModificarAvances: async (parent, args, context, info) => ModificarAvances(args.idProyecto, args.idAvance, args.descripcion, args.idUsuario),
        RegistrarAvances: async (parent, args, context, info) => RegistrarAvances(args.idProyecto, args.fechaAvance, args.descripcion, args.idUsuario),
        InscribirmeProyecto: async (parent, args, context, info) => InscribirmeProyecto(args.idProyecto, args.idUsuario, args.estado, args.fechaIngreso, args.fechaEgreso),
        createUser: (parent, args, context, info) => createUser(args.User),
        activeUser: (parent, args, context, info) => {
            return User.updateOne({ identificacion: args.identificacion }, { estado: "Activo" })
                .then(u => "Usuario activo")
                .catch(err => "Fallo la activacion");
        },
        updateUser: (parent, args, context, info) => {
            return User.updateOne({ identificacion: args.identificacion }, { estado: "Activo" }, { rol: "estudiante" },)
                .then(u => "Datos Actualizados")
                .catch(err => "No se pudo Actualizar Usuario");
        }

    },
}

module.exports = resolvers;