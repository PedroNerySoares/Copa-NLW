import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import cors from '@fastify/cors'
async function bootstrap(){

    const prisma = new PrismaClient({
        log:['query'],
    })

    const fastify = Fastify({
        logger:true,

    })
    await fastify.register(cors,{
        // colocar dominio
        origin:true,
        
    })

    fastify.get('/pools/count',async ()=>{
        const count = await prisma.pool.count();
        
        return {count}
    })

    await fastify.listen({port:3333, host:'0.0.0.0'})
    
}

bootstrap();