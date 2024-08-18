import fastify from "fastify"
import accountRoutes from './modules/accountManager/accountRoutes.js'
import fastifyCookie from "@fastify/cookie"
import fastifyJwt from "@fastify/jwt";

const app = fastify({
    logger: true
})

//setup jwt plugin
app.register(fastifyJwt, {
  secret: 'secret'
})

app.addHook('preHandler', (req, res, next) => {
  req.jwt = app.jwt;
  return next();
})


//setup cookie
app.register(fastifyCookie, {
  secret: 'secret',
  hook: 'preHandler'
})


//setup services
app.register(accountRoutes, {prefix: 'api/account'})

//running
app.listen({port: 4000, host: '0.0.0.0'}, (err, address) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    } 
})

