import { GuildMember } from "discord.js";
const axios = require('axios').default;

export async function hasRedeemRole(user: GuildMember): Promise<boolean> {
    let response = false;

    try {
        let roles: string[] = await user['_roles'];
        await roles.forEach(role => {
            if (Number(role) === Number(process.env.ROLE_TO_REDEEM)) {
                response = true;
                return response;
            }
        });
    } catch { }

    return response;
}

export async function checkPolymartUsername(userId: number): Promise<any> {
    var responsee: any;
    await axios.post('https://api.polymart.org/v1/getUserData', {
        api_key: process.env.POLYMART_KEY,
        user_id: userId,
    })
        .then(response => {
            if (response.data.response.success) {
                let data = response.data.response.user;
                responsee = data;
            } else {
                responsee = response;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    return responsee;
}

export async function addBuyerOnPolymart(userId: number, resource: number): Promise<any> {
    var res : any;
    await axios.post('https://api.polymart.org/v1/addBuyer', {
        api_key: process.env.POLYMART_KEY,
        user_id: userId,
        resource_id: resource,
    }).then(response => {
        res = response.data.response;
    })

    return res;
}