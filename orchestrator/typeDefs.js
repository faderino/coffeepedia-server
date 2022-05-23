const { gql } = require("apollo-server");

const typeDefs = gql`
    scalar Date

    type Article {
        _id : ID
        title : String
        content : String
        imageUrl : String
        author: String
        tag : [String]
        createdAt : Date
    }
    
    type Category{
        id:ID
        name: String
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
    
    type Photos{
        height: Int
        html_attributions: [String]
        photo_reference: String
        width: Int
    }

    type Location{
        lat: String
        lng: String
    }

    type Northeast{
        lat: String
        lng: String
    }

    type Southwest{
        lat: String
        lng: String
    }

    type ViewPort{
        northeast: Northeast
        southwest: Southwest
    }

    type Geometry{
        location: Location
        viewport: ViewPort
    }

    type Opening_hours{
        open_now : Boolean
    }

    type Maps{
        place_id: String
        name : String
        vicinity: String
        photos : [Photos]
        geometry: Geometry
        rating: Float
        user_ratings_total: Int
        icon: String
        icon_background_color: String
        icon_mask_base_uri: String
        opening_hours: Opening_hours
    }

    type CoffeeShop{
        _id: String
        place_id : String
        name: String
    }

    type Response{
        message : [String]
    }

    type LoginResponse{
        id: ID
        username: String
        balance: Int
        accessToken: String
    }

    type PaymentResponse{
        token: String
        redirect_url : String
    }

    type Query{
        getAllArticle : [Article]
        getArticleById(_id:ID): Article
        getAllItem : [Item]
        getItemById(id:ID) : Item
        getAllOrder(accesstoken: String): [Order]
        getOrderById(
            accesstoken: String!
            id:ID
            ): Order
        getMaps(
            latitude: String
            longitude: String
            ) : [Maps]
        getAllCoffeeShop: [CoffeeShop]
        getCoffeeShopById(
            place_id: String
        ): CoffeeShop
        getAllCategory: [Category]
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
        ) : LoginResponse

        AddOrder(
            id: String
            accesstoken: String
        ): Response

        DeleteOrder(
            id : ID
            accesstoken: String
            ): Response

        UpdateOrder(
            id : ID
            accesstoken: String
            status : String
            ): Response

        AddOrderDetail(
            accesstoken: String
            id: ID
            quantity: Int
            OrderId: Int
            name: String
            price: Int
            imageUrl: String
        ): Response

        DeleteOrderDetail(
            accesstoken: String
            id:ID
            ): Response

        UpdateOrderDetail(
            accesstoken: String
            id:ID
            action: String
            quantity: Int
        ) : Response
        
        AddCoffeeShop(
            place_id: String
            name: String
        ) : Response

        DeleteCoffeeShop(
            place_id: String
        ) : Response

        DoPayment(
            accesstoken: String
            email: String
            totalPrice: Int 
            OrderId: Int
        ): PaymentResponse

        AddArticle(
            title: String,
            content: String,
            imageUrl: String,
            author: String,
            tag: [String],
            createdAt: String
        ): Response
    }
`

module.exports = typeDefs