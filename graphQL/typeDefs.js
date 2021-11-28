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
        obtenerProyectos: [Proyecto]
        obtenerProyecto(idProyecto: String!): Proyecto
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
    }




    
    type Usuario{
        nombre: String
        identificacion: Int
        estado: String
        email: String
        perfil: String
    }
    type Proyecto{
        identificador: String
        objetivosGenerales: String
        presupuesto: Int
        fechaTerminacion: Date
        lider: String
        nombre:String
    }
    type Query{
        usuarios: [Usuario]
        usuario(identificacion: Int): Usuario
        proyectos:[Proyecto]
        getProject(nombre:String):Proyecto
    }
    input UserInput{
        nombre: String
        identificacion:Int
        clave: String
        perfil: String
    }
    input ProjectInput{
        objetivosGenerales: String
        presupuesto: Int
        fechaTerminacion: Date
        lider: String
        nombre:String
    }
    type Mutation{
        createUser(user:UserInput):String
        createProject(project:ProjectInput):String
        activeUser(identificacion:Int):String
        deleteUser(ident:Int):String
        deleteProject(nombreProyecto:String):String
        insertUserToProject(identificacion:Int,nombreProyecto:String):String
        autenticar(usuario:String, clave:String):String
    }
`

module.exports = typeDefs;