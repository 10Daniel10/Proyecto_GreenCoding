const { gql } = require('apollo-server-express')

const typeDefs = gql`
scalar Date
type Usuario{
    nombre: String
    identificacion: Int
    estado:String
    correo:String
    perfil:String
    

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

}
type Mutation{
    createUser(user:UserInput):String
    deleteUser(ident:Int):String
    updateUser(identificacion:Int):String
    activeUser(identificacion:Int):String
}
`

module.exports = typeDefs