import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../helpers/helpers.js";
const prisma = new PrismaClient();

class AccountController {
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
}

export default AccountController;