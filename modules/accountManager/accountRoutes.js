import AccountController from "./accountController.js"

async function accountRoutes(app) {
  app.post('/register', AccountController.registerUserHandler)
}

export default accountRoutes