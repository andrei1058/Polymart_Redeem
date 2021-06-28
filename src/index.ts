// Use the Client that are provided by @typeit/discord NOT discord.js
import { Client } from "@typeit/discord";
import AppDiscord from "./app";
import { checkPolymartUsername } from "./Service/user_manager";
require('dotenv').config();
const axios = require('axios').default;

export const BotAssets = {
    color: '#FFD922',
    name: 'Na',
    description: 'Na',
};

async function start() {
  const client = new Client({
    classes: [
      `${__dirname}/*Discord.ts`, // glob string to load the classes
      AppDiscord,
    ],
    silent: false,
    variablesChar: ":"
  });

  await client.login(process.env.BOT_TOKEN);

  fetchResourceData();
}

async function fetchResourceData() {
    axios.get('https://api.polymart.org/v1/getResourceInfo', {
        params: {
            resource_id: process.env.RESOURCE_ID
        }
      })
      .then(function (response) {
        if (response.data.response.success){
            let data = response.data.response.resource;
            BotAssets.color = data.themeColorDark;
            BotAssets.name = data.title;
            BotAssets.description = data.subtitle;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

start();
