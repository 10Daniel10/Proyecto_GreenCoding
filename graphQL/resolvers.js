const { obtenerUsuarios } = require('../services/usuario.service');

const resolvers = {
    Query: {
        obtenerUsuarios: async () => obtenerUsuarios(),
    }
}

module.exports = resolvers;