if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
require('dotenv').config()
const cors = require('cors')
// const errorHandler = require('./middleware/errorHandler')
const express = require('express')
const { connection } = require('./config/connection.js');
const app = express()
const port = process.env.PORT || 4001
const router = require('./routes/index')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)

// app.use(errorHandler)

// jika koneksi ke mongodb gagal app.listen tidak akan jalan,
// jadi kita masukan app.listenya ke dalam proses koneksi ke mongodb

connection()
    .then(() => {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    })

module.exports = app