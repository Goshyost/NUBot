const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("react")
    .setDescription("ONLY DEVELOPER COMMAND")
    .addStringOption(p => p.setName("messageid")
                    .setDescription("ONLY DEVELOPER COMMAND")
                    .setRequired(true)
                    )
    .addStringOption(p => p.setName("reactwith")
                    .setDescription("ONLY DEVELOPER COMMAND")
                    .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
  /**
   *
   * @param {import("discord.js").Client<true>} client
   * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
   */

  async run(client, interaction) {
  
  if(interaction.user.id !== "1144403268076830730") return interaction.reply({ content: "Este comando solo puede usarse por desarrolladores del la aplicacion, si crees que esto es un error, porfavor contacta al MainDev", ephemeral: true })
      
      let mesageid = interaction.options.getString("messageid")
      let emoji = interaction.options.getString("reactwith")
      
      let msg = await client.channels.cache.get(interaction.channel.id).messages.fetch(mesageid)
      msg.react(emoji)
      interaction.reply({ content: "Done. EMOJI:"+emoji, ephemeral: true })
  
  },
};