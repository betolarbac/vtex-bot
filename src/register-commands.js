require("dotenv").config();
const { Client, IntentsBitField, REST, Routes } = require('discord.js');

const client = new Client({ 
  intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
  ] 
});

client.on('ready', () => {
  console.log(`Logado como ${client.user.tag}`);
});

client.on('guildCreate', async (guild) => {
  console.log(`Bot adicionado ao servidor: ${guild.name} (ID: ${guild.id})`);

  
  const commands = [
    {
      name: 'status',
      description: 'status da vtex',
    },
  ];

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  try {
    console.log('comando carregando');
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guild.id), {
      body: commands,
    });
    console.log('comando registrando');
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.TOKEN);
