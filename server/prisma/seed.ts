import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();


async function main() {

    const user = prisma.user.create({
        data:{
            nome:'Jhon Doe',
            email:'jhon.doe@gmail.com',
            avatarUrl:'github.com/PedroNerySoares.png'

            
        }
    })
    const pool = prisma.pool.create({
        data:{
            title:'example Pool',
            code:'BOL123',
            ownerId:(await user).id,
            participants:{
                create:{
                    userId:(await user).id
                }
            }
        }
    })

    await prisma.game.create({
        data:{
            date:'2022-11-11T15:55:05.882Z',
            firstTeamCountryCode:'DE',
            secondTeamCountryCode:'BR'

        }
    })

    await prisma.game.create({
        data:{
            date:'2022-12-11T15:55:05.882Z',
            firstTeamCountryCode:'BR',
            secondTeamCountryCode:'AR',
            
            guesses:{
                create:{
                    firstTeamPoint:2,
                    secondtTeamPoint:1,
                    
                    participant:{
                        connect:{
                        userId_poolId:{
                            userId:(await user).id,
                            poolId:(await pool).id,
                        }
                        }
                    }    
                }
            }
        }
    })
    

}
main()