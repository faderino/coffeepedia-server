const midtransClient = require("midtrans-client");
// Create Snap API instance
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_KEY,
  clientKey: process.env.MIDTRANS_CLIENT,
});

let getCurrentTimestamp = () => {
  return "" + Math.round(new Date().getTime() / 1000);
};

module.exports = { snap, getCurrentTimestamp };
