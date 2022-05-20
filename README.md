# Coffeepedia

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

- GET ORDERS -> get cart
- POST ORDERS /:CoffeeShopId -> ketika user menekan tombol ORDER pada detail CoffeeShop yang sedang dilihat
  - Find dulu Order dengan UserId dan CoffeeshopId yang sesuai.
  - Cari apakah ada yang statusnya "unpaid".
  - Apabila tidak ada, Order.create()
  - Apabila ada res.status, Simpan OrderId di LocalStorage atau sejenisnya
- DELETE ORDERS, params: OrderId -> delete from cart

/orderDetails

- POST ORDER DETAILS /:ItemId
  - params: ItemId
  - body: { quantity: 3 }
- DELETE ORDERS, params: OrderDetailId -> delete from cart
- PATCH ORDER, params: OrderDetailId -> increment/ decrement quantity

/orders/:OrderId/status

- /ready PATCH ORDERS -> mengubah status dari pesanan.
  - params: OrderId
  - body: {
    status: "ready"
    }

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

- Masuk ke home page yang isinya

### Flow Coffee Radar

- Di client menggunakan map embed dan open location.
- Client fetch data nearbySearch(), masukkan ke embed map nya.
- Response dari nearbySearch() array of PlaceResults object, dimana masing2 object terdapat place_id.
- Request ke GET ALL COFFEE SHOPS untuk mendapatkan coffe shops yang menjadi mitra.
- Dibuat kondisi, bagi coffee shops yang merupakan mitra, bisa order, kalau tidak, tidak bisa order.
- GET ITEMS lagi untuk menampilkan menu.

### Flow Order

- Perlu login untuk memasukkan item ke cart (order item).
- User memilih item yang akan diorder.
- Ketika button order dipencet,akan request POST ORDERS dari microservice.
- Setelah berhasil, order akan muncul di cart.
- User bisa cari restoran lain dan order lagi.

- Di dalam cart, apabila user mau menghapus salah satu orderan, bisa pencet tombol delete lalu terjadi request DELETE ORDERS.
- Jika user mau mengubah quantity dari item yang diorder, bisa dipencet ombolnya dan terjadi request ke PATCH ORDER

### Flow payment

- Ketika klik payment, muncul opsi pembayaran.
- User memilih opsi pembayaran.
- Proses
- Payment selesai

### Tracking Order

-

## Testing

- Drop db testing: `sequelize --env test db:drop`
- Created db testing: `sequelize --env test db:create`
- Migrate db testing: `sequelize --env test db:migrate`
- Seeding db testing: `sequelize --env test db:seed:all`
- Ketika run test, app.listen nya boleh dicomment atau bikin di bin/www, di app.js lakukan module.exports = app
- Pada package.json tambahkan script `"test": "jest --runInBand --detectOpenHandles --forceExit"`
