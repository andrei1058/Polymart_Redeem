import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

/**
 * Check if the given user has redeemed the given resource.
 * @param resource 
 * @param user 
 */
export async function hasRedeem(resource : number, user: number) : Promise<boolean> {
    try {
        let response = await prisma.polymart_reedems_from_discord.findFirst({
            where: {
                discord_user_id: {
                    equals: user,
                },
                resource_id: {
                    equals: resource,
                }
            }
        });
        if (response != null){
            return true;
        }
    } catch {}
    return false;
}

export async function addRedeem(resource : number, user: number, polymart_user : number) {
    await prisma.polymart_reedems_from_discord.create({
        data: {
            discord_user_id: user,
            polymart_user: polymart_user,
            resource_id: resource,
        }
    }).catch(err => console.log(err));
}