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
- POST ORDERS -> add to cart
  - CREATE OrderDetails dulu
    - Data:
      - ItemId -> dari client
      - CoffeeShopId -> dari client ( req.body ) dari client
      - name & price -> find Item by Id dari database
  - CREATE Orders
    - Data:
      - UserId -> dari req.user.id yang sudah login
      - OrderDetailId -> dari CREATE OrderDetails sebelumnya
      - status = "ready" || "sent" || "delivered"
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
