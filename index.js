const express = require('express');
const graphqlHttp = require('express-graphql');
const {makeExecutableSchema} = require('graphql-tools');
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const next = require('next');
const fs = require('fs');
const ApolloServer =  require("apollo-server").ApolloServer;
const resolvers = require('./graphql');
const {importSchema} = require('graphql-import')
const typeDefs = fs.readFileSync('./schema.graphql', {encoding: "utf-8"});

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const schema = makeExecutableSchema({typeDefs, resolvers});
const server = new ApolloServer({typeDefs: importSchema('./schema.graphql'), resolvers});
server.listen().then(()=>{console.log('ok - apollo')});
app.prepare()
    .then(() => {

        const server = express();
        server.use(express.static('public'));

        server.use('/graphql', graphqlHttp({
            graphiql: true,
            schema
        }));
        server.get(/\/((?!graphql).)*/, (req, res) => {
            handle(req, res);
        });

        server.get('/', (req, res) => {
            app.render(req, res, '/index', null);
        });

        server.listen(80, err => {
            console.log("ok");
        });

    });
