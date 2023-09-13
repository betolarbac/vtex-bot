require("dotenv").config();
const { Client, IntentsBitField, REST, EmbedBuilder, Routes } = require("discord.js");


const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
    ],
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

client.on('interactionCreate', async (i) => {
  const response = await fetch("https://status.vtex.com/api/v2/summary.json");
  const data = await response.json();
  const components = data.components;

  
  const exampleEmbed = new EmbedBuilder()
	.setColor(0xe31c58)
	.setTitle('VTEX STATUS')
	.setURL('https://status.vtex.com/')
	.setAuthor({ name: 'vtex status', iconURL: 'https://avatars.githubusercontent.com/u/1288938?s=280&v=4', url: 'https://vtex.com/br-pt/' })
	.setThumbnail('https://a.storyblok.com/f/194188/474x267/af3452f4b8/vtex-474x267.png')
	.addFields(
		{ name: 'Status Atual', value: `${data.status.description}` },
		{ name: '\u200B', value: '\u200B' },
		{ name: `${components[0].name}`, value: `${components[0].status === "operational" ? ':white_check_mark: ' : ':no_entry:'} ${components[0].status}`, inline: false },
		{ name: `${components[1].name}`, value: `${components[0].status === "operational" ? ':white_check_mark: ' : ':no_entry:'} ${components[0].status}`, inline: false  },
		{ name: `${components[2].name}`, value: `${components[0].status === "operational" ? ':white_check_mark: ' : ':no_entry:'} ${components[0].status}`, inline: false  },
		{ name: `${components[3].name}`, value: `${components[0].status === "operational" ? ':white_check_mark: ' : ':no_entry:'} ${components[0].status}`, inline: false  },
	)
	.setImage('https://a.storyblok.com/f/194188/474x267/af3452f4b8/vtex-474x267.png')
	.setTimestamp()

  if (!i.isChatInputCommand()) return;

  if (i.commandName === 'status') {

    i.reply({ embeds: [exampleEmbed] })
    
  }
} )

client.login(process.env.TOKEN);
