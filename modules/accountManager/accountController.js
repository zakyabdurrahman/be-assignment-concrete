
import { hashPassword, verifyPassword} from "../../helpers/helpers.js";
import prisma from "../../config/connection.js";

class AccountController {
  static async loginHandler(request, response) {
    const {email, password} = request.body;

    try {
      //check if inputted
      if (!email || !password) throw {code: 'inputError'};

      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (!user || !verifyPassword(password, user.password)) throw {code: 'invalidCred'};

      const payload = {
        email,
        userId: user.id
      }

      const token = request.jwt.sign(payload);

      response.setCookie('access_token', token, {
        path: '/',
        httpOnly: true,
        secure: true
      })

      response.code(200).send({
        message: 'Login successful'
      })


    } catch (error) {
       if (error.code === "inputError") {
         response.code(400).send({
           message: "Email/password required",
         });
       } else if (error.code === 'invalidCred') {
          response.code(401).send({
            message: "Invalid email/password",
          });
       } else {
         response.code(500).send({
           message: "Internal Server Error",
         });
       }
    }
  }

  static async registerUserHandler(request, response) {
    const {name, email, password} = request.body;
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password:  hashPassword(password)
        }
      })
      response.code(201).send({
        message: "Register success",
        data: {
          name: user.name,
          email: user.email
        }
      })

    } catch (error) {
      
      if (error.code === 'P2002') {
        response.code(400).send({
          message: "Email must be unique",
        });
      } else {
        response.code(500).send({
          message: "Internal Server Error",
        });
      }
      
      
    }
    
  }

  static async createAccountHandler(request, response) {
    const { type, currency, amount } = request.body;
    
    try {
      console.log(request.user);
      const newAccount = await prisma.account.create({
        data: {
          UserId: request.user.userId,
          currency: currency,
          type,
          amount,
        },
      });

      response.status(200).send({
        message: "Successfully create new Account",
        data: newAccount,
      });
    } catch (error) {
      response.code(500).send({
        message: "Internal Server Error",
      });
    }
  }

  static async getAllUserAccounts(request, response) {
    try {
      const {userId} = request.user;

      const user = await prisma.user.findUnique({
        include: {
          accounts: true
        },
        where: {
          id: userId
        }
      })

      response.code(200).send({
        message: "Success get accounts",
        data: user.accounts
      })


    } catch (error) {
      response.code(500).send({
        message: "Internal Server Error",
      });
    }
  }

  static async getAccountTransactions(request, response) {
    const {accountId} = request.params;

    try {
      const transactions = await prisma.transaction.findMany({
        where: {
          AccountId: Number(accountId)
        }
      })

      response.code(200).send({
        message: "Success get transactions",
        data: transactions
      })
    } catch (error) {
      console.log(error);
      
      response.code(500).send({
        message: "Internal Server Error",
      });
    }
  }
}

export default AccountController;