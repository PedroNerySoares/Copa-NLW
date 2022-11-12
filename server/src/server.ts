import Fastify from "fastify";
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { poolRoutes } from "./routes/pools";
import { authRoutes } from "./routes/auth";
import { gamesRoutes } from "./routes/games";
import { guessRoutes } from "./routes/guess";
import { usersRoutes } from "./routes/user";

async function bootstrap(){


    const fastify = Fastify({
        logger:true,

    })
    
    await fastify.register(cors,{
        // colocar dominio
        origin:true,
        
    })
    
    //varaivel ambiente
    await fastify.register(jwt,{
        secret:'nlwcopa',
    })

    await fastify.register(authRoutes)
    await fastify.register(gamesRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(poolRoutes)
    await  fastify.register(usersRoutes)


    


    await fastify.listen({port:3333})
    
}

bootstrap();