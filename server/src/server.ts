import { PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import {z } from 'zod'
import cors from '@fastify/cors'
import ShortUniqueId from 'short-unique-id';

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


    fastify.get('/users/count',async ()=>{
        const count = await prisma.user.count();
        return {count}
    })

    fastify.get('/guesses/count',async ()=>{
        const count = await prisma.guess.count();
        return {count}
    })









    fastify.post('/pools',async (request,reply)=>{
       
        const createPoolBody = z.object({
        // const  {title} = request.body
        // serve para validar os campos
            title: z.string(),

        })
        const {title} = createPoolBody.parse(request.body)

        const generate =  new ShortUniqueId({length:6})
        const code = String(generate()).toUpperCase()



        await prisma.pool.create({
            data:{
                title,
                code
            }
        })
        
        return reply.status(201).send({code})
        // return{title}

    })


    await fastify.listen({port:3333})
    
}

bootstrap();