const { gql } = require('apollo-server-express');

const typeDefs = gql`
    
    scalar Date

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
        Nulo
    }
    
    type Usuario {
        id: String!
        nombre: String!
        correo: String!
        tipo: TipoUsuario!
        estado: EstadoUsuario!
    }

    type estudianteInscrito {
        idEstudianteInscrito: String
        estudiante: Usuario
        proyecto: Proyecto
        estado: Estado
        fechaIngreso: Date
        fechaEgreso: Date
    }

    type avance {
        idAvance: String
        idProyecto: Proyecto
        fechaAvance: Date
        descripcion: String
        observacion: String
    }

    type Proyecto {
        idProyecto: String
        nombreProyecto: String!
        objGeneral: String
        objEspecifico: String
        presupuesto: Int
        fechaInicio: Date
        fechaTermina: Date
        lider: Usuario
        estado: Estado
        fase: Fase
        estudiantesInscritos: [estudianteInscrito]
        avances: [avance]
    }

    type Query {
        obtenerUsuarios : [Usuario]
        obtenerEstudiantes : [Usuario]
        obtenerProyectos: [Proyecto]
        obtenerProyectosLider: [Proyecto]
        obtenerProyecto(idProyecto: String!): Proyecto
    }

    input CreacionProyecto {
        idProyecto: String
        nombreProyecto: String!
        objGeneral: String
        objEspecifico: String
        presupuesto: Int
        estado: String
        fase: String
    }

    type Mutation {
        setEstadoUsuario(
            id: String!
            estado: String!
        ): String
        setEstadoProyecto( 
            idProyecto: String!
            estado: String! 
        ): String
        setFaseProyecto(
            idProyecto: String!
            fase: String!
        ): String
        SetCrearProyecto(
            project:CreacionProyecto
        ):String
    }
`

module.exports = typeDefs;