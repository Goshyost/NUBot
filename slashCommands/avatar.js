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
   
  let usuario = interaction.options.getUser("usuario") 
  let miembro = interaction.options.getMember("usuario")
  
  
  const AvatarEmbed2 = new Discord.EmbedBuilder()
  .setTitle(`Avatar de ${interaction.user.username}`)
  .setColor("Yellow")
  .setImage(interaction.user.displayAvatarURL())
  .setFooter({ text: "NEW UNDERGROUNDS" })
  .setTimestamp()
  
  let especial;
  let icon;
      
        if (miembro.roles.cache.some(role => role.name === 'Usuario' || role.name === "veterano")) {
          especial = "Ningun rol Especial..."
          icon = "👤"
        }
        if (miembro.roles.cache.some(role => role.name === 'Streamer')) {
          especial = "Creador de Contenido 🟣"
          icon = "🟣"
        }
        if (miembro.roles.cache.some(role => role.name === 'Youtuber')) {
          especial = "Creador de Contenido 🔴"
          icon = "🔴"
        }
        if (miembro.roles.cache.some(role => role.name === 'DONADOR UwU')) {
          especial = "Donador 💸"
          icon = "💸"
        }
        if (miembro.roles.cache.some(role => role.name === 'Artista')) {
          especial = "Artista 🎨"
          icon = "🎨"
        }
        if (miembro.roles.cache.some(role => role.name === 'Presidente de las instalaciones')) {
          especial = "Nivel 50 🏆"
          icon = "🏆"
        }
        if (miembro.roles.cache.some(role => role.name === 'KÜRT VIP' || role.name ===  "Underground ViP" || role.name === "Usground vip" || role.name === "Oberkommando VIP" || role.name === "OBERKOMMANDO +" || role.name === "OBERKOMMANDO ++")) {
          especial = "V.I.P 💎"
          icon = "💎"
        }
        if (miembro.roles.cache.some(role => role.name === 'Cadete' || role.name === 'Sub-Teniente' || role.name === 'Teniente' || role.name === 'Mayor' || role.name === 'Coronel' || role.name === 'General')) {
          especial = "Miembro de la Academia de Moderadores 🛡️"
          icon = "🛡️"
            }
        if (miembro.roles.cache.some(role => role.name === 'Owner.')) {
          especial = "Owner 👑"
          icon = "👑"
        }
      
      let booster;
      
      if(miembro.premiumSince === null){
          booster = "`No`"
      } else {
          booster = `<t:${Math.round(miembro.premiumSinceTimestamp / 1000)}:R>`
      }
      
      let w;
      if(warns.tiene(usuario.id) === true){
          w = await warns.obtener(usuario.id)
      } else {
          w = "`No tiene Advertencias`"
      }
  const AvatarEmbed = new Discord.EmbedBuilder()
  .setTitle("Perfil de "+usuario.displayName+` ${icon}`)
  .setDescription(`\n🔴 Mencion: <@${usuario.id}>\n🎂 Creado: **<t:${Math.round(usuario.createdTimestamp / 1000)}:R>**\n 🛬 Se unio: **<t:${Math.round(miembro.joinedTimestamp / 1000)}:R>**\n⭐ Especial: **\`${especial}\`**\n💎 Booster: **${booster}**\n🪪 ID: **\`${usuario.id}\`**\n👤 Rol mas Alto: <@&${miembro.roles.highest.id}>\n⚠️ Warns: **${w}**`)
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
