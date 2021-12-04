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
        estado: EstadoUsuario
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
        obtenerProyectosLider(lider: ID!): [Proyecto]
        obtenerProyecto(idProyecto: String!): Proyecto
        obtenerUsuario: Usuario
        obtenerMisSolicitudes(id: String): [Proyecto]
        obtenerMisPostulaciones(id: String): [Proyecto]
        obtenerMisProyectos(id: String): [Proyecto]
        verAvances(
            idProyecto: ID!,
            estudiante:ID!

        ):[String]
    }
    input UserInput{
        id:String
        nombre: String
        correo:String
        clave: String
        tipo:TipoUsuario!
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

    type Mutation {
        inscribirEstudiante (id: String, idMiProyecto: String): String
        agregarObservacion (idMiProyecto: String, idAvance: String, obs: String ) : String
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
        SetModificarProyecto(
            lider: ID
            idProyecto: String
            nombreProyecto: String
            objGeneral: String
            objEspecifico: String
            presupuesto: Int
        ):String
        
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
        createUser(user:UserInput):String
        activeUser(identificacion:Int):String
        deleteUser(ident:Int):String
        updateUser(identificacion:Int):String
    }
`

module.exports = typeDefs;