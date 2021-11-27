const { obtenerUsuarios, setEstadoUsuario } = require('../services/usuario.service');
const { obtenerProyectos, obtenerProyecto, setEstadoProyecto, setFaseProyecto } = require('../services/proyecto.service');
const { GraphQLDateTime } = require('graphql-iso-date');

const customScalarResolver = {
  Date: GraphQLDateTime
};

const resolvers = {

    Date: customScalarResolver,

    Query: {
        obtenerUsuarios: async () => obtenerUsuarios(),
        obtenerProyectos: async () => obtenerProyectos(),
        obtenerProyecto: async (parent, args, context, info) => obtenerProyecto(args.idProyecto)
    
    },

    Mutation: {
        setEstadoUsuario: async(parent, args, context, info) => setEstadoUsuario(args.id, args.estado),
        setEstadoProyecto: async(parent, args, context, info) => setEstadoProyecto(args.idProyecto, args.estado),
        setFaseProyecto: async(parent, args, context, info) => setFaseProyecto(args.idProyecto, args.fase)
    },
}

module.exports = resolvers;