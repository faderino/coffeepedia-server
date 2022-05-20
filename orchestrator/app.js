if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const { gql, ApolloServer } = require("apollo-server");
const { GraphQLScalarType, Kind } = require('graphql')
const PORT = process.env.PORT || 4000;

const redis = require("./config/connection");
const axios = require("axios");
const baseUrlUser = 'http://localhost:4001'

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    // serialize(value) {
    //     return value.getTime(); // Convert outgoing Date to integer for JSON
    // },
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});

const typeDefs = gql`
    scalar Date

    type Article {
        _id : ID
        title : String
        content : String
        imageUrl : [String]
        author: String
        tag : [String]
        createdAt : Date

    }

    type Query{
        getAllArticle : [Article]
    }
`
const resolvers = {
    Date: dateScalar,
    Query: {
        getAllArticle: async () => {
            try {
                const articlesCache = await redis.get('articles')
                let articles = JSON.parse(articlesCache)
                if (!articlesCache) {
                    console.log('no redis get');
                    const { data } = await axios({
                        url: `${baseUrlUser}/articles`,
                        method: 'GET'
                    })
                    articles = data
                }
                console.log(articles);
                return articles
            } catch (error) {
                console.log(error);
                return error
            }
        }
    },
    // Mutation: {

    // }

}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
});

server.listen(PORT).then(({ url }) => {
    console.log(`running => ${url}`);
});