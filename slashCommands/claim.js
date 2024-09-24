const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const db = require("megadb")
const codes = new db.crearDB("claim_codes")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("claim")
    .setDescription("Comando para reclamar un codigo, como un rol u otros")
    .addStringOption(p => p.setName("codigo").setDescription("Codigo que vas a reclamar").setRequired(true).setMaxLength(19).setMinLength(3)),
    
  /**
   *
   * @param {import("discord.js").Client<true>} client
   * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
   */

  async run(client, interaction) {
  
  let code = interaction.options.getString("codigo")
  
  if(codes.tiene(code)){
      let roleid = await codes.obtener(`${code}.roleid`)
      let prizename = await codes.obtener(`${code}.prize`)
      if (interaction.member.roles.cache.some(role => role.id === roleid)) {
          return interaction.reply({ content: "❓ | No puedes reclamar este codigo por que ya tienes el rol: <@&"+roleid+">\nsi crees que esto es un error, por favor contacta a la administracion.", ephemeral: true })
	  }
      interaction.reply({ content: "✅ | El codigo fue reclamado correctamente: recibiste el rango: <@&"+roleid+">"})
      
      interaction.member.roles.add(roleid)
      codes.eliminar(code)
      const Embed = new Discord.EmbedBuilder()
      .setTitle("Codigo canjeado 🎁")
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
      .setDescription(`**${interaction.user.globalName}** ha canjeado el codigo: ${code}\n\nPremio: <@&${roleid}>`)
      .setColor("Yellow")
      .setTimestamp()
      client.channels.cache.get("1030627488289792060").send({ embeds: [Embed], ephemeral: true })
  } else interaction.reply({ content: "❌ | El codigo que ingresaste no es valido o ha expirado.", ephemeral: true })
  
  
  },
};