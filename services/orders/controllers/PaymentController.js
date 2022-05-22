const { getCurrentTimestamp, snap } = require("../helpers/Midtrans");
class PaymentController {
  static async midTrans(req, res, next) {
    try {
      const { email, totalPrice, OrderId } = req.body;

      let parameter = {
        transaction_details: {
          order_id: OrderId,
          gross_amount: totalPrice,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: email,
        },
      };

      console.log(parameter);

      let donation = await snap.createTransaction(parameter);

      res.status(200).json({
        token: donation.token,
        redirect_url: donation.redirect_url,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PaymentController;
