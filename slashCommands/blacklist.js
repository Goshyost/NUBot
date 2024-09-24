const { SlashCommandBuilder } = require("discord.js");
const { PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const db = require("megadb")
const blacklist = new db.crearDB("blacklist")
const randon = require("uniqid")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blacklist")
    .setDescription("Comando para gestionar la blacklist")
    .addSubcommand(sub => sub.setName("add").setDescription("Agrega a un usuario a la lista negra").addStringOption(p => p.setName("steamid").setDescription("Steamid del usuario que se agregara a la blacklist").setRequired(false).setMaxLength(25)).addStringOption(p => p.setName("nombre").setDescription("Nombre del usuario que se agregara").setRequired(false).setMaxLength(20)).addStringOption(p => p.setName("razon").setDescription("Agrega una razon por la que el usuario fue agregado a la blacklist").setRequired(false).setMaxLength(50)))
    .addSubcommand(sub => sub.setName("remove").setDescription("Remueve a un usuario a la lista negra").addStringOption(p => p.setName("id").setDescription("Proporciona la ID del usuario, usa /blacklist show para ver las IDs").setRequired(true).setMaxLength(5).setMinLength(5)))
    .addSubcommand(sub => sub.setName("show").setDescription("Muetra a todos los usuarios de la lista negra."))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
  /**
   *
   * @param {import("discord.js").Client<true>} client
   * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
   */

  async run(client, interaction) {
      
  let add = interaction.options.getSubcommand("add")
  let remove = interaction.options.getSubcommand("remove")
  
  let steamid = interaction.options.getString("steamid")
  let reason = interaction.options.getString("razon")
  let id = interaction.options.getString("id")
  let name = interaction.options.getString("nombre")
  
  let steamidstatus
  let namestatus
  let reasonstatus
  
  if(interaction.options.getSubcommand() === "add"){
      
      if(steamid){
          steamidstatus = steamid
      } else {
          steamidstatus = "No se proporciono steamID"
      }
      if(name){
          namestatus = name
      } else {
          namestatus = "No se proporciono nombre"
      }
      if(reason){
          reasonstatus = reason
      } else {
          reasonstatus = "No se proporciono razon"
      }
      if(!steamid){
          if(!name){
              return interaction.reply({ content: "❌ | Debes proporcionar al menos un steamID o nombre.", ephemeral: true })
          }
      }
      let ranid = Math.floor(10000 + Math.random() * 90000)
      blacklist.establecer(`${ranid}`, { id: `${ranid}`, steamid: steamidstatus, name: namestatus, reason: reasonstatus })
          const Black2Embed = new Discord.EmbedBuilder()
          .setTitle("Usuario agregado a lista negra... 💀")
          .setDescription(`- **${await blacklist.obtener(`${ranid}.name`)}** | **${await blacklist.obtener(`${ranid}.steamid`)}** | **${await blacklist.obtener(`${ranid}.reason`)}**`)
          client.channels.cache.get("1030627488289792060").send({ embeds: [Black2Embed] })
      interaction.reply({ content: "Operation Success", ephemeral: true })
      
  } else if(interaction.options.getSubcommand() === "remove"){
      
      if(blacklist.tiene(id) === true){
          interaction.reply({ content: "✅ | Se elimino a el usuario de la lista negra correctamente.", ephemeral: true })
          const BlackEmbed = new Discord.EmbedBuilder()
          .setTitle("Usuario eliminado de la lista negra... 💀")
          .setDescription(`**${await blacklist.obtener(`${id}.name`)}** | **${await blacklist.obtener(`${id}.steamid`)}** | **${await blacklist.obtener(`${id}.reason`)}**`)
          .setColor("Green")
          client.channels.cache.get("1030627488289792060").send({ embeds: [BlackEmbed] })
          blacklist.eliminar(id)
      } else {
          interaction.reply({ content: "❌ | No se encontro ningun usuario con la ID: "+id+".", ephemeral: true })
      }
      
  } else if(interaction.options.getSubcommand() === "show"){

        blacklist.map(false, (key) => `ID: **${key.id}** | **${key.name}** | **${key.steamid}** | **${key.reason}**`).then(datos => {
         const Warns = new Discord.EmbedBuilder()
         .setTitle("Blacklist 💀")
         .setDescription(datos.join("\n"))
   	     .setTimestamp()
     	 .setFooter({ text: "NEW UNDERGROUNDS" })
         interaction.reply({ embeds: [Warns] })
            
        })

    }
  
  
  },
};