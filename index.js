require('./infraestructura/conectionDB')
const { validarToken, admin, estudiante } = require('./middleware/authjwt')
const jwt = require('jsonwebtoken')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const authRoute = require('./routes/authRoutes')

const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const iniciarServidor = async()=>{
    const api = express();
    const apollo = new ApolloServer(
        {
            typeDefs,
            resolvers,
            context:({request})=>{
            const token= request.headers.authorization;
            try {
                const perfil = jwt.verify(token, key)
                if (perfil) {
                    rol = perfil.rolUser
                    return {rol}
                   }
                } catch (error) {
                console.log(error)
                }
            return {}
        
            }
        });
    await apollo.start()
    apollo.applyMiddleware({app:api})
    

    api.use(express.json())
    api.use('/api',authRoute)  
    api.get('/api/dashboard/admin', [validarToken, admin], (request, response) => {
        response.json("Soy el dashboard") 

    });
    
    api.get('/api/dashboard/estudiante', [validarToken, estudiante], (request, response) => {
        response.json("Soy el dashboard")
    });

    api.listen('9092', ()=>console.log('start server')) 
}










