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
        id: String!
        estudiante: String
        proyecto: String
        estado: Estado
        fechaIngreso: Date
        fechaEgreso: Date
    }

    type avance {
        id: String!
        idProyecto: Proyecto
        fechaAvance: Date
        descripcion: String
        observacion: String
    }
    type Proyecto {
        id: String!
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
        obtenerUsuario: Usuario
        obtenerProyectos: [Proyecto]
        obtenerProyecto(idProyecto: String!): Proyecto
        obtenerMisSolicitudes(id: String): [Proyecto]
        obtenerMisPostulaciones(id: String): [Proyecto]
        obtenerMisProyectos(id: String): [Proyecto]
        obtenerProyectosLider(lider: String!): [Proyecto]
        obtenerEstudiantes : [Usuario]
        verAvances(
            idProyecto: String!
            estudiante:String!

        ):[String]
    }

    input CreacionProyecto {
        idProyecto: String
        nombreProyecto: String!
        objGeneral: String
        objEspecifico: String
        presupuesto: Int
        estado: String
        fase: String
        lider: String
    }

    input CreacionUsuario{
    nombre: String
    id:String
    clave: String
    tipo:String
    correo: String
    }

    type Mutation {
        setEstadoUsuario(
            id: String!
            estado: String!
        ): String
        
        inscribirEstudiante (id: String, idMiProyecto: String): String
        agregarObservacion (idMiProyecto: String, idAvance: String, obs: String ) : String

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
        SetModificarProyecto(
            lider: ID
            idProyecto: String
            nombreProyecto: String
            objGeneral: String
            objEspecifico: String
            presupuesto: Int
        ):String

        verAvances(
            idProyecto: ID!,
            estudiante:ID!

        ):[String]

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

        crearUsuario(usuario: CreacionUsuario): String

        SetModificarUsuario(
            id: String
            nombre: String
            correo: String
            clave: String
        ):String
    }
`
module.exports = typeDefs;