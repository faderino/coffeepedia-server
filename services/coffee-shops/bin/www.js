const {connection} = require('../config/mongoConnection')
const app = require('../app.js')
const port = process.env.PORT || 4002;

connection()
.then(() => {
  console.log('db connect')
  app.listen(port, () => {
    console.log("app connected to " + port);
  })
})
.catch(err => {
  console.log(err)
  console.log('db not connect')
})