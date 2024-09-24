const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Ve el avatar de otro usuario del servidor")
    .addUserOption(p => p.setName("usuario")
                  .setDescription("Especica el usuario, deja esto en blanco para ver tu foto de perfil")
                  .setRequired(true)),
    
  /**
   *
   * @param {import("discord.js").Client<true>} client
   * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
   */

  async run(client, interaction) {
  
  let usuario = interaction.options.getUser("usuario") 
  let miembro = interaction.options.getMember("usuario")
  
  const AvatarEmbed = new Discord.EmbedBuilder()
  .setTitle("Avatar de "+usuario.displayName)
  .setColor("Yellow")
  .setImage(usuario.displayAvatarURL({ size: 1024, dynamic: true }))
  .setFooter({ text: "NEW UNDERGROUNDS" })
  .setTimestamp()
  
  const AvatarEmbed2 = new Discord.EmbedBuilder()
  .setTitle(`Avatar de ${interaction.user.username}`)
  .setColor("Yellow")
  .setImage(interaction.user.displayAvatarURL())
  .setFooter({ text: "NEW UNDERGROUNDS" })
  .setTimestamp()
  
        if (miembro.roles.cache.some(role => role.name === 'Cadete')) {
          AvatarEmbed.setDescription("**Miembro de la Academia de Moderadores de NEW UNDERGROUNDS 🛡️**")
        }
        if (miembro.roles.cache.some(role => role.name === 'Sub-Teniente')) {
          AvatarEmbed.setDescription("**Miembro de la Academia de Moderadores de NEW UNDERGROUNDS 🛡️**")
        }
        if (miembro.roles.cache.some(role => role.name === 'Teniente')) {
          AvatarEmbed.setDescription("**Miembro de la Academia de Moderadores de NEW UNDERGROUNDS 🛡️**")
        }
        if (miembro.roles.cache.some(role => role.name === 'Mayor')) {
          AvatarEmbed.setDescription("**Miembro de la Academia de Moderadores de NEW UNDERGROUNDS 🛡️**")
        }
        if (miembro.roles.cache.some(role => role.name === 'Coronel')) {
          AvatarEmbed.setDescription("**Miembro de la Academia de Moderadores de NEW UNDERGROUNDS 🛡️**")
        }
        if (miembro.roles.cache.some(role => role.name === 'General')) {
          AvatarEmbed.setDescription("**Miembro de la Academia de Moderadores de NEW UNDERGROUNDS 🛡️**")
        }
  
  if(usuario){
      
      interaction.reply({ embeds: [AvatarEmbed] })
      
  }
      
  
  },
};