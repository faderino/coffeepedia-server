const { getCurrentTimestamp, snap } = require("../helpers/Midtrans");
class PaymentController {
  static async midTrans(req, res, next) {
    try {
      const { email, amount } = req.body;
      let id = "donate-" + getCurrentTimestamp();
      let parameter = {
        transaction_details: {
          order_id: id,
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: email,
        },
      };

      let donation = await snap.createTransaction(parameter);

      let token = donation.token;

      let redirect_url = donation.redirect_url;

      res.status(200).json({
        token,
        redirect_url,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PaymentController;
