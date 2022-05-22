if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const { GraphQLScalarType, Kind } = require("graphql");
const PORT = process.env.PORT || 4000;

const redis = require("./config/connection");
const axios = require("axios");

const urlArticle = "http://localhost:4001";
const urlOrder = "http://localhost:4003";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
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

const resolvers = {
  Date: dateScalar,
  Query: {
    // ! ARTICLE
    getAllArticle: async () => {
      try {
        const articlesCache = await redis.get("articles");
        let articles = JSON.parse(articlesCache);
        if (!articlesCache) {
          const { data } = await axios({
            url: `${urlArticle}/articles`,
            method: "GET",
          });
          articles = data;
          redis.set("articles", JSON.stringify(data));
          return articles;
        } else {
          return articles;
        }
      } catch (error) {
        return error;
      }
    },
    getArticleById: async (_, args) => {
      try {
        const articleCache = await redis.get("article");
        let article = JSON.parse(articleCache);
        if (articleCache) {
          if (article._id === args._id) {
            return article;
          } else {
            redis.del("article");
            const { data } = await axios({
              url: `${urlArticle}/article/${args._id}`,
              method: "GET",
            });
            article = data;
            redis.set("article", JSON.stringify(data));
            return article;
          }
        } else {
          const { data } = await axios({
            url: `${urlArticle}/article/${args._id}`,
            method: "GET",
          });
          article = data;
          redis.set("article", JSON.stringify(data));
          return article;
        }
      } catch (error) {
        return error;
      }
    },
    // ! ITEM
    getAllItem: async () => {
      try {
        const itemsCahce = await redis.get("items");
        let items = JSON.parse(itemsCahce);
        if (!itemsCahce) {
          console.log("no redis get");
          const { data } = await axios({
            url: `${urlOrder}/items`,
            method: "GET",
          });
          items = data;
          redis.set("items", JSON.stringify(data));
          return items;
        } else {
          console.log("ready in redis");
          return items;
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    getItemById: async (_, args) => {
      try {
        const itemCache = await redis.get("item");
        let item = JSON.parse(itemCache);
        if (itemCache) {
          if (item.id === args.id) {
            return item;
          } else {
            redis.del("item");
            const { data } = await axios({
              url: `${urlOrder}/items/${args.id}`,
              method: "GET",
            });
            item = data;
            redis.set("item", JSON.stringify(data));
            return item;
          }
        } else {
          const { data } = await axios({
            url: `${urlOrder}/items/${args.id}`,
            method: "GET",
          });
          item = data;
          redis.set("item", JSON.stringify(data));
          return item;
        }
      } catch (error) {
        return { errorText: error.response.data.message };
      }
    },
    // ! ORDER
    getAllOrder: async (_, args) => {
      try {
        const orderCache = await redis.get("orders");
        let orders = JSON.parse(orderCache);
        if (!orderCache) {
          const { data } = await axios({
            url: `${urlOrder}/orders`,
            method: "GET",
          });
          orders = data;
          redis.set("orders", JSON.stringify(data));
          return orders;
        } else {
          const { data } = await axios({
            url: `${urlOrder}/orders`,
            method: "GET",
          });
          if (data.length === orders.length) {
            console.log("data sama");
            return orders;
          } else {
            console.log("data ada tapi beda");
            redis.set("orders", JSON.stringify(data));
            orders = data;
            return orders;
          }
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    getOrderById: async (_, args) => {
      try {
        const orderCache = await redis.get("order");
        let order = JSON.parse(orderCache);
        if (orderCache) {
          if (order.id === args.id) {
            return order;
          } else {
            redis.del("order");
            const { data } = await axios({
              url: `${urlOrder}/orders/${+args.id}`,
              method: "GET",
            });
            order = data;
            redis.set("order", JSON.stringify(data));
            return order;
          }
        } else {
          const { data } = await axios({
            url: `${urlOrder}/orders/${args.id}`,
            method: "GET",
          });
          order = data;
          redis.set("order", JSON.stringify(data));
          return order;
        }
      } catch (error) {
        return { errorText: error.response.data.message };
      }
    },
  },
  Mutation: {
    // ! USER
    RegisterUser: async (_, args) => {
      const { username, email, password, phoneNumber, address } = args;
      try {
        await axios({
          url: `${urlOrder}/register`,
          method: "POST",
          data: {
            username,
            email,
            password,
            phoneNumber,
            address,
          },
        });
        return { message: ["Success Register"] };
      } catch (error) {
        return { message: error.response.data.message };
      }
    },
    LoginUser: async (_, args) => {
      const { email, password } = args;
      try {
        await axios({
          url: `${urlOrder}/login`,
          method: "POST",
          data: {
            email,
            password,
          },
        });
        return { message: ["Success Login"] };
      } catch (error) {
        return { message: [error.response.data.message] };
      }
    },
    // ! ORDER
    AddOrder: async (_, args) => {
      try {
        const { data } = await axios({
          url: `${urlOrder}/orders/${args.id}`,
          method: "POST",
        });
        redis.del("order");
        return { message: [data.message] };
      } catch (error) {
        return { message: [error.response.data.message] };
      }
    },
    DeleteOrder: async (_, args) => {
      try {
        const { data } = await axios({
          url: `${urlOrder}/orders/${args.id}`,
          method: "DELETE",
        });
        redis.del("order");
        return { message: [data.message] };
      } catch (error) {
        return { message: [error.response.data.message] };
      }
    },
    UpdateOrder: async (_, args) => {
      console.log(args);
      try {
        const { id, status } = args;
        const { data } = await axios({
          url: `${urlOrder}/orders/${id}`,
          method: "PATCH",
          data: { status },
        });
        redis.del("order");
        return { message: [data.message] };
      } catch (error) {
        return { message: [error.response.data.message] };
      }
    },
    // ! ORDER DETAIL
    AddOrderDetail: async (_, args) => {
      const { id, quantity, OrderId, name, price, imageUrl } = args;
      try {
        const { data } = await axios({
          url: `${urlOrder}/orderDetails/${args.id}`,
          method: "POST",
          data: {
            id,
            quantity,
            OrderId,
            name,
            price,
            imageUrl,
          },
        });
        return { message: [data.message] };
      } catch (error) {
        return {
          message: [error.response.data.message, "Item already in cart"],
        };
      }
    },
    DeleteOrderDetail: async (_, args) => {
      try {
        const { data } = await axios({
          url: `${urlOrder}/orderDetails/${args.id}`,
          method: "DELETE",
        });
        return { message: [data.message] };
      } catch (error) {
        return { message: [error.response.data.message] };
      }
    },
    UpdateOrderDetail: async (_, args) => {
      const { id, action, quantity } = args;
      try {
        const { data } = await axios({
          url: `${urlOrder}/orderDetails/${id}`,
          method: "PATCH",
          data: { action, quantity },
        });
        return { message: [data.message] };
      } catch (error) {
        return { message: [error.response.data.message] };
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

server.listen(PORT).then(({ url }) => {
  console.log(`running => ${url}`);
});
