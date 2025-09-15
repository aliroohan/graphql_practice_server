const express = require('express');
const router = express.Router();
const { createServer, createAdminServer, createGeneralServer } = require('../graphql/apolloServer');
const { expressMiddleware } = require('@as-integrations/express5');
const { auth, admin } = require('../middleware/auth');

// Initialize Apollo Server middleware
let apolloMiddleware = null;
let adminApolloMiddleware = null;
let generalApolloMiddleware = null;

async function initializeGeneralApollo() {
    if (!generalApolloMiddleware) {
        const server = await createGeneralServer();
        generalApolloMiddleware = expressMiddleware(server);
    }
    return generalApolloMiddleware;
}

async function initializeApollo() {
    if (!apolloMiddleware) {
        const server = await createServer();
        apolloMiddleware = expressMiddleware(server, {
            context: async ({ req }) => ({ user: req.user }),
        });
    }
    return apolloMiddleware;
}

async function initializeAdminApollo() {

    if (!adminApolloMiddleware) {
        const server = await createAdminServer();
        adminApolloMiddleware = expressMiddleware(server, {
            context: async ({ req }) => ({ user: req.user }),
        });
    }
    return adminApolloMiddleware;
}

router.use('/graphql/general', async (req, res, next) => {
    try {
        const middleware = await initializeGeneralApollo();
        middleware(req, res, next);
    } catch (error) {
        next(error);
    }
});

// Middleware to ensure Apollo Server is initialized
router.use('/graphql/user', auth, async (req, res, next) => {
    try {
        const middleware = await initializeApollo();
        middleware(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.use('/graphql/admin', auth, admin, async (req, res, next) => {
    try {
        const middleware = await initializeAdminApollo();
        middleware(req, res, next);
    } catch (error) {
        next(error);
    }
});

// router.use('/api/user', require('./user'));
// router.use('/api/author', require('./author'));
// router.use('/api/book', require('./book'));
// router.use('/api/cart', require('./cart'));
// router.use('/api/order', require('./order'));

module.exports = router;