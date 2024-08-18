import PaymentController from "./paymentController.js";

async function paymentRoutes(app) {
  app.post('/send', { preHandler: [app.authenticate] } ,PaymentController.sendMoneyHandler);
  app.post("/recurring", { preHandler: [app.authenticate] }, PaymentController.recurringPaymentHandler);
}

export default paymentRoutes;