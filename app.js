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

//setup auth
app.decorate('authenticate', async (req, res) => {
  const token = req.cookies.access_token;
  try {
    if (!token) {
      return res.status(401).send({ message: "Please login first" });
    }

    const decoded = await req.jwt.verify(token);
    req.user = decoded;
    console.log(decoded, 'decoded');
    
    } catch (error) {
      console.log(error);
      res.status(401).send({message: "Invalid token"})
    }
    
    
  }
)


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

