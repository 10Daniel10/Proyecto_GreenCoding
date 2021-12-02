const { obtenerUsuarios, setEstadoUsuario, obtenerMisPostulaciones} = require('../services/usuario.service');
const { obtenerProyectos,obtenerMisSolicitudes, obtenerMisProyectos, inscribirEstudiante, agregarObservacion } = require('../services/proyecto.service');
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
    },

    Mutation: {
        setEstadoUsuario: async(parent, args, context, info) => setEstadoUsuario(args.id, args.estado),

        inscribirEstudiante: async (parent, args, context, info) => inscribirEstudiante(args.id, args.idMiProyecto),
        agregarObservacion: async (parent, args, context, info) => agregarObservacion(args.idMiProyecto, args.idAvance, args.obs),
    },
}

module.exports = resolvers;