if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const { gql, ApolloServer } = require("apollo-server");
const { GraphQLScalarType, Kind } = require('graphql')
const PORT = process.env.PORT || 4000;

const redis = require("./config/connection");
const axios = require("axios");

const urlArticle = 'http://localhost:4001'
const urlOrder = 'http://localhost:4003'

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

    type Item{
        id: ID
        CategoryId: Int
        name: String
        price: Int
        description : String
        imageUrl : String
        errorText : String
    }

    type Response{
        message : [String]
    }

    type Query{
        getAllArticle : [Article]
        getArticleById(_id:ID): Article
        getAllItem : [Item]
        getItemById(id:ID) : Item
    }

    type Mutation{

        RegisterUser(
            username : String
            email : String
            password : String
            phoneNumber: String
            address : String
        ): Response

        LoginUser(
            email : String
            password : String
        ) : Response
    }


`
const resolvers = {
    Date: dateScalar,
    Query: {
        // ! ARTICLE
        getAllArticle: async () => {
            try {
                const articlesCache = await redis.get('articles')
                let articles = JSON.parse(articlesCache)
                if (!articlesCache) {
                    console.log('no redis get');
                    const { data } = await axios({
                        url: `${urlArticle}/articles`,
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
                            url: `${urlArticle}/article/${args._id}`,
                            method: "GET"
                        })
                        article = data
                        redis.set('article', JSON.stringify(data))
                        return article
                    }
                } else {
                    // console.log('fetch baru by id');
                    const { data } = await axios({
                        url: `${urlArticle}/article/${args._id}`,
                        method: "GET"
                    })
                    article = data
                    redis.set('article', JSON.stringify(data))
                    return article
                }
            } catch (error) {
                return error
            }
        },
        // ! ITEM
        getAllItem: async () => {
            try {
                const itemsCahce = await redis.get('items')
                let items = JSON.parse(itemsCahce)
                if (!itemsCahce) {
                    console.log('no redis get');
                    const { data } = await axios({
                        url: `${urlOrder}/items`,
                        method: 'GET'
                    })
                    items = data
                    redis.set('items', JSON.stringify(data))
                    return items
                } else {
                    console.log('ready in redis')
                    return items
                }
            } catch (error) {
                console.log(error)
                return error
            }
        },
        getItemById: async (_, args) => {
            try {
                const itemCache = await redis.get('item')
                let item = JSON.parse(itemCache)
                if (itemCache) {
                    if (item.id === args.id) {
                        return item
                    } else {
                        redis.del('item')
                        const { data } = await axios({
                            url: `${urlOrder}/items/${args.id}`,
                            method: "GET"
                        })
                        item = data
                        redis.set('item', JSON.stringify(data))
                        return item
                    }
                } else {
                    const { data } = await axios({
                        url: `${urlOrder}/items/${args.id}`,
                        method: "GET"
                    })
                    item = data
                    redis.set('item', JSON.stringify(data))
                    return item
                }
            } catch (error) {
                console.log(error.response.data.message);
                return { errorText: error.response.data.message }
            }
        },
    },
    Mutation: {
        RegisterUser: async (_, args) => {
            const { username, email, password, phoneNumber, address } = args;
            console.log(username, email, password, phoneNumber, address)
            try {
                await axios({
                    url: `${urlOrder}/register`,
                    method: "POST",
                    data: {
                        username, email, password, phoneNumber, address
                    }
                })
                return { message: ["Success Register"] }
            } catch (error) {
                return { message: error.response.data.message }
            }
        },
        LoginUser: async (_, args) => {
            const { email, password } = args;
            try {
                await axios({
                    url: `${urlOrder}/login`,
                    method: "POST",
                    data: {
                        email, password
                    }
                })
                return { message: ["Success Login"] }
            } catch (error) {
                return { message: [error.response.data.message] }
            }
        }
    }

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