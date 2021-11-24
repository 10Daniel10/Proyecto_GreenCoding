const { gql } = require('apollo-server-express');

const typeDefs = gql`
    
    enum EstadoUsuario {
        Autorizado
        NoAutorizado
        Pendiente
    }

    enum Estado {
        Activo
        Inactivo
    }

    enum TipoUsuario {
        Administrador
        Lider
        Estudiante
    }

    enum Fase {
        Iniciado
        EnDesarrollo
        Terminado
    }
    
    type Usuario {
        id: String!
        nombre: String!
        correo: String!
        tipo: TipoUsuario!
        estado: EstadoUsuario!
    }

    type estudianteInscrito {
        estudiante: Usuario
        idProyecto: Proyecto
        estado: Estado
        fechaIngreso: String
        fechaEgreso: String
    }

    type avance {
        idProyecto: Proyecto
        fechaAvance: String
        descripcion: String
        observacion: String
    }

    type Proyecto {
        nombre: String!
        objGeneral: String!
        objEspecifico: String!
        presupuesto: Int!
        fechaInicio: String
        fechaTermina: String
        lider: Usuario
        estado: Estado
        fase: Fase
        estudiantesInscritos: [estudianteInscrito]
        avances: [avance]
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