import { Command, CommandMessage, Discord } from "@typeit/discord";
import exp = require("constants");
import { Client, MessageEmbed, User } from "discord.js";
import { BotAssets } from ".";
import { addRedeem, hasRedeem } from "./Service/database_manager";
import { addBuyerOnPolymart, checkPolymartUsername, hasRedeemRole } from "./Service/user_manager";

export interface IHash {
    [details: string]: any;
}

let myhash: IHash = {};

@Discord(".")
abstract class AppDiscord {
    @Command("redeemOnPolymart :username")
    private async reedemOnPolymart(cmd: CommandMessage) {
        let checkRole = await hasRedeemRole(cmd.member);
        if (!checkRole) {
            return;
        }
        if (await hasRedeem(Number(process.env.RESOURCE_ID), Number(cmd.member.user.id))) {
            return cmd.reply('https://youtu.be/dQw4w9WgXcQ?t=43');
        }

        let username = cmd.args.username;

        if (username === undefined) {
            cmd.reply(this.buildUsage(cmd.client, cmd.author));
            return;
        }

        let timedRequest = await myhash[cmd.member.user.id];
        if (timedRequest === undefined) {
            checkPolymartUsername(username).then(resp => {
                myhash[cmd.member.user.id] = resp;
                cmd.reply(this.showProvidedAccount(resp.username, resp.profilePictureURL, cmd.author));
            });
        } else {
            if (username === timedRequest.id) {
                cmd.reply(this.showProvidedAccount(timedRequest.username, timedRequest.profilePictureURL, cmd.author));
            } else {
                checkPolymartUsername(username).then(resp => {
                    myhash[cmd.member.user.id] = resp;
                    cmd.reply(this.showProvidedAccount(resp.username, resp.profilePictureURL, cmd.author));
                });
            }
        }
    }

    @Command("no")
    private async cancelRedeen(cmd: CommandMessage) {
        hasRedeemRole(cmd.member).then(verdict => {
            if (verdict) {
                let timedRequest = myhash[cmd.member.user.id];
                if (timedRequest === undefined) {
                    return cmd.reply("There isn't any pending requests. Use .redeemOnPolymart to reedem your copy.");
                }
                cmd.reply(this.buildEmbed('Request cancelled!', cmd.author));
                delete myhash[cmd.member.user.id];
            }
        });
    }

    @Command("yes")
    private async confirmRedeem(cmd: CommandMessage) {
        hasRedeemRole(cmd.member).then(async verdict => {
            if (verdict) {
                let timedRequest = myhash[cmd.member.user.id];
                if (timedRequest === undefined) {
                    return cmd.reply("There isn't any pending requests. Use .redeemOnPolymart to reedem your copy.");
                }
                let post = await addBuyerOnPolymart(Number(timedRequest.id), Number(process.env.RESOURCE_ID));
                if (post === undefined || post === null) {
                    return cmd.reply(this.buildEmbed('Something went wrong!', cmd.author));
                }
                delete myhash[cmd.member.user.id];
                if (post.success) {
                    addRedeem(Number(process.env.RESOURCE_ID), Number(cmd.member.user.id), Number(timedRequest.id));
                    cmd.reply(this.buildEmbed('Done! You got access to ' + BotAssets.name + ' on polymart.org', cmd.author));
                    cmd.reply('https://polymart.org/resource/' + process.env.RESOURCE_ID)
                } else {
                    cmd.reply(this.buildEmbed(post.errors.global, cmd.author));
                }
            }
        });
    }



    private buildUsage(client: Client, user: User): MessageEmbed {

        return new MessageEmbed()
            .setColor(BotAssets.color)
            .setAuthor('', '', 'https://polymart.org')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: 'You are about to reedem a copy of ' + BotAssets.name + ' on polymart.org', value: 'Make sure you have an account first!' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Command usage:', value: '.reedemOnPolymart myPolymartUserId', inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: '\u200B', value: 'Go on your profile and get the last numbers after the dot.' },
            )
            .setImage('https://i.imgur.com/ZZNo5d2.png')
            .setFooter('Requested by ' + user.username, user.displayAvatarURL());
    }

    private showProvidedAccount(username, avatar, user: User): MessageEmbed {

        return new MessageEmbed()
            .setColor(BotAssets.color)
            .setAuthor('', '', 'https://polymart.org')
            .setThumbnail(avatar)
            .addFields(
                { name: 'You are claiming a copy of ' + BotAssets.name + ' on this account: ', value: username },
                { name: '\u200B', value: '\u200B' },
                { name: 'Do you want to continue?', value: 'This operation cannot be undone!' },
                { name: '.yes', value: 'Type confirm.', inline: true },
                { name: '.no', value: 'Type cancel your request.', inline: true },
                { name: '\u200B', value: '\u200B', inline: true },
                { name: '\u200B', value: '\u200B' },
            )
            .setFooter('Requested by ' + user.username, user.displayAvatarURL());
    }

    private buildEmbed(message: string, user: User): MessageEmbed {

        return new MessageEmbed()
            .setColor(BotAssets.color)
            .setAuthor('', '', 'https://polymart.org')
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: '\u200B', value: message },
                { name: '\u200B', value: '\u200B' },
            )
            .setFooter('Requested by ' + user.username, user.displayAvatarURL());
    }
}

export default AppDiscord;