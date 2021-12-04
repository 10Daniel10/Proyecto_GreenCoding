const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./graphQL/typeDefs');
const resolvers = require('./graphQL/resolvers');

const { validarToken, admin, estudiante } = require('./middleware/authjwt')
const authRoute = require('./routes/authRoutes')
// realizar la conexión a la BD
const bd = require('./infrastructure/bd');
bd.conectar();

const PUERTO = 3020;

const iniciarServidor = async () => {
    const app = express();
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
    await apollo.start();
    apollo.applyMiddleware({ app: app });
    app.use((req, res) => {
        res.send('Hola')
    });
    api.use('/api',authRoutes)  
    app.listen(PUERTO, () => {
        console.log(`Servicio iniciado a través de la url http://localhost:${PUERTO}`);
    });
}

iniciarServidor()