import PaymentController from "./paymentController.js";

async function paymentRoutes(app) {
  app.post('/send', { preHandler: [app.authenticate] } ,PaymentController.sendMoneyHandler);
  app.post("/recurring", { preHandler: [app.authenticate] }, PaymentController.recurringPaymentHandler);
  app.post("/withdraw", { preHandler: [app.authenticate] }, PaymentController.withdrawHandler);
}

export default paymentRoutes;