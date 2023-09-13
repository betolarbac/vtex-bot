require("dotenv").config();
const { REST,Routes  } = require('discord.js');


const commands = [
  {
    name: 'status',
    description: 'status da vtex',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('comando carregando');
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
      body: commands,
    });
    console.log('comando registrando');
  } catch (error) {
    console.error(error);
  }
})();
