const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const db = require("megadb")
const warns = new db.crearDB("warns")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("perfil")
    .setDescription("Muestra informacion sobre un usuario")
    .addUserOption(p => p.setName("usuario")
                  .setDescription("Especica el usuario de el que quieres ver su info")
                  .setRequired(true))
    .addBooleanOption(p => p.setName("oculto")
                     .setDescription("Si seleccionas True, el mensaje solamente lo veras tu")
                     .setRequired(false)),
    
  /**
   *
   * @param {import("discord.js").Client<true>} client
   * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
   */

  async run(client, interaction) {
  
  if(interaction.user.id !== "1144403268076830730") return interaction.reply({ content: "This command is currently under rework...", ephemeral: true })
   
  let usuario = interaction.options.getUser("usuario") 
  let miembro = interaction.options.getMember("usuario")
  
  
  const AvatarEmbed2 = new Discord.EmbedBuilder()
  .setTitle(`Avatar de ${interaction.user.username}`)
  .setColor("Yellow")
  .setImage(interaction.user.displayAvatarURL())
  .setFooter({ text: "NEW UNDERGROUNDS" })
  .setTimestamp()
  
  let especial;
      
        if (miembro.roles.cache.some(role => role.name === 'Usuario')) {
          especial = "Ningun rol Especial..."
        }
        if (miembro.roles.cache.some(role => role.name === 'Cadete')) {
          especial = "Miembro de la Academia de Moderadores 🛡️"
        }
        if (miembro.roles.cache.some(role => role.name === 'Sub-Teniente')) {
          especial = "Miembro de la Academia de Moderadores 🛡️"
        }
        if (miembro.roles.cache.some(role => role.name === 'Teniente')) {
          especial = "Miembro de la Academia de Moderadores 🛡️"
        }
        if (miembro.roles.cache.some(role => role.name === 'Mayor')) {
          especial = "Miembro de la Academia de Moderadores 🛡️"
        }
        if (miembro.roles.cache.some(role => role.name === 'Coronel')) {
          especial = "Miembro de la Academia de Moderadores 🛡️"
        }
        if (miembro.roles.cache.some(role => role.name === 'General')) {
          especial = "Miembro de la Academia de Moderadores 🛡️"
        }
        if (miembro.roles.cache.some(role => role.name === 'Streamer')) {
          especial = "Creador de Contenido 🟣"
        }
        if (miembro.roles.cache.some(role => role.name === 'Youtuber')) {
          especial = "Creador de Contenido 🔴"
        }
        if (miembro.roles.cache.some(role => role.name === 'DONADOR UwU')) {
          especial = "Donador 💸"
        }
        if (miembro.roles.cache.some(role => role.name === 'Artista')) {
          especial = "Artista 🎨"
        }
        if (miembro.roles.cache.some(role => role.name === 'Presidente de las instalaciones')) {
          especial = "Nivel 50 🏆"
        }
      let booster;
      
      if(miembro.premiumSince === null){
          booster = "`No`"
      } else {
          booster = `<t:${Math.round(usuario.premiumSinceTimestamp / 1000)}:R>`
      }
      
      let w;
      if(warns.tiene(usuario.id) === true){
          w = await warns.obtener(usuario.id)
      } else {
          w = "`No tiene Advertencias`"
      }
  const AvatarEmbed = new Discord.EmbedBuilder()
  .setTitle("Perfil de "+usuario.displayName)
  .setDescription(`🎂 Creado: **<t:${Math.round(usuario.createdTimestamp / 1000)}:R>**\n 🛬 Se unio: **<t:${Math.round(miembro.joinedTimestamp / 1000)}:R>**\n⭐ Especial: **\`${especial}\`**\n💎 Booster: **${booster}**\n🪪 ID: **\`${usuario.id}\`**\n👤 Rol mas Alto: <@&${miembro.roles.highest.id}>\n⚠️ Warns: **${w}**`)
  .setColor(miembro.displayHexColor)
  .setThumbnail(usuario.displayAvatarURL())
  .setFooter({ text: "NEW UNDERGROUNDS" })
  .setTimestamp()
  
  
  let oculto = interaction.options.getBoolean("oculto") ?? false
  if(usuario){
      
      interaction.reply({ embeds: [AvatarEmbed], ephemeral: oculto })
      
  }
      
  
  },
};
