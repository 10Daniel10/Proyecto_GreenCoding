const { gql } = require('apollo-server-express')

const typeDefs = gql`
scalar Date
type Usuario{
    nombre: String
    identificacion: Int
    email: String
    clave:String
    perfil: String
    estado: String
    rol:String
}
type Query{
    usuarios: [Usuario]
    usuario(identificacion: Int): Usuario
}
input UserInput{
    nombre: String
    identificacion:Int
    clave: String
    perfil:String
    estado: String
    rol:String
}
type Mutation{
    createUser(user:UserInput):String
    activeUser(identificacion:Int):String
    deleteUser(ident:Int):String
    updateUser(identificacion:Int):String
}
`

module.exports = typeDefs