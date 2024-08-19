import PaymentController from "./paymentController.js";

async function paymentRoutes(app) {
  app.post(
    "/send",
    {
      preHandler: [app.authenticate],
      schema: {
        description:
          "Send money to an account. destinationAccount is your target account id",
        tags: ["payment"],
        summary: "This will add an account balance in 30 seconds",
        body: {
          type: "object",
          properties: {
            destinationAccount: { type: "integer" },
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
                  type: { type: "string" },
                  AccountId: { type: "integer" },
                  amount: { type: "integer" },
                  createdAt: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    PaymentController.sendMoneyHandler
  );
  app.post(
    "/recurring",
    {
      preHandler: [app.authenticate],
      schema: {
        description:
          "This will create a scheduled job that will run on given interval which is in seconds so if interval is 20 then the payment will be done every 20 seconds (plus processing time). destinationAccount is your target account id",
        tags: ["payment"],
        summary: "Setup recurring payment to an account",
        body: {
          type: "object",
          properties: {
            destinationAccount: { type: "integer" },
            amount: { type: "integer" },
            interval: { type: "integer" },
          },
        },

        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    PaymentController.recurringPaymentHandler
  );
  app.post(
    "/withdraw",
    {
      preHandler: [app.authenticate],
      schema: {
        description: "Withdraw money from an account. destinationAccount is your target account id",
        tags: ["payment"],
        summary: "This will substract an account balance in 30 seconds",
        body: {
          type: "object",
          properties: {
            destinationAccount: { type: "integer" },
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
                  type: { type: "string" },
                  AccountId: { type: "integer" },
                  amount: { type: "integer" },
                  createdAt: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    PaymentController.withdrawHandler
  );
}

export default paymentRoutes;