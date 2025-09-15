const { ApolloServer } = require('@apollo/server');
const { userTypeDefs, adminTypeDefs, generalTypeDefs } = require('./typeDefs');
const { userResolvers, adminResolvers, generalResolvers } = require('./resolvers');

let serverInstance = null;
let generalServerInstance = null;

async function createGeneralServer() {
    if (!generalServerInstance) {
        const server = new ApolloServer({
            typeDefs: generalTypeDefs,
            resolvers: generalResolvers,
        });

        await server.start();
        generalServerInstance = server;
    }

    return generalServerInstance;
}

async function createServer() {
    if (!serverInstance) {
        const server = new ApolloServer({
            typeDefs: userTypeDefs,
            resolvers: userResolvers,
            context: ({ req }) => {
                return {
                    user: req.user
                }
            }
        });
        
        await server.start();
        serverInstance = server;
    }
    
    return serverInstance;
}

let adminServerInstance = null;

async function createAdminServer() {
    if (!adminServerInstance) {
        const server = new ApolloServer({
            typeDefs: adminTypeDefs,
            resolvers: adminResolvers,
            context: ({ req }) => {
                return {
                    user: req.user
                }
            }
        });
        
        await server.start();
        adminServerInstance = server;
    }
    
    return adminServerInstance;
}

module.exports = {
    createGeneralServer,
    createServer,
    createAdminServer
}