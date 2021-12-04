
const { InscribirmeProyecto,verAvances ,RegistrarAvances,ModificarAvances} = require('../services/proyecto.service');
const { GraphQLDateTime } = require('graphql-iso-date');

const customScalarResolver = {
  Date: GraphQLDateTime
};

const resolvers = {

  Date: customScalarResolver,

  Query: {
    verAvances: async (parent, args, context, info) => verAvances(args.idProyecto,args.estudiante),
  },

  Mutation: {
    ModificarAvances:async (parent, args, context, info)=>ModificarAvances(args.idProyecto, args.idAvance, args.descripcion, args.idUsuario),
    RegistrarAvances:async (parent, args, context, info)=>RegistrarAvances(args.idProyecto, args.fechaAvance, args.descripcion,args.idUsuario),
    InscribirmeProyecto: async (parent, args, context, info) => InscribirmeProyecto(args.idProyecto, args.idUsuario,args.estado,args.fechaIngreso,args.fechaEgreso),

  },


}

module.exports = resolvers;
