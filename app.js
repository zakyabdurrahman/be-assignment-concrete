import fastify from "fastify"
import accountRoutes from './modules/accountManager/accountRoutes.js'

const app = fastify({
    logger: true
})

//setup services
app.register(accountRoutes, {prefix: 'api/account'})

//running
app.listen({port: 3000}, (err, address) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    } 
})

