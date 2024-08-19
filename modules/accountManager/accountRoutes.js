import AccountController from "./accountController.js"

async function accountRoutes(app) {
  app.post(
    "/register",
    {
      schema: {
        description: "Register a user",
        tags: ["account"],
        summary: "this will register a new user",
        body: {
          type: "object",
          properties: {
            name: {type: "string"},
            email: { type: "string" },
            password: { type: "string" },
          },
        },
        response: {
          201: {
            description: "Successful response",
            type: "object",
            properties: {
              message: { type: "string" },
              data: {
                type: "object",
                properties: {
                  name: {type: 'string'},
                  email: {type: 'string'}
                }
              }
            },
          },
        },
      },
    },
    AccountController.registerUserHandler
  );

  app.post('/login', {
    schema: {
      description: 'User login',
      tags: ['account'],
      summary: "this will authenticate the user",
      body: {
        type: 'object',
        properties: {
          email: {type: 'string'},
          password: {type: 'string'}
        }
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            message: {type: 'string'}
          }
        }
      }
    }
  }, AccountController.loginHandler);

  app.post(
    "/",
    {
      preHandler: [app.authenticate],
      schema: {
        description: "Make a new account",
        tags: ["account"],
        summary:
          "This will open a new account under current logged in user's identity",
        body: {
          type: "object",
          properties: {
            type: { type: "string" },
            currency: { type: "string" },
            amount: { type: "integer" },
          },
        },
        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              message: { type: "string" },
              data: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  UserId: { type: "integer" },
                  type: { type: "string" },
                  amount: { type: "integer" },
                  currency: { type: "string" },
                  createdAt: { type: "string" },
                  updatedAt: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    AccountController.createAccountHandler
  );
  app.get(
    "/",
    {
      preHandler: [app.authenticate],
      schema: {
        description: "Get all accounts owned by user",
        tags: ["account"],
        summary: "This will fetch all of user's account",

        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              message: { type: "string" },
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer" },
                    UserId: { type: "integer" },
                    type: { type: "string" },
                    amount: { type: "integer" },
                    currency: { type: "string" },
                    createdAt: { type: "string" },
                    updatedAt: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
    AccountController.getAllUserAccounts
  );
  app.get("/transactions/:accountId", { preHandler: [app.authenticate] }, AccountController.getAccountTransactions);
}

export default accountRoutes