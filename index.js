const { Client, GatewayIntentBits, Partials, Collection, Events, EmbedBuilder } = require("discord.js")
const fs = require('node:fs');
const path = require('node:path');
const config = require("./config.json");
const InteractionCreateAction = require("discord.js/src/client/actions/InteractionCreate");
const Discord = require("discord.js")
const chalk = require("chalk")
const db = require("megadb")
const votes_count = new db.crearDB("votes_count", "eventos")
const votes_used = new db.crearDB("votes_used", "eventos")

// Databases

const nuevo = new db.crearDB("nuevo")

// Client Configs

const client = new Client({ 
    intents: [
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    ],

    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User,
    ]
});

client.slashCommands = new Collection();
const slashCommandsFiles = fs
  .readdirSync("./slashCommands")
  .filter((file) => file.endsWith("js"));

for (const file of slashCommandsFiles) {
  const slash = require(`./slashCommands/${file}`);
  client.slashCommands.set(slash.data.name, slash);
}

const { REST, Routes } = require("discord.js");
const commands = [];

for (const file of slashCommandsFiles) {
  const slash = require(`./slashCommands/${file}`);
  commands.push(slash.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken("BotToken");

createSlash();

async function createSlash() {
  try {
    await rest.put(Routes.applicationCommands("BotClientID"), {
      body: commands,
    });
    console.log(chalk.greenBright.bold("[Slash Commands] Agregados."))
    console.log(slashCommandsFiles)
  } catch (e) {
    console.error(e);
  }
}

// Command Event Handling & Interactions

client.on("ready", () => {
  console.log(`¡Listo como ${chalk.cyan.bold(client.user.tag)}!`);
});

client.on("ready", () => {
    const { ActivityType } = require('discord.js');

    client.user.setActivity('Acroamatic Abatement', { type: ActivityType.Playing });
})

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Events
client.on("interactionCreate", async (interaction) => {
    
    const slashCommand = client.slashCommands.get(interaction.commandName);

    if (!slashCommand) return;

    try {
      await slashCommand.run(client, interaction);
    } catch (e) {
      console.error(e);
    }
          
});

client.on("interactionCreate", (interaction) => {

if(interaction.isCommand()){ 
    console.log(`${chalk.cyan.bold(interaction.user.username)} ha usado el comando ${chalk.blue(interaction.commandName)}`)
    
    if(interaction.guild.id === "1204694109420261516") return
    if(interaction.user.id === "1144403268076830730") return 
    
    const UsedCommandEmbed = new Discord.EmbedBuilder()
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
    .setDescription(`<@${interaction.user.id}> ha usado el comando **/${interaction.commandName}** en el canal <#${interaction.channel.id}>`)
    .setColor("Yellow")
    .setTimestamp()
    .setFooter({ text: "NEW UNDERGROUNDS" })
    
    client.channels.cache.get("1030627488289792060").send({ embeds: [UsedCommandEmbed] })
    }
})

client.on("messageCreate", message => {
    
    const PingResponse = new Discord.EmbedBuilder()
    .setTitle(`¡Hola ${message.author.username}!`)
    .setDescription("Soy el bot oficial de NEW UNDERGROUNDS.\n\nPuedes ver mi lista de comando usando **\"\/\"\** y haciendo click en mi apartado.\n")
    .setFooter({ text: "NEW UNDERGROUNDS"})
    .setTimestamp()
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("Yellow")
    let word = "<@" + client.user.id + ">"
    if(message.author.bot) return
    if (message.content.includes(word)) {
        message.reply({ embeds: [PingResponse] })
	}
})

client.on("messageDelete", (message) => {
    
    return
    
    if (message.webhookId || message.author?.bot) return;
    console.log(message.bot)
    
    const DeleteEmbed = new Discord.EmbedBuilder()
    .setTitle("Mensaje Eliminado 🗑️")
    .setColor("Red")
    .setTimestamp()
    .addFields({ name: 'Canal', value: '<#'+message.channel.id+'>', inline: true })
    .setAuthor({ name: `${message.author.username}`, iconURL: message.author.avatarURL() })
    .setDescription("```"+message.content+"```")
    
    client.channels.cache.get("1205014211894452314").send({ embeds: [DeleteEmbed] })
    
})

client.on("ready", () => {
    return
    const de = new Discord.EmbedBuilder()
    .setTitle("Verificacion ✅")
    .setDescription("Para acceder a las instalaciones. Primero verifica tu identidad cliqueando en el boton de abajo")
    .setColor("Green")
    .setThumbnail("https://images-ext-1.discordapp.net/external/Ws4rppd9BEAp987DGLaVXYHIattrLSvadRmm1YN9l_Q/https/cdn.discordapp.com/avatars/1273441382748524608/13fafb7b09aefb605af82ee6a04f6b31.webp?format=webp&width=160&height=160")
    
    const boton = new Discord.ButtonBuilder()
    .setStyle(Discord.ButtonStyle.Success)
    .setLabel("Verificate")
    .setEmoji("✅")
    .setCustomId("verificar")
    
    const comp = new Discord.ActionRowBuilder()
    .addComponents(boton)
    
    client.channels.cache.get("1069341206166904903").send({ embeds: [de], components: [comp] })
    
})

client.on("interactionCreate", async interaction => {
    if(interaction.isButton()){
        if(interaction.customId === "verificar"){
           if(interaction.member.roles.cache.some(role => role.id === "1029180689444253717")){
            interaction.reply({ content: "❌ | Ya te has verificado...", ephemeral: true })
      	  } else{
            interaction.member.roles.add("1029180689444253717")
            interaction.reply({ content: "✅ | Te has verificado exitosamente", ephemeral: true })
          }
        }
        if(interaction.customId === "conf"){
            await interaction.deferUpdate()
            interaction.editReply({ content: "✅ | Los votos han sido borrados.", components: [], ephemeral: true })
            votes_count.establecer("EventVotesCount", 0)
            votes_used.purgeall()
            
        } else if(interaction.customId === "cancel"){
            await interaction.deferUpdate()
            interaction.editReply({ content: "Operacion Cancelada...", components: [], ephemeral: true })
        }
    }
})


// Functions


client.login(config.token);