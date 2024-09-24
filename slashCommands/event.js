const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const db = require("megadb")
const votes_used = new db.crearDB("votes_used", "eventos")
const votes_count = new db.crearDB("votes_count", "eventos")
const status = new db.crearDB("status", "eventos")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("evento")
    .setDescription("Event Manager")
    .addSubcommand(s => s.setName("request").setDescription("Vota para iniciar un evento en el servidor de SCPSL")),
    
  /**
   *
   * @param {import("discord.js").Client<true>} client
   * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
   */

  async run(client, interaction) {
  
  if(interaction.options.getSubcommand() === "request"){
      
      if(await status.obtener("isBlocked") === true) return interaction.reply({ content: "🔴 | Las votaciones ha evento han sido bloqueadas por la administracion.", ephemeral: true })
      
      if(await status.obtener("isEventOnLive") === true) return interaction.reply({ content: "❓ | No puedes votar ya que hay un evento en progreso.", ephemeral: true })
      // if(votes_used.tiene(interaction.user.id) === true) return interaction.reply({ content: "🔴 | Solamente puedes votar una vez a un evento...", ephemeral: true })
      votes_used.establecer(interaction.user.id, true)
      votes_count.sumar("EventVotesCount", 1)
      if(await votes_count.obtener("EventVotesCount") === 10) client.channels.cache.get("1029174325011554416").send({ content: "🎮 | La votacion para evento ya ha llegado a **10** votos. ¡Usa **/evento request** para votar!" })
      if(await votes_count.obtener("VoteAlreadyStarted") === true) return interaction.reply({ content: "🟢 | Has votado para iniciar un evento.", ephemeral: true })
      votes_count.establecer("VoteAlreadyStarted", true)
      const EmbedVoteStaff = new Discord.EmbedBuilder()
      .setTitle("Votacion a Evento 🎮")
      .setDescription("Un usuario ha votado para iniciar un evento en el servidor de SCP:SL\n\nRecuerden que pueden cancelar la capacidad de los usuarios de utilizar esta accion con el comando **/event block**")
      .setColor("Yellow")
      .setTimestamp()
      .setFooter({ text: "NEW UNDERGROUNDS" })
      
      const EmbedVote = new Discord.EmbedBuilder()
      .setTitle("Votacion a Evento 🎮")
      .setDescription("Un usuario ha iniciado una votacion para evento dentro del servidor de SCP:SL\n\nUsa el comando **/evento request** para apoyar esta votacion.")
      .setColor("Yellow")
      .setTimestamp()
      .setFooter({ text: "NEW UNDERGROUNDS" })
      interaction.reply({ content: "🟢 | Has votado para iniciar un evento.", ephemeral: true })
      client.channels.cache.get("1029174325011554416").send({ embeds: [EmbedVote] })
      client.channels.cache.get("1043684478490521641").send({ embeds: [EmbedVoteStaff] })
  } 
  
  
  },
};