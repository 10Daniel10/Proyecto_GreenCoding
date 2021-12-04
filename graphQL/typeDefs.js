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
        id: ID!
        nombre: String!
        correo: String!
        clave: String!
        tipo: TipoUsuario!
        estado: EstadoUsuario!
    }

    type estudianteInscrito {
        id: ID!
        estudiante: String
        proyecto: String
        estado: Estado
        fechaIngreso: Date
        fechaEgreso: Date
    }

    type avance {
        id: ID!
        idProyecto: Proyecto
        fechaAvance: Date
        descripcion: String
        observacion: String
    }
    type Proyecto {
        id: ID!
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

        verAvances(
            idProyecto: ID!,
            estudiante:ID!

        ):[String]
    }

    type Mutation {
 



        InscribirmeProyecto(
            idProyecto: String!,
            idUsuario: String!,
            estado: String,
            fechaIngreso: Date,
            fechaEgreso: Date
        ):String


        RegistrarAvances(
            idProyecto: ID,
            fechaAvance: Date,
            descripcion: String,
            idUsuario : String!
        ): String
        ModificarAvances(
            idProyecto:ID, 
            idAvance:String, 
            descripcion:String, 
            idUsuario:String

        ):String


        
    }
`

module.exports = typeDefs;