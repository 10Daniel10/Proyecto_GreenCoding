const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Usuario {
        id: String!
        nombre: String!
        correo: String!
        tipo: String!
        estado: String!
    }

    type Query {
        obtenerUsuarios : [Usuario]
        obtenerUsuario: Usuario
    }

    type Mutation {
        setEstadoUsuario(
            id: String!
            estado: String!
        ): String
    }
`

module.exports = typeDefs;