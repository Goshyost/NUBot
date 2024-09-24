const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const db = require("megadb")
const votes_used = new db.crearDB("votes_used", "eventos")
const votes_count = new db.crearDB("votes_count", "eventos")
const status = new db.crearDB("status", "eventos")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("event")
    .setDescription("Event Manager")
    .addSubcommand(s => s.setName("start").setDescription("Publica un anuncio de que un evento esta en progreso.").addStringOption(p => p.setName("nombre").setDescription("Nombre del Evento").setRequired(true)).addStringOption(p => p.setName("descripcion").setDescription("Descripcion del evento").setRequired(false)))
    .addSubcommand(s => s.setName("end").setDescription("Termina el evento actual."))
    .addSubcommand(s => s.setName("block").setDescription("Bloquea la capacidad de votar para iniciar evento."))
    .addSubcommand(s => s.setName("votes").setDescription("Mira los votos de un evento actual."))
    .addSubcommand(s => s.setName("reset").setDescription("Resetea los votos a 0."))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    
  /**
   *
   * @param {import("discord.js").Client<true>} client
   * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
   */

  async run(client, interaction) {
  
      if(interaction.options.getSubcommand() === "block"){
          if(await status.obtener("isBlocked") === true){
              interaction.reply({ content: "🟢 | Las votaciones han sido desbloqueadas", ephemeral: true })
              status.establecer("isBlocked", false)
          } else if(await status.obtener("isBlocked") === false) {
              interaction.reply({ content: "🟢 | Las votaciones han sido bloqueadas", ephemeral: true })
              status.establecer("isBlocked", true)
          }
      }
      
  if(interaction.options.getSubcommand() === "start"){
      let arg1 = interaction.options.getString("nombre")
      let arg2 = interaction.options.getString("descripcion")
      
      const Embed = new Discord.EmbedBuilder()
      .setTitle("Evento Iniciado 🟢")
      .setTimestamp()
      .setColor("Green")
      .setFooter({ text: "NEW UNDERGROUNDS" })
      if(arg2){
      Embed.setDescription(`${arg1}\n\n${arg2}`)
      } else {
      Embed.setDescription(`${arg1}\n\n¡Unete ahora o te lo perderas!`)
      }
      if(await status.obtener("isEventOnLive") === true) return interaction.reply({ content: "❌ | No puedes iniciar 2 eventos a las vez.\n\nPara terminar el evento actual, por favor usa el comando **/event end**.", ephemeral: true })
      status.establecer("isEventOnLive", true)
      interaction.reply({ content: "🟢 | El evento ha sido iniciado correctamente.\n\nRecuerda usar el comando **/event end** para terminar el evento.", ephemeral: true })
      client.channels.cache.get("1204694109898547232").send({ embeds: [Embed] })
  }
  
  if(interaction.options.getSubcommand() === "end"){
      if(await status.obtener("isEventOnLive") === false) return interaction.reply({ content: "❓ | No hay ningun evento en progreso, para iniciar un evento utiliza el comando **/evento start**.", ephemeral: true })
      
      status.establecer("isEventOnLive", false)
      votes_used.purgeall()
      votes_count.establecer("EventVotesCount", 0)
      votes_count.establecer("VoteAlreadyStarted", false)
      
      const Embed2 = new Discord.EmbedBuilder()
      .setTitle("Evento Terminado 🔴")
      .setTimestamp()
      .setDescription("El evento ha terminado, gracias a todos por asistir.")
      .setColor("Red")
      .setFooter({ text: "NEW UNDERGROUNDS" })
      interaction.reply({ content: "🟢 | El evento ha sido finalizado correctamente.", ephemeral: true })
      client.channels.cache.get("1204694109898547232").send({ embeds: [Embed2] })
      
  }
   
  if(interaction.options.getSubcommand() === "votes"){
      
      const Embed4 = new Discord.EmbedBuilder()
      .setTitle("Votos para Evento")
      .setTimestamp()
      .setFooter({ text: "NEW UNDERGROUNDS" })
      
      if(await status.obtener("isBlocked") === true){
          Embed4.setDescription(`Las votaciones estan bloquedas, pero la votacion quedo con: **${await votes_count.obtener("EventVotesCount")}** votos totales.\n\nPuedes usar **/event reset** para reiniciar los votos.`)
      } else if(await status.obtener("isEventOnLive") === true){
          Embed4.setDescription(`Ya hay un evento en progreso\n\nPuedes usar el comando **/event end** para acabar un evento.`)
          Embed4.setColor("Red")
      } else {
          Embed4.setDescription(`Actualmente hay **${await votes_count.obtener("EventVotesCount")}** votos totales.`)
          Embed4.setColor("Yellow")
      }
      
      interaction.reply({ embeds: [Embed4], ephemeral: true })
      
  }
      
  if(interaction.options.getSubcommand() === "reset"){
      
      const ButtonConfirmacion = new Discord.ButtonBuilder()
      .setStyle("Success")
      .setLabel("Confirmar")
      .setCustomId("conf")
      
      const ButtonCancel = new Discord.ButtonBuilder()
      .setStyle("Danger")
      .setLabel("Cancelar")
      .setCustomId("cancel")
      
      const row = new Discord.ActionRowBuilder()
      .addComponents(ButtonConfirmacion, ButtonCancel)
      if(await votes_count.obtener("EventVotesCount") === 0) return interaction.reply({ content: "❌ | No hay ningun voto registrado.", ephemeral: true })
      if(await status.obtener("isEventOnLive") === true) return interaction.reply({ content: "❌ | Hay un evento en progreso, cuando utilices el comando **/event end** los votos se borraran automaticamente.", ephemeral: true })
      
      interaction.reply({ content: "⚠️ | ¿Estas seguro que quieres proseguir con esta accion? No habra vuelta atras...", components: [row], ephemeral: true })
      
  }
  
  
  },
};