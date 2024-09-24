const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const DeveloperCommand = require("../functions.js")
const ms = require("ms")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Bloquea el enviar mensajes, canales de voz, y reacciones a un usuario")
    .addUserOption(p => p.setName("usuario")
                  .setDescription("Usuario al que silenciaras")
                  .setRequired(true))
    .addStringOption(p => p.setName("razon")
                    .setDescription("Agrega la razon de por que el usuario sera silenciado")
                    .setRequired(true)
                    .setMaxLength(200)
                    .setMinLength(5))
    .addStringOption(p => p.setName("tiempo")
                    .setDescription("Ejemplo: 1w (week), 7d (days), 2.5h (hours), 30m (minutes), 60s (seconds)")
                    .setRequired(true)
                    .setMaxLength(5)
                    .setMinLength(2))
    .setDefaultMemberPermissions(PermissionFlagsBits.TimeoutMembers),
    
  /**
   *
   * @param {import("discord.js").Client<true>} client
   * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
   */

  async run(client, interaction) {
      
  // if(interaction.user.id !== "1144403268076830730") return interaction.reply({ content: `**This command its still on developement phase, please contact the main dev for further questions.**`, ephemeral: true })
      
  let time = interaction.options.getString("tiempo")
  let usuario = interaction.options.getUser("usuario")
  let reason = interaction.options.getString("razon")
  let member = interaction.options.getMember("usuario")
  if(usuario.id === interaction.user.id) return interaction.reply({ content: `**❌ | No puedes silenciarte a ti mismo.**`, ephemeral: true })
  if(usuario.bot === true) return interaction.reply({ content: "**❌ | No puedes darle timeout a un bot.**", ephemeral: true })
  if(ms(time) === undefined) return interaction.reply({ content: `**❌ | Valor no reconocido.**`, ephemeral: true })
  if(ms(time) > 604800000) return interaction.reply({ content: `**❌ | No puedes silenciar a un usuario mas de una semana.**`, ephemeral: true })
  if(ms(time) < ms("10s")) return interaction.reply({ content: `**❌ | No puedes seleccionar un tiempo menor que 10 segundos.**`, ephemeral: true })
  if(member.bannable === false) return interaction.reply({ content: "**❌ | No pude dar timeout a este usuario por que tiene permisos mas altos o iguales que yo.**", ephemeral: true })
  if (interaction.member.roles.highest.position < member.roles.highest.position) return interaction.reply({ content: "**❌ | No puedes darle timeout a este miembro por que tiene una jerarquia mas alta que tu.**", ephemeral: true})
  if (interaction.member.roles.highest.position === member.roles.highest.position) return interaction.reply({ content: "**❌ | No puedes darle timeout a este miembro por que pertenece a la misma jerarquia que tu.**", ephemeral: true})
   
  interaction.reply({ content: `✅ | El usuario recibio el timeout exitosamente\n\nDetalles:\n⏰ Tiempo: ${ms(ms(time), { long: true })}\n❓ Razon: ${reason}\n👤 Miembro: ${usuario}`, ephemeral: true })
  usuario.timeout(ms(time), reason)
  const TimeOutEmbeed = new Discord.EmbedBuilder()
  .setTitle("Timeout ⏰")
  .setDescription(`Detalles:\n\n⏰ Tiempo: **${ms(ms(time), { long: true })}**\n❓ Razón: ${reason}\n👤 Miembro: ${usuario}`)
  .setColor("Red")
  .setTimestamp()
  .setThumbnail(usuario.avatarURL())
  .setAuthor({ name: `Moderador: ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
  .setFooter({ text: "NEW UNDERGROUNDS" })
  const TimeoutEmbed = new Discord.EmbedBuilder()
  .setAuthor({ name: `${usuario.globalName} ha recibido un Timeout`, iconURL: usuario.avatarURL() })
  .setDescription(`❓ Razón: **${reason}**}\n ⏰TIempo: **${ms(ms(time), { long: true })}**`)
  .setColor("Red")
  .setTimestamp()
  .setFooter({ text: "NEW UNDERGROUNDS" })
  client.channels.cache.get(interaction.channel.id).send({ embeds: [TimeoutEmbed] })
  client.channels.cache.get("1030627488289792060").send({ embeds: [TimeOutEmbeed] })
      
  },
};