const { obtenerUsuarios, setEstadoUsuario, obtenerEstudiantes } = require('../services/usuario.service');
const { obtenerProyectos, obtenerProyecto, setEstadoProyecto, setFaseProyecto,  SetCrearProyecto, obtenerProyectosLider, SetModificarProyecto } = require('../services/proyecto.service');
const { GraphQLDateTime } = require('graphql-iso-date');

const customScalarResolver = {
  Date: GraphQLDateTime
};

const resolvers = {

    Date: customScalarResolver,

    Query: {
        obtenerUsuarios: async () => obtenerUsuarios(),
        obtenerProyectos: async () => obtenerProyectos(),
        obtenerProyecto: async (parent, args, context, info) => obtenerProyecto(args.idProyecto),
        obtenerProyectosLider: async (parent, args, context, info) => obtenerProyectosLider(args.lider),
        obtenerEstudiantes: async () => obtenerEstudiantes()
    },

    Mutation: {
        setEstadoUsuario: async(parent, args, context, info) => setEstadoUsuario(args.id, args.estado),
        setEstadoProyecto: async(parent, args, context, info) => setEstadoProyecto(args.idProyecto, args.estado),
        setFaseProyecto: async(parent, args, context, info) => setFaseProyecto(args.idProyecto, args.fase),
        SetCrearProyecto: async(parent, args, context, info) =>  SetCrearProyecto(args.project),
        SetModificarProyecto: async(parent, args, context, info) =>  SetModificarProyecto(args.lider, args.idProyecto, args.nombreProyecto, args.objGeneral, args.objEspecifico, args.presupuesto)
    },
}

module.exports = resolvers;