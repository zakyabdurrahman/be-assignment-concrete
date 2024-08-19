import prisma from "../../config/connection.js";
import { processTransaction } from "../../helpers/helpers.js";
import schedule from 'node-schedule';



class PaymentController {
  static async sendMoneyHandler(request, response) {

    const {destinationAccount, amount} = request.body;
    
    

    try {
      
      //add to destination account
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

      //add record transaction
      const transaction = await prisma.transaction.create({
        data: {
          AccountId: destinationAccount,
          type: "transfer",
          amount: amount

        }
      })


      await processTransaction(request.body);

      response.code(200).send({
        message: "Transfer success",
        data: transaction
      })

    } catch (error) {
      response.code(500).send({
        message: "Internal Server Error",
      });
    }
  }

  static async recurringPaymentHandler(request, response) {
    const {destinationAccount, amount, interval} = request.body;

    

    try {
      let rule = new schedule.RecurrenceRule();
      rule.second = interval;
      schedule.scheduleJob(rule, async () => {
        await prisma.account.update({
          where: {
            id: destinationAccount,
          },
          data: {
            amount: {
              increment: amount,
            },
          },
        });
        await processTransaction(request.body)
      })
      response.code(200).send({
        message: 'Recurring payment set'
      })
    } catch (error) {
      console.log(error);
      
      response.code(500).send({
        message: "Internal Server Error",
      });
    }
  }

  static async withdrawHandler(request, response) {
    const {destinationAccount, amount} = request.body;
    let transaction = null;

    try {
      await prisma.account.update({
        where: {
          id: destinationAccount,
        },
        data: {
          amount: {
            decrement: amount,
          },
        }
      })

      transaction = await prisma.transaction.create({
        data: {
          type: "withdrawal",
          AccountId: destinationAccount,
          amount: amount,
        }
      })
     
        //add transaction record
       

     
      await processTransaction(request.body);


      response.code(200).send({
        message: "suceess withdraw from account",
        data: transaction
      })

      
    } catch (error) {
      console.log(error);

      response.code(500).send({
        message: "Internal Server Error",
      });
    }
  }
}

export default PaymentController