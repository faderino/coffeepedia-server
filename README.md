# Coffeepedia

## Live version of the app can be found here https://m-coffeepedia.web.app/

## Tech stack:

- Node.js
- Express
- MongoDB
- PostgreSQL
- Sequelize
- Apollo-Server
- GraphQL
- Redis

## PORT Development

- orchestrator: 4000
- services:
  - articles: 4001
  - google-map: 4002
  - orders: 4003

## Endpoints:

### Service/ Orders

/users/

- POST LOGIN
- POST REGISTER

/items/

- GET ALL ITEMS
- GET ITEM BY ID

/orders/

- GET ORDERS -> get all orders
- GET ORDER BY ID /:id -> get single order
- POST ORDERS /:CoffeeShopId 
- PATCH ORDERS /:id, body: { status: "unpaid" || "ready" || "sent" || "delivered" }
- DELETE ORDERS /:id, params: OrderId -> delete from cart

/orderDetails

- POST ORDER DETAILS /:ItemId
  - params: ItemId
  - body: { quantity: 3 }
- DELETE ORDERS DETAILS, params: id -> delete from cart
- PATCH ORDER DETAILS -> increment/ decrement quantity
  - params: id,
  - body: { action: "increment" || "decrement" }

### Service/ Articles

/articles/

- GET ALL
- GET BY ID

### Service/ Coffee-Shops

- GET ALL PARTNER COFFEE SHOPS
  response: {
    place_id: String
  }
- GET NEARBY COFFEE SHOPS

## Flow



### Flow article



### Flow Coffee Radar



### Flow Order



### Flow payment



### Tracking Order

-

## Testing

- Drop db testing: `sequelize --env test db:drop`
- Created db testing: `sequelize --env test db:create`
- Migrate db testing: `sequelize --env test db:migrate`
- Seeding db testing: `sequelize --env test db:seed:all`
- Ketika run test, app.listen nya boleh dicomment atau bikin di bin/www, di app.js lakukan module.exports = app
- Pada package.json tambahkan script `"test": "jest --runInBand --detectOpenHandles --forceExit"`
