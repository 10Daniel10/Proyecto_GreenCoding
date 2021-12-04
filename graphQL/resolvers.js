const { obtenerUsuarios, setEstadoUsuario, obtenerMisPostulaciones, obtenerEstudiantes} = require('../services/usuario.service');
const { obtenerProyectos,obtenerMisSolicitudes, obtenerMisProyectos, inscribirEstudiante, agregarObservacion, obtenerProyecto, setEstadoProyecto, setFaseProyecto,  SetCrearProyecto, obtenerProyectosLider, SetModificarProyecto } = require('../services/proyecto.service');
const { GraphQLDateTime } = require('graphql-iso-date');


const customScalarResolver = {
  Date: GraphQLDateTime
};


const resolvers = {

    Date: customScalarResolver,

    Query: {
        obtenerUsuarios: async () => obtenerUsuarios(),
        obtenerProyectos: async () => obtenerProyectos(),
        obtenerMisSolicitudes: async (parent, args, context, info) => obtenerMisSolicitudes(args.id),
        obtenerMisPostulaciones: async (parent, args, context, info) => obtenerMisPostulaciones(args.id),
        obtenerMisProyectos: async (parent, args, context, info) => obtenerMisProyectos(args.id),
        obtenerProyecto: async (parent, args, context, info) => obtenerProyecto(args.idProyecto),
        obtenerProyectosLider: async (parent, args, context, info) => obtenerProyectosLider(args.lider),
        obtenerEstudiantes: async () => obtenerEstudiantes()
    },

    Mutation: {
        setEstadoUsuario: async(parent, args, context, info) => setEstadoUsuario(args.id, args.estado),
        inscribirEstudiante: async (parent, args, context, info) => inscribirEstudiante(args.id, args.idMiProyecto),
        agregarObservacion: async (parent, args, context, info) => agregarObservacion(args.idMiProyecto, args.idAvance, args.obs),
        setEstadoProyecto: async(parent, args, context, info) => setEstadoProyecto(args.idProyecto, args.estado),
        setFaseProyecto: async(parent, args, context, info) => setFaseProyecto(args.idProyecto, args.fase),
        SetCrearProyecto: async(parent, args, context, info) =>  SetCrearProyecto(args.project),
        SetModificarProyecto: async(parent, args, context, info) =>  SetModificarProyecto(args.lider, args.idProyecto, args.nombreProyecto, args.objGeneral, args.objEspecifico, args.presupuesto)
    },
}

module.exports = resolvers;