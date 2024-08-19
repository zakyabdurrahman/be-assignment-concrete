import fastify from "fastify"
import accountRoutes from './modules/accountManager/accountRoutes.js'
import fastifyCookie from "@fastify/cookie"
import fastifyJwt from "@fastify/jwt";
import paymentRoutes from "./modules/paymentManager/paymentRoutes.js";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

const app = fastify({
    logger: true
})


//setup swagger
app.register(swagger, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "Concrete AI Take Home Assignment",
      description:
        "A simple financial service backend made with fastify and prisma",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
        description: "Development server",
      },
    ],
    tags: [
      { name: "account", description: "Account Manager endpoints" },
      { name: "payment", description: "Payment Manager related endpoints" },
    ],
    

    
  },
});

app.register(swaggerUI, {
  routePrefix: '/docs',
  staticCSP: true,
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
    //check if user exist
    
    req.user = decoded;
    
    
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
app.register(paymentRoutes, {prefix: 'api/payment'})

//running
app.listen({port: 4000, host: '0.0.0.0'}, (err, address) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    } 
})

await app.ready();
app.swagger();


