import prisma from "../../config/connection.js";
import { processTransaction } from "../../helpers/helpers.js";

class PaymentController {
  static async sendMoney(request, response) {

    const {destinationAccount, amount} = request.body;

    try {
      
      //add destination account
      await prisma.account.update({
        where: {
          id: destinationAccount
        },
        data: {
          amount: {
            increment: amount
          }
        }
      })


      await processTransaction(request.body);



    } catch (error) {
      response.code(500).send({
        message: "Internal Server Error",
      });
    }
  }
}

export default PaymentController