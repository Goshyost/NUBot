const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const db = require('megadb');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Agrega una advertencia a un usuario especifico.")
    .addUserOption(option => option.setName("usuario").setDescription("usuario a el que se le agregara una advertencia.").setRequired(true))
	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers),
    
  /**
   *
   * @param {import("discord.js").Client<true>} client
   * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
   */

  async run(client, interaction) {
  
  let warns = new db.crearDB("warns")
      
  let user = interaction.options.getUser("usuario")
      
  if(user.id === interaction.user.id) return interaction.reply({ content: "❌ | No puedes warnearte a ti mismo...", ephemeral: true })
  
  let warnstotales = warns.obtener(user.id)
  if(warns.tiene(user.id) === true){
      warns.sumar(user.id, 1)
       const Embed1 = new Discord.EmbedBuilder()
      .setThumbnail(user.displayAvatarURL())
      .setAuthor({ name: `Warneado por: ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
 	  .setTitle(`${user.displayName} ha recibido una Advertencia!`)
      .setColor("Red")
 	  .setDescription("Numero de advertencias totales: **"+await warns.obtener(user.id)+"**")
      .setFooter({ text: "New Undergrounds Moderation"})
      .setTimestamp()
      if(await warns.obtener(user.id) > 4) Embed1.addFields({ name: "⚠️ Usuario potencialmente peligroso ⚠️", value: "este usuario esta marcado como un usuario potencialmente peligroso debido a que tiene 5 o mas advertencias totales.", inline: true })
	  interaction.reply({ content: `<@${user.id}>`, embeds: [Embed1] })
  } else {
       warns.establecer(user.id, 1)
      const Embed2 = new Discord.EmbedBuilder()
      .setThumbnail(user.displayAvatarURL())
      .setAuthor({ name: `Warneado por: ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
 	  .setTitle(`${user.username} ha recibido una Advertencia!`)
      .setColor("Red")
 	  .setDescription("Numero de advertencias totales: **"+await warns.obtener(user.id)+"**")
      .setFooter({ text: "New Undergrounds Moderation"})
      .setTimestamp()
  
	  interaction.reply({ content: `<@${user.id}>`, embeds: [Embed2] })
  }
  },
};