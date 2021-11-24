const { obtenerUsuarios, setEstadoUsuario } = require('../services/usuario.service');

const resolvers = {
    Query: {
        obtenerUsuarios: async () => obtenerUsuarios(),
    },

    Mutation: {
        setEstadoUsuario: async(parent, args, context, info) => setEstadoUsuario(args.id, args.estado)
    },
}

module.exports = resolvers;