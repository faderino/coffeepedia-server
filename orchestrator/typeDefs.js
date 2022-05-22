const { gql } = require("apollo-server");

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

    type OrderDetail{
        id: ID
        ItemId: Int
        OrderId : Int
        name : String
        price : Int 
        quantity : Int 
        imageUrl : String 
        createdAt : Date
        updatedAt : Date
    }

    type Order{
        id: ID
        UserId: Int
        CoffeeShopId: String
        status: String
        createdAt: Date
        updatedAt: Date
        OrderDetails: [OrderDetail]
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
        getAllOrder: [Order]
        getOrderById(id:ID): Order
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

        AddOrder(
            id: String
        ): Response

        DeleteOrder(id : ID): Response
        UpdateOrder(
            id : ID
            status : String
            ): Response

        AddOrderDetail(
            id: ID
            quantity: Int
            OrderId: Int
            name: String
            price: Int
            imageUrl: String
        ): Response

        DeleteOrderDetail(id:ID): Response

        UpdateOrderDetail(
            id:ID
            action: String
            quantity: Int
        ) : Response

    }
`

module.exports = typeDefs