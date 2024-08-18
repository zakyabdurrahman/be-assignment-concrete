import AccountController from "./accountController.js"

async function accountRoutes(app) {
  app.post('/register', AccountController.registerUserHandler)
  app.post('/login', AccountController.loginHandler);
  app.post('/', {preHandler: [app.authenticate]}, AccountController.createAccountHandler);
  app.get('/', { preHandler: [app.authenticate] }, AccountController.getAllUserAccounts);
}

export default accountRoutes