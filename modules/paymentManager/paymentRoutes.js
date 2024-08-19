import PaymentController from "./paymentController.js";

async function paymentRoutes(app) {
  app.post(
    "/send",
    {
      preHandler: [app.authenticate],
      schema: {
        description: "Send money to an account",
        tags: ["payment"],
        summary: "This will add an account balance in 30 seconds",

        response: {
          200: {
            description: "Successful response",
            type: "object",
            properties: {
              message: { type: "string" },
              data: {
                type: "object",
                properties: {
                  id: {type: "integer"},
                  type: {type: "string"},
                  AccountId: {type: "integer"},
                  amount: {type: "integer"},
                  createdAt: {type: "string"}
                }
              }
              
            },
          },
        },
      },
    },
    PaymentController.sendMoneyHandler
  );
  app.post("/recurring", { preHandler: [app.authenticate] }, PaymentController.recurringPaymentHandler);
  app.post("/withdraw", { preHandler: [app.authenticate] }, PaymentController.withdrawHandler);
}

export default paymentRoutes;