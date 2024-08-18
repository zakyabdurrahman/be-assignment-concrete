import AccountController from "./accountController.js"

async function accountRoutes(app) {
  app.post('/register', AccountController.registerUserHandler)
  app.post('/login', AccountController.loginHandler)
}

export default accountRoutes