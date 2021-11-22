const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./graphQL/typeDefs/usuarios.typedef');
const resolvers = require('./graphQL/resolvers/usuarios.resolver');


// realizar la conexión a la BD
const bd = require('./infrastructure/bd');
bd.conectar();

const PUERTO = 3020;

const iniciarServidor = async () => {
    const app = express();
    const apollo = new ApolloServer(
        {
            typeDefs,
            resolvers
        });
    await apollo.start();
    apollo.applyMiddleware({ app: app });
    app.use((req, res) => {
        res.send('Hola')
    });
    app.listen(PUERTO, () => {
        console.log(`Servicio iniciado a través de la url http://localhost:${PUERTO}`);
    });
}

iniciarServidor()