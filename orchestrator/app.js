if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const { gql, ApolloServer } = require("apollo-server");
const { GraphQLScalarType, Kind } = require('graphql')
const PORT = process.env.PORT || 4000;

const redis = require("./config/connection");
const axios = require("axios");
const baseUrlArticle = 'http://localhost:4001'

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
        getArticleById(_id:ID): Article
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
                        url: `${baseUrlArticle}/articles`,
                        method: 'GET'
                    })
                    articles = data
                    redis.set('articles', JSON.stringify(data))
                    return articles
                } else {
                    console.log('ready in redis')
                    return articles
                }
            } catch (error) {
                console.log(error);
                return error
            }
        },
        getArticleById: async (_, args) => {
            try {
                const articleCache = await redis.get('article')
                let article = JSON.parse(articleCache)
                if (articleCache) {
                    if (article._id === args._id) {
                        // console.log('ada diredis');
                        return article
                    } else {
                        // console.log('redis ada, tp data beda')
                        redis.del('article')
                        const { data } = await axios({
                            url: `${baseUrlArticle}/article/${args._id}`,
                            method: "GET"
                        })
                        article = data
                        redis.set('article', JSON.stringify(data))
                        return article
                    }
                } else {
                    // console.log('fetch baru by id');
                    const { data } = await axios({
                        url: `${baseUrlArticle}/article/${args._id}`,
                        method: "GET"
                    })
                    article = data
                    redis.set('article', JSON.stringify(data))
                    return article
                }
            } catch (error) {
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